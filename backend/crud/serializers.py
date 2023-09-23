from .models import TodoList
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = "__all__"


class CreateTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ["title", "description"]
    def validate(self, data):
        print("In validation function", data)
        title = data.get('title')
        desc = data.get('description')

        if title and len(title) < 5:
            raise serializers.ValidationError("Title should be bigger than 5 characters")
        
        if desc and len(desc) < 10:
            raise serializers.ValidationError("Description should be bigger than 10 characters")
        return data
    

class DeleteTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ["id"]