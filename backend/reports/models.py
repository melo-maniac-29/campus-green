from django.db import models
from django.contrib.auth.models import User

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')  # User who created the report
    title = models.CharField(max_length=200)  # Title of the report
    location = models.CharField(max_length=255)  # Location of the report
    description = models.TextField()  # Description of the report
    image = models.ImageField(upload_to='report_images/')  # Image for the report
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the report was created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when the report was last updated

    def __str__(self):
        return f"{self.title} by {self.user.username}"

