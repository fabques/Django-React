from rest_framework import routers
from .api import SchoolAPI, GradeAPI
from django.urls import path, include

# router = routers.DefaultRouter()
#
# router.register('api/schools', SchoolAPI, 'schools')
# router.register('api/grades', GradeAPI, 'grades')
#
# urlpatterns = router.urls

urlpatterns = [
    path('api/grades', GradeAPI.as_view()),
    path('api/schools', SchoolAPI.as_view())
]
