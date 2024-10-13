from .models import Note, NoteLabel
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class NoteLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteLabel
        fields = ["name", "id"]


class NoteSerializer(serializers.ModelSerializer):
    labels = NoteLabelSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = "__all__"


class CreateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["title", "description"]


class DeleteNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id"]


class UpdateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

    def validate(self, data):
        title = data.get("title")
        desc = data.get("description")

        if title and len(title) < 5:
            raise serializers.ValidationError(
                "Title should be bigger than 5 characters"
            )

        if desc and len(desc) < 10:
            raise serializers.ValidationError(
                "Description should be bigger than 10 characters"
            )
        return data
