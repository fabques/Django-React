from rest_framework import serializers

from accounts_roles.models import Roles


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['id', 'name']
