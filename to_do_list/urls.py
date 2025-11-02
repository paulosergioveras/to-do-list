from django.urls import path
from . import views


urlpatterns = [
    path('tasks/', views.TodoListCreateView.as_view(), name='tasks-list-create'),
    path('tasks/<int:pk>/', views.BookRetrieveUpdateDestroyView.as_view(), name='tasks-retrieve-update-destroy'),
]
