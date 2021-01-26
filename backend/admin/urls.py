from django.urls import path, include

from admin.api import StudentsAdminAPI

urlpatterns = [
    path('api/admin/students', StudentsAdminAPI.as_view())
]
