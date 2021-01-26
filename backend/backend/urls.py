from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('student.urls')),
    path('', include('accounts.urls')),
    path('', include('schools.urls')),
    path('', include('tests.urls')),
    path('', include('accounts_roles.urls'))
]

#IN CASE WE NEED ADMIN SITE
