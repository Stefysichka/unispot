from django.db import models

class ParkingZone(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)  # для простоти, можна додати географічне поле пізніше

    def __str__(self):
        return self.name

class ParkingSpot(models.Model):
    zone = models.ForeignKey(ParkingZone, related_name='spots', on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)
    price_per_hour = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"Spot in {self.zone.name}"
