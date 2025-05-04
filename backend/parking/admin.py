from django.contrib import admin
from .models import ParkingSpot, Booking

@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = ('location', 'spot_type', 'is_available', 'latitude', 'longitude', 'max_regular', 'max_accessible')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'parking_spot', 'parking_type', 'start_time', 'end_time')
