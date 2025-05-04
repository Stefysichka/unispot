from django.urls import path
from .views import (
    ParkingSpotListCreateView,
    ParkingSpotRetrieveUpdateDestroyView,
    BookingListCreateView
)

urlpatterns = [
    path('spots/', ParkingSpotListCreateView.as_view(), name='parking_spot_list_create'),
    path('spots/<int:pk>/', ParkingSpotRetrieveUpdateDestroyView.as_view(), name='parking_spot_detail'),
    path('bookings/', BookingListCreateView.as_view(), name='booking_list_create'),
]
