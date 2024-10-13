import cloudinary
import cloudinary.uploader
import cloudinary.api
import os

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

def upload_on_cloudinary(local_file_path):
    try:
        if local_file_path is None:
            return None
        cloudinary_url = cloudinary.uploader.upload(local_file_path, resource_type="auto", folder = "notes/image/",)
        return cloudinary_url
    except Exception as error:
        print("Error occurred while uploading image on cloudinary", error)

def delete_on_cloudinary(public_id):
    try:
        if public_id is None:
            return None
        cloudinary_url = cloudinary.uploader.destroy(public_id, invalidate = True )
        return cloudinary_url
    except Exception as error:
        print("Error occurred while deleting an image on cloudinary", error)
