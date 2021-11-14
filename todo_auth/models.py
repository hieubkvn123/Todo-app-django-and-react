from django.db import models

# Create your models here.
class UserModel(models.Model):
	name = models.CharField(max_length=100, unique=False)
	username = models.CharField(max_length=100, unique=True, primary_key=True)
	password = models.CharField(max_length=100)