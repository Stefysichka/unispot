from rest_framework import generics
from .models import ParkingZone, ParkingSpot
from .serializers import ParkingZoneSerializer, ParkingSpotSerializer

class ParkingZoneListView(generics.ListCreateAPIView):
    queryset = ParkingZone.objects.all()
    serializer_class = ParkingZoneSerializer

class ParkingSpotListView(generics.ListCreateAPIView):
    queryset = ParkingSpot.objects.all()
    serializer_class = ParkingSpotSerializer
