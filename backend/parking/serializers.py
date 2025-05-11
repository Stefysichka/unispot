from rest_framework import serializers
from .models import ParkingSpot, Booking
from rest_framework.exceptions import ValidationError

class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = '__all__'
        read_only_fields = ['id', 'owner', 'created_at']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']

    def validate(self, data):
        spot = data['parking_spot']
        parking_type = data['parking_type']
        start = data['start_time']
        end = data['end_time']

        overlapping = Booking.objects.filter(
            parking_spot=spot,
            parking_type=parking_type,
            start_time__lt=end,
            end_time__gt=start
        ).count()

        max_allowed = spot.max_regular if parking_type == 'regular' else spot.max_accessible

        if overlapping >= max_allowed:
            raise ValidationError("На цей час всі місця вже зайняті.")

        return data