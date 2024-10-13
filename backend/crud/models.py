import uuid
from django.db import models


class NoteLabel(models.Model):
    name = models.CharField(max_length=50, unique=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.name


class Note(models.Model):
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=10000)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    pinned = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    color = models.CharField(default="", max_length=50, blank=True)
    labels = models.ManyToManyField("NoteLabel", blank=True)
    note_image = models.CharField(max_length=1000, blank=True, default="", null=True)
    note_image_public_id = models.CharField(max_length=1000, blank=True, default="", null=True)

    def __str__(self):
        return self.title
