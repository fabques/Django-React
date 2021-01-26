from django.db import models

# Create your models here.

class School(models.Model):
    provincia = models.CharField(max_length=80)
    localidad = models.CharField(max_length=80)
    denominacion = models.CharField(max_length=80)
    nombre = models.CharField(max_length=80)
    codigo = models.IntegerField()
    tipo = models.CharField(max_length=80)
    direccion = models.CharField(max_length=80)
    codigo_postal = models.IntegerField()
    telefono = models.IntegerField()

class Grade(models.Model):
    name = models.CharField(max_length=80)