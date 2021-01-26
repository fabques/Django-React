from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework.views import APIView
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User

from .models import ExtendedUser
from .serializers import UserSerializer, LoginSerializer, ValidationSerializer, PasswordSerializer, \
    ResetPasswordSerializer, ExtendedUserSerializer, CheckValidationSerializer, CheckAccountSerializer


# Register API
class RegisterAPI(APIView):

    def get(self, request):
        users = ExtendedUser.objects.all()
        user = users.filter(user_id=request.query_params['id']).first()
        serializer = ExtendedUserSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExtendedUserSerializer(data=request.data)
        codeLog = get_random_string(length=32)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data, val_token=codeLog, isValidated=request.data['isValidated'],
                              external_account=request.data['external_account'], role=request.data['role'])
            if request.data['external_account'] == 'Aula':
                urlValidate = "http://localhost:8000/#/validate/%s" % codeLog
                user = serializer.data['user']
                msg_html = render_to_string('validate.html', {'url': urlValidate})
                send_mail(
                    'Confirmar Registro de Usuario',
                    '',
                    'Aula <aula@fermath.es>',
                    [list(user.values())[1]],
                    fail_silently=False,
                    html_message=msg_html
                )
            return Response(serializer.data)
        return Response(serializer.error_messages)


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Validation API
class ValidateAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ValidationSerializer

    def get(self, request):
        queryset = ExtendedUser.objects.all()
        val_token = self.request.query_params.get('val_token', None)
        if val_token is not None:
            queryset = queryset.filter(val_token=val_token)
            validated_data = {'isValidated': 1}
            user = queryset.first()
            serializer = ValidationSerializer(user, validated_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


# Reset Password API
class ForgotPasswordAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExtendedUserSerializer

    def get(self, request):
        queryset = ExtendedUser.objects.all()
        email = self.request.query_params.get('email', None)
        validated_data = {'psw_token': get_random_string(length=20)}
        if email is not None:
            queryset = queryset.filter(user__email=email)
            user = queryset.first()
            if queryset.__len__() > 0:
                serializer = PasswordSerializer(user, data=validated_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                url_reset_password = "http://localhost:8000/#/forgot-password/%s" % validated_data['psw_token']
                msg_html = render_to_string('reset-password.html',
                                            {'url': url_reset_password
                                             })
                send_mail(
                    'Recuperar cuenta',
                    '',
                    'Aula <aula@fermath.es>',
                    [email],
                    fail_silently=False,
                    html_message=msg_html
                )
                return Response(serializer.data)


class CheckPasswordTokenAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExtendedUserSerializer

    def get(self, request):
        queryset = ExtendedUser.objects.all()
        psw_token = self.request.query_params.get('psw_token', None)
        if psw_token is not None:
            queryset = queryset.filter(psw_token=psw_token)
            if queryset.__len__() > 0:
                serializer = ExtendedUserSerializer(queryset.first())
                return Response(serializer.data)


class ResetPasswordAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        request_user = request.data['user']
        user = User.objects.get(id=request_user['id'])
        validated_data = request.data['password']
        if user is not None:
            user.set_password(validated_data)
            user.save()
            return Response(UserSerializer(user).data)


class CheckValidationAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CheckValidationSerializer

    def get(self, request):
        queryset = ExtendedUser.objects.all()
        username = self.request.query_params.get('username', None)
        queryset = queryset.filter(user__username=username, isValidated=1)
        if queryset.__len__() > 0:
            user = queryset.first()
            serializer = CheckValidationSerializer(user)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CheckAccountAPI(APIView):

    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CheckAccountSerializer

    def get(self, request):
        queryset = ExtendedUser.objects.all()
        username = self.request.query_params.get('username', None)
        queryset = queryset.filter(user__username=username)
        if queryset.count() == 0:
            return Response({'external_account': 'No defined yet'})
        else:
            external_account = {'external_account': queryset.first().external_account}
            serializer = CheckAccountSerializer(external_account)
            return Response(serializer.data)
