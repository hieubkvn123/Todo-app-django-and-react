import sys 
import traceback
import bcrypt

from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from .models import UserModel
from .serializers import UserSerializer

# Create your views here.
class UserViewset(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# @Route POST /auth/register
# @Desc Create new user with request data
# @Access Public
@api_view(['POST'])
def register(request):
    if(request.method == 'POST'):
        try:
            # Check if user exists
            queryset = UserModel.objects.filter(username=request.data['username'])
            if(queryset.count() > 0):
                return Response({
                    "msg" : "User already exists"
                }, status=status.HTTP_400_BAD_REQUEST)

            # Encrypts the password
            encoded_pwd = request.data['password'].encode('utf-8')
            hashed = bcrypt.hashpw(encoded_pwd, bcrypt.gensalt())
            request.data['password'] = hashed.decode('utf-8')


            # Create and save the user in our custom database
            model = UserSerializer(data=request.data)
            model.is_valid()
            model.save()

            # Create a django.contrib.auth.models.User object for authentication
            # User will be non-admin by default
            user = User.objects.create(username=request.data['username'], 
                password=request.data['password'],
                is_staff=False, is_superuser=False)

            # Get the token for the user we just created
            token, created = Token.objects.get_or_create(user=user)
        except:
            traceback.print_exc(file=sys.stdout)
            return Response({
                "msg" : "Register Failed"
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "msg" : "Register Success",
            "payload" : {
                "user" : request.data['username'],
                'token' : token.key
            }
        })

# @Route POST /auth/login
# @Desc Handles login request from users
# @Access Public
@api_view(['POST'])
def login(request): 
    if(request.method == 'POST'):
        # Check if the user exists
        queryset = UserModel.objects.filter(username=request.data['username'])
        if(queryset.count() == 0): # If user does not exist
            return Response({
                'msg' : 'User does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)

        # If user exists, check if password matches
        pwd = queryset[0].password.encode('utf-8')
        user_pwd = request.data['password'].encode('utf-8')

        # If the password matches the database
        if(bcrypt.checkpw(user_pwd, pwd)):
            # Get the corresponding user from django.contrib.auth.models.User
            user = User.objects.get(username=queryset[0].username)
            
            # Create a token for this user
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'msg' : 'Login success',
                'payload' : {
                    'token' : token.key,
                    'user' : user.username
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'msg' : 'Wrong password'
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'msg' : 'Something went wrong'
        }, status=status.HTTP_400_BAD_REQUEST)

# @Route POST /auth/delete_all
# @Desc deletes all user in database (just a temporary utility)
# @Access Public
@api_view(['POST'])
def delete_all(request):
    UserModel.objects.all().delete()

    return Response({
        "msg" : "Deleted all record"
    })

# @Route POST /auth/test_auth
# @Desc Test authenticated view
# @Access Private
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def test_auth(request):
    return Response({
        'msg' : 'Authenticated view reached!!!'
    })