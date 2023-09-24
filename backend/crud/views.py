import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import TodoListSerializer, CreateTodoSerializer, UpdateTodoSerializer
from .models import *
from rest_framework import status



class FetchTodo(APIView):
    def get(self, request):
        todo_list = TodoList.objects.all()
        serializer = TodoListSerializer(todo_list, many=True)
        return Response(serializer.data)


class CreateTodo(APIView):
    def post(self, request, format=None):
        data = request.data
        serializer = CreateTodoSerializer(data=data)
        
        if serializer.is_valid():
            todo = serializer.save()
            return Response({"Msg": "Data has been saved"})
        else:
            print("Unsuccess")
        return Response("Error occurred")
    

class DeleteTodo(APIView):
    def delete(self, request, pk, format=None):
        todo = TodoList.objects.get(id=pk)
        todo.delete()

        return Response({"Msg": "Todo id received at the backend"})
    

class UpdateTodo(APIView):
    def put(self, request, pk, format=None):
        data = (request.data)
        serializer = UpdateTodoSerializer(data = request.data, partial=False)
        if serializer.is_valid(raise_exception=True):
            todo = TodoList.objects.get(id=pk)
            todo.title = request.data.get('title')
            todo.description = request.data.get('description')
            todo.save()
        return Response({"Msg": "Todo id received at the backend for updation"})
