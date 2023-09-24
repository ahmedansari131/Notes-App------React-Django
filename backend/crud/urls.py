from django.urls import path, include
from .views import FetchTodo, CreateTodo, DeleteTodo, UpdateTodo

urlpatterns = [
    path('', FetchTodo.as_view(), name="todolist"),
    path('createtodo/', CreateTodo.as_view(), name="createtodo"),
    path('deletetodo/<int:pk>/', DeleteTodo.as_view(), name="deletetodo"),
    path('updatetodo/<int:pk>/', UpdateTodo.as_view(), name="updatetodo"),
]
