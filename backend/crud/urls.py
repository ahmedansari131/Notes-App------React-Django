from django.urls import path
from .views import FetchTodo, CreateTodo, DeleteTodo, UpdateTodo

urlpatterns = [
    path('', FetchTodo.as_view(), name="todolist"),
    path('<int:id>/', FetchTodo.as_view(), name="note"),
    path('createnote/', CreateTodo.as_view(), name="createNote"),
    path('deletetodo/<int:pk>/', DeleteTodo.as_view(), name="deletetodo"),
    path('updatetodo/<int:pk>/', UpdateTodo.as_view(), name="updatetodo"),
]