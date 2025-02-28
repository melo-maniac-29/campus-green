from django.db import models
from django.contrib.auth.models import User
import os
import pyqrcode
from django.conf import settings
class WasteItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_type = models.CharField(max_length=100)
    points = models.IntegerField()
    bin_type = models.CharField(max_length=1)  # 'R' for recycling, 'L' for landfill
    image = models.ImageField(upload_to='waste_images/')  # Store uploaded images

    def __str__(self):
        return f"{self.item_type} by {self.user.username}"
    
class QRCode(models.Model):
    unique_id = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=255)
    bin_type = models.CharField(max_length=50)
    qr_image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)

    def generate_qr(self):
        url = f"http://localhost:8000/scan/{self.unique_id}/"  # Your dynamic URL
        qr = pyqrcode.create(url)

        qr_folder = os.path.join(settings.MEDIA_ROOT, "qr_codes")
        os.makedirs(qr_folder, exist_ok=True)  # Create folder if not exists

        qr_path = os.path.join(qr_folder, f"{self.unique_id}.png")
        qr.png(qr_path, scale=6)

        # Save path to ImageField
        self.qr_image.name = f"qr_codes/{self.unique_id}.png"
        self.save()

        print(f"QR Code generated for: {self.unique_id} at {qr_path}")

    def __str__(self):
        return self.unique_id