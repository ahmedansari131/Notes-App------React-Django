import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import TodoListSerializer, CreateTodoSerializer, UpdateTodoSerializer
from .models import *
from rest_framework import status


class FetchTodo(APIView):
    def get(self, request, id=None):
        if id is not None:
            note = TodoList.objects.get(pk=id)
            serializer = TodoListSerializer(note)
            return Response(serializer.data, status=200)
        else:
            todo_list = TodoList.objects.all()
            serializer = TodoListSerializer(todo_list, many=True)
            return Response(serializer.data, status=200)


class CreateTodo(APIView):
    def post(self, request):
        data = request.data
        serializer = CreateTodoSerializer(data=data)

        if serializer.is_valid():
            todo = serializer.save()
            return Response({"Message": "Data has been saved"})
        else:
            print("Unsuccess")
        return Response("Error occurred")


class DeleteTodo(APIView):
    def delete(self, request, pk, format=None):
        todo = TodoList.objects.get(id=pk)
        todo.delete()
        return Response({"Message": "Note binned successfully"})
    


class UpdateTodo(APIView):
    def put(self, request, pk, format=None):
        data = request.data
        print("This is data for updation", data)
        serializer = UpdateTodoSerializer(data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            note = TodoList.objects.get(id=pk)

            if "title" in data and "description" in data:
                note.title = data.get("title")
                note.description = data.get("description")

            if "pin" in data:
                if note.pinned == data.get("pin"):
                    note.pinned = not data.get("pin")
                else:
                    note.pinned = data.get("pin")

                if note.pinned:
                    note.archived = False

            if "archived" in data:
                if note.archived == data.get("archived"):
                    note.archived = not data.get("archived")
                else:
                    note.archived = data.get("archived")
                
                if note.archived:
                    note.pinned = False


            note.save()
            return Response({"status": 200, "Message": "Note updated successfully"})

        return Response(
            {"status": 400, "Message": "Something went wrong while updating note"}
        )
