from django.db import models


# Create your models here.

class Roles(models.Model):
    name = models.CharField(max_length=100, default='None')
