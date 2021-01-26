from django.urls import path, include

from knox import views as knox_views
from tests.api import CheckTokenTestAPI

urlpatterns = [
    path('api/check-token-test', CheckTokenTestAPI.as_view())
    ]