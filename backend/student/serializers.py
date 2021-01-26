from rest_framework import serializers
from accounts.serializers import ExtendedUserSerializer
from schools.serializers import GradeSerializer, SchoolSerializer
from .models import Student


class StudentSerializer(serializers.ModelSerializer):

    grade = GradeSerializer()
    school = SchoolSerializer()
    tutor = ExtendedUserSerializer()

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'log_code', 'grade', 'school', 'tutor') #includes all fields in the model

class StudentSerializerPost(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'log_code', 'grade', 'school', 'tutor')