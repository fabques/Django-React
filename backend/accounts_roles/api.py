from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts_roles.models import Roles
from accounts_roles.serializers import RolesSerializer


class LoadRolesAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RolesSerializer

    def get(self, request):
        queryset = Roles.objects.all()
        serializer = RolesSerializer(queryset, many=True)
        return Response(serializer.data)
