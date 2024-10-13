from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    NoteSerializer,
    CreateNoteSerializer,
    UpdateNoteSerializer,
    NoteLabelSerializer,
)
from .models import *
from rest_framework import status
import os
from utils.cloudinary import upload_on_cloudinary, delete_on_cloudinary


class FetchNote(APIView):
    def get(self, request, id=None):
        if id is not None:
            note = Note.objects.get(pk=id)
            serializer = NoteSerializer(note)
            return Response(serializer.data, status=200)
        else:
            notes = Note.objects.all()
            serializer = NoteSerializer(notes, many=True)
            return Response(serializer.data, status=200)


class CreateNote(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            Note.objects.create(**data)
            return Response(
                {"Message": "Note has been saved"}, status=status.HTTP_201_CREATED
            )
        except Exception as error:
            print(error)
            return Response(
                {"Message": "An error occurred on the server"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DeleteNote(APIView):
    def delete(self, request, pk, format=None):
        todo = Note.objects.get(id=pk)
        todo.delete()
        return Response({"Message": "Note binned successfully"})


class UpdateNote(APIView):
    def put(self, request, pk, format=None):
        label_id_param = request.GET.get("labelid")
        label_status_param = request.GET.get("labelstatus")
        label_status = (
            label_status_param.lower() == "true" if label_status_param else False
        )
        data = request.data
        print("This is data for updation", data)
        serializer = UpdateNoteSerializer(data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            try:
                note = Note.objects.get(id=pk)
            except Note.DoesNotExist:
                return Response({"status": 404, "Message": "Note not found"})

            if "title" in data and "description" in data:
                note.title = data.get("title")
                note.description = data.get("description")
                note.save()
                return Response(
                    {
                        "status": 200,
                        "Message": "Note updated successfully",
                    }
                )

            if "pin" in data:
                if note.pinned == data.get("pin"):
                    note.pinned = not data.get("pin")
                else:
                    note.pinned = data.get("pin")

                if note.pinned:
                    note.archived = False
                note.save()
                return Response(
                    {
                        "status": 200,
                        "Message": "Note pinned successfully",
                    }
                )

            if "archived" in data:
                if note.archived == data.get("archived"):
                    note.archived = not data.get("archived")
                else:
                    note.archived = data.get("archived")

                if note.archived and note.pinned:
                    note.pinned = False
                note.save()

                if note.archived:
                    return Response(
                        {
                            "Message": "Note archived",
                        },
                        status=status.HTTP_201_CREATED,
                    )
                else:
                    return Response(
                        {
                            "Message": "Note unarchived",
                        },
                        status=status.HTTP_201_CREATED,
                    )

            if "color" in data:
                if data.get("color") == "":
                    note.color = ""
                else:
                    note.color = data.get("color")
                note.save()
                return Response(
                    {
                        "status": 200,
                        "Message": "Note colored successfully",
                    }
                )

            if label_id_param:
                if label_status:
                    note.labels.add(label_id_param)
                elif not label_status:
                    print("hello")
                    note.labels.remove(label_id_param)
                note.save()
                return Response(
                    {"Message": "Note data updated successfully"},
                    status=status.HTTP_201_CREATED,
                )

            if "image" in data:
                image = data.get("image")

                if image is None:
                    return Response({"status": 404, "Message": "Image not found"})

                local_image_path = "media/notes/"
                os.makedirs(local_image_path, exist_ok=True)
                filename = os.path.join(local_image_path, image.name)
                with open(filename, "wb") as local_file:
                    for chunk in image.chunks():
                        local_file.write(chunk)

                cloudinary_url = upload_on_cloudinary(filename)
                note.note_image = cloudinary_url["secure_url"]
                note.note_image_public_id = cloudinary_url["public_id"]
                note.save()

                if cloudinary_url:
                    os.remove(local_image_path + "/" + image.name)
                return Response(
                    {
                        "status": 200,
                        "Message": "Note updated successfully",
                        "data": cloudinary_url,
                    }
                )

        return Response(
            {"Message": "An error occurred on the server"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    def delete(self, request, pk):
        note = Note.objects.get(id=pk)

        if note:
            public_id = note.note_image_public_id
            if public_id:
                note_image_deleted = delete_on_cloudinary(public_id)
                print(note_image_deleted)
                if note_image_deleted["result"] == "ok":
                    note.note_image = ""
                    note.note_image_public_id = ""
                    note.save()
                    return Response(
                        {"status": 200, "Message": "Note image deleted successfully"}
                    )
            else:
                return Response({"status": 404, "Message": "Note image not found"})

        return Response(
            {"status": 400, "Message": "Something went wrong while updating note"}
        )


class CreateNoteLabel(APIView):
    def post(self, request):
        data = request.data
        print("This is label data", data)

        if not data:
            return Response({"status": 404, "Message": "Data not found"})

        serializer = NoteLabelSerializer(data=data)

        if serializer.is_valid():
            if "id" in data:
                note_label_id = data["id"]
                note_label = NoteLabel.objects.get(id=note_label_id)
                note_label.name = data.get("name")
                print(note_label.name)
                note_label.save()
                return Response({"status": 200})
            serializer.save()
            return Response({"status": 200})
        else:
            return Response(serializer.errors, status=400)

    def get(self, request):
        try:
            note_labels = NoteLabel.objects.all()
            serializer = NoteLabelSerializer(note_labels, many=True)
            return Response(serializer.data, status=200)
        except Exception as error:
            return Response({"Message": error}, status=400)

    def delete(self, request, pk):
        try:
            note_label = NoteLabel.objects.get(id=pk)
            note_label.delete()
            return Response({"status": 200, "Message": "Label deleted successfully"})
        except Exception as error:
            print("Error occurred while deleting the label", error)
            return Response({"status": 400}, error)

    def put(self, request):
        pass
