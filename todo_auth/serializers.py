from .models import UserModel
from rest_framework.serializers import ModelSerializer

class UserSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'