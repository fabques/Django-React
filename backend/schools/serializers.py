from rest_framework import serializers
from .models import School, Grade

#Utiliza un modelo para crear archivos JSON

class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = School
        fields = '__all__' #includes all fields in the model



class GradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = '__all__'