from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ParkingSpot(models.Model):
    SPOT_TYPES = (
        ('regular', 'Звичайне'),
        ('accessible', 'Для осіб з інвалідністю'),
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='parking_spots')
    location = models.CharField(max_length=255)
    spot_type = models.CharField(max_length=20, choices=SPOT_TYPES, default='regular')
    is_available = models.BooleanField(default=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    max_regular = models.IntegerField(default=0)
    max_accessible = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.location} ({self.get_spot_type_display()})"


class Booking(models.Model):
    PARKING_TYPE_CHOICES = (
        ('regular', 'Regular'),
        ('accessible', 'Accessible'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    parking_spot = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE, related_name='bookings')
    parking_type = models.CharField(max_length=20, choices=PARKING_TYPE_CHOICES)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.parking_spot.location} ({self.parking_type})"
