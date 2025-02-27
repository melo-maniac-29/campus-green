from django.db import models
from django.contrib.auth.models import User

class WasteItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_type = models.CharField(max_length=100)
    points = models.IntegerField()
    bin_type = models.CharField(max_length=1)  # 'R' for recycling, 'L' for landfill
    image = models.ImageField(upload_to='waste_images/')  # Store uploaded images

    def __str__(self):
        return f"{self.item_type} by {self.user.username}"