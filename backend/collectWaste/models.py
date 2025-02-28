from django.db import models
from django.contrib.auth.models import User
from reports.models import Report
from backend.models import Points
# Create your models here.
class CleaningProof(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cleaning_proofs')  # User who cleaned the place
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='cleaning_proofs')  # Report associated with the cleaning
    proof_image = models.ImageField(upload_to='cleaning_proofs/')  # Image proof of cleaning
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')  # Status of cleaning verification
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the proof was uploaded
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when the proof was last updated

    def __str__(self):
        return f"Cleaning proof for {self.report.title} by {self.user.username}"
