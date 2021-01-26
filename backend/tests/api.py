from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from student.models import Student
from student.serializers import StudentSerializer
from tests.serializers import TestSerializer


class CheckTokenTestAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = TestSerializer

    def get(self, request):
        queryset = Student.objects.all()
        test_token = self.request.query_params.get('codeSmartick', None)
        student = queryset.filter(log_code=test_token).first()
        if student is not None:
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

