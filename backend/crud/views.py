from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import TodoListSerializer, CreateTodoSerializer
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
        print(request.data)
        title = data.get("title")
        desc = data.get("description")
        print(serializer)
        print("This is title:", title)
        print("This is desc:", desc)
        
        if serializer.is_valid():
            print("In validation")
            todo = serializer.save()
            return Response({"Msg": "Data has been saved"})
        else:
            print("Unsuccess")
        return Response("Error occurred")
    

class DeleteTodo(APIView):
    def delete(self, request, pk, format=None):
        print(pk)
        todo = TodoList.objects.get(id=pk)
        todo.delete()

        return Response({"Msg": "Todo id received at the backend"})
