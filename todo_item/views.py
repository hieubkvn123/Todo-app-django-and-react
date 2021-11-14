from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import TodoItem
from .serializers import TodoItemSerializer

import sys, traceback

# Create your views here.
class TodoItemViewset(ModelViewSet):
	queryset = TodoItem.objects.all()
	serializer_class = TodoItemSerializer
	permission_classes = [permissions.IsAuthenticated]

	def list(self, request, pk=None):
		token = request.headers['Authorization'].split(' ')[1]
		username = Token.objects.get(key=token).user.username

		# Get uncompleted tasks of users
		queryset = TodoItem.objects.filter(username=username, status=False)

		return Response({
			'payload' : {
				'items' : queryset.values()
			},
			'msg' : 'Get items success!' 
		})

	def list_completed(self, request, pk=None):
		token = request.headers['Authorization'].split(' ')[1]
		username = Token.objects.get(key=token).user.username

		# Get completed tasks of users
		queryset = TodoItem.objects.filter(username=username, status=True)

		return Response({
			'payload' : {
				'items' : queryset.values()
			},
			'msg' : 'Get items success!'
		})

	def complete_task(self, request, pk=None):
		if(request.method == 'POST'):
			username = request.data['username']
			title = request.data['title']

			try:
				todo = TodoItem.objects.filter(username=username, title=title)
				todo.update(status=True)
			
				return Response({
					'payload' : todo[0].id,
					'msg' : 'Todo item updated!'
				})
			except:
				traceback.print_exc(file=sys.stdout)
				return Response({
					'msg' : 'Something went wrong, please try again'
				}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({
				'msg' : 'Method not allowed'
			}, status=status.HTTP_405_METHOD_NOT_ALLOWED)