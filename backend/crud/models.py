from django.db import models

class TodoList(models.Model):
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=10000)
    created_at = models.DateTimeField(auto_now=True)
    udpated_at = models.DateTimeField(auto_now_add=True)
    pinned = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title