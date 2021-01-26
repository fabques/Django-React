from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student
from rest_framework import permissions, status
from .serializers import StudentSerializer, StudentSerializerPost


class StudentsAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = StudentSerializer

    # Get students from the logged user
    def get(self, request):
        queryset = Student.objects.all()
        queryset = queryset.filter(tutor=request.query_params['id'])
        return Response(StudentSerializer(queryset, many=True).data)

    def post(self, request):
        request_student = request.data['student']
        serializer = StudentSerializerPost(data=request_student)
        serializer.is_valid(raise_exception=ValueError)
        serializer.save()
        return Response(serializer.data)


class StudentAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = StudentSerializer

    def delete(self, request, pk, format=None):
        queryset = Student.objects.all()
        queryset = queryset.filter(id=pk).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)