from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from accounts.models import ExtendedUser
from schools.models import School, Grade


class Student(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, null=True)
    tutor = models.ForeignKey(ExtendedUser, related_name="students", on_delete=models.CASCADE, null=True)
    log_code = models.CharField(max_length=50)
