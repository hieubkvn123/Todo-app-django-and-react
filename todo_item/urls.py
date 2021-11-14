from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import TodoItemViewset

router = DefaultRouter()
router.register('items', TodoItemViewset)

urlpatterns = [
	path('items/complete', TodoItemViewset.as_view({'post' : 'complete_task'}), name='todo_item_complete'),
	path('items/get_complete', TodoItemViewset.as_view({'get' : 'list_completed'}), name='todo_item_get_complete')
]
urlpatterns += router.urls