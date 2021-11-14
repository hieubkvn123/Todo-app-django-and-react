from django.db import models
from django.utils import timezone

# Create your models here.
class TodoItem(models.Model):
	# Register composite primary key
	class Meta:
		unique_together = (('username', 'title'))
		
	username = models.CharField(max_length=100, unique=False)
	title = models.CharField(max_length=100, unique=True)
	description = models.CharField(max_length=500, unique=False)
	created_date = models.DateTimeField(default=timezone.now)
	due_date = models.DateTimeField()
	status = models.BooleanField(default=False)