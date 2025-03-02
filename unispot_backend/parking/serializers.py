from rest_framework import serializers
from .models import ParkingZone, ParkingSpot

class ParkingZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingZone
        fields = ['id', 'name', 'description', 'location']

class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = ['id', 'zone', 'is_available', 'price_per_hour']
