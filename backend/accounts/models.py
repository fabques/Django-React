from django.db import models
from django.contrib.auth.models import User
from accounts_roles.models import Roles


class ExtendedUser(models.Model):
    user = models.OneToOneField(User, related_name="user", on_delete=models.CASCADE)
    isValidated = models.BooleanField(default=False)
    val_token = models.CharField(max_length=100, default="None")
    psw_token = models.CharField(max_length=20, default="None")
    external_account = models.CharField(max_length=100, default="None")
    role = models.ForeignKey(Roles, on_delete=models.CASCADE, null=True)
