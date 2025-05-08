from django.contrib import admin
from .models import ParkingSpot, Booking

@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'spot_type', 'is_available', 'owner', 'latitude', 'longitude', 'max_regular', 'max_accessible')
    search_fields = ('location', 'spot_type')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'parking_spot', 'parking_type', 'start_time', 'end_time')
