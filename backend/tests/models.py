from django.db import models
from student.models import Student


class Test(models.Model):
    test = models.CharField(max_length=50)
    student = models.ForeignKey(Student, related_name="students", on_delete=models.CASCADE, null=True)
