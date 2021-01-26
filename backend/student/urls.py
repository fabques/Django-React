from django.urls import path, include
from student.api import StudentAPI, StudentsAPI

urlpatterns = [
    path('api/students', StudentsAPI.as_view()),
    path('api/students/<int:pk>', StudentAPI.as_view())
    ]
