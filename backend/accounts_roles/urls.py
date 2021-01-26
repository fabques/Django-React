from django.urls import path, include

from accounts_roles.api import LoadRolesAPI

urlpatterns = [
    path('api/roles', LoadRolesAPI.as_view())
]
