from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from accounts.models import ExtendedUser
from .models import Roles


# User Serializer
from accounts_roles.serializers import RolesSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_superuser')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'])
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Credenciales incorrectos!")


class ExtendedUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = RolesSerializer()

    class Meta:
        user = UserSerializer()
        role = RolesSerializer()
        model = ExtendedUser
        fields = ('id', 'user', 'isValidated', 'val_token', 'external_account', 'role')

    def create(self, validated_data, isValidated, val_token, external_account, role):
        user_data = validated_data.pop('user')
        user = RegisterSerializer.create(UserSerializer(), validated_data=user_data)
        role = Roles.objects.all().filter(id=role['value']).first()
        extendedUser, created = ExtendedUser.objects.update_or_create(user=user,
                                                                      isValidated=isValidated,
                                                                      val_token=val_token,
                                                                      external_account=external_account,
                                                                      role=role
                                                                      )
        return extendedUser


class ValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['isValidated']

    def update(self, instance, validated_data):
        instance.isValidated = validated_data.get('isValidated', instance.isValidated)
        instance.save()
        return instance


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['psw_token']

    def __str__(self):
        return "PasswordSerializer"

    def update(self, instance, validated_data):
        instance.psw_token = validated_data.get('psw_token', instance.psw_token)
        instance.save()
        return instance


class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']

    def __str__(self):
        return "ResetPasswordSerializer"

    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance


class CheckValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['user', 'isValidated']


class CheckAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['external_account']
