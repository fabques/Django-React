from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, ValidateAPI, ForgotPasswordAPI, CheckPasswordTokenAPI, \
    ResetPasswordAPI, CheckValidationAPI, CheckAccountAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    ##PRUEBA
    path('api/auth/validate', ValidateAPI.as_view()),
    path('api/auth/forgot-password', ForgotPasswordAPI.as_view()),
    path('api/auth/check-password-token',  CheckPasswordTokenAPI.as_view()),
    path('api/auth/reset-password',  ResetPasswordAPI.as_view()),
    path('api/auth/check-validation',  CheckValidationAPI.as_view()),
    path('api/auth/check-account',  CheckAccountAPI.as_view())




]
