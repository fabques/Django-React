from rest_framework.views import APIView

from student.models import Student
from student.serializers import StudentSerializer
from rest_framework.response import Response

class StudentsAdminAPI(APIView):

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

