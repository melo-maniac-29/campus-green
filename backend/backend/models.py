from django.db import models
from django.contrib.auth.models import User

class Points(models.Model):
    ACHIEVEMENT_CHOICES = [
        ('waste_disposed', 'Waste Disposed'),
        ('bonus', 'Bonus'),
        ('recycle', 'Recycle'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='points')  # User who earned points
    points = models.IntegerField()  # Number of points earned
    achievement_type = models.CharField(max_length=50, choices=ACHIEVEMENT_CHOICES)  # Type of achievement
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the points were awarded

    def __str__(self):
        return f"{self.user.username} - {self.points} points ({self.achievement_type})"

    @classmethod
    def update_points(cls, user, points, achievement_type):
        """Method to create and update user points."""
        cls.objects.create(user=user, points=points, achievement_type=achievement_type)

    @classmethod
    def get_total_points(cls, user):
        """Method to get total points of a user."""
        return cls.objects.filter(user=user).aggregate(total=models.Sum('points'))['total'] or 0
