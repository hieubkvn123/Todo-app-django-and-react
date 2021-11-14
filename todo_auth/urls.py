from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserViewset, delete_all, register, login, test_auth

router = DefaultRouter()
router.register('users', UserViewset)

urlpatterns = [
    path("register", register, name='auth_register'),
    path("login", login, name='auth_login'),
    path("test_auth", test_auth, name='auth_test_auth'),
    path("delete_all", delete_all, name='auth_delete_all')
]
urlpatterns += router.urls