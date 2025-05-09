from rest_framework import generics, permissions
from .models import ParkingSpot, Booking
from .serializers import ParkingSpotSerializer, BookingSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import User
from .permissions import IsAdminOrReadOnly

class ParkingSpotListCreateView(generics.ListCreateAPIView):
    queryset = ParkingSpot.objects.all()
    serializer_class = ParkingSpotSerializer
    permission_classes = [IsAdminOrReadOnly]


    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()


class ParkingSpotRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ParkingSpot.objects.all()
    serializer_class = ParkingSpotSerializer
    permission_classes = [IsAdminOrReadOnly]

class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class AdminStatisticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users_count = User.objects.count()
        spots_count = ParkingSpot.objects.count()
        bookings_count = Booking.objects.count()
        return Response({
            'total_users': users_count,
            'total_parking_spots': spots_count,
            'total_bookings': bookings_count
        })

class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
