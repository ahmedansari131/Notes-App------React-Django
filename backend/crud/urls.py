from django.urls import path
from .views import FetchNote, CreateNote, DeleteNote, UpdateNote, CreateNoteLabel

urlpatterns = [
    path('', FetchNote.as_view(), name="notes"),
    path('<int:id>/', FetchNote.as_view(), name="note"),
    path('createnote/', CreateNote.as_view(), name="createNote"),
    path('deletetodo/<int:pk>/', DeleteNote.as_view(), name="deleteNote"),
    path('updatenote/<int:pk>/', UpdateNote.as_view(), name="updateNote"),
    path('createlabel/', CreateNoteLabel.as_view(), name="createNoteLabel"),
    path('getlabel/', CreateNoteLabel.as_view(), name="getNoteLabels"),
    path('updatelabel/<str:pk>/', CreateNoteLabel.as_view(), name="updateNoteLabel"),
    path('deletelabel/<str:pk>/', CreateNoteLabel.as_view(), name="deleteNoteLabel"),
    path('uploadnoteimage/<str:pk>/', UpdateNote.as_view(), name="uploadNoteImage"),
    path('deletenoteimage/<str:pk>/', UpdateNote.as_view(), name="deleteNoteImage"),
]