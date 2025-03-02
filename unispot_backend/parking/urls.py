from django.urls import path
from .views import ParkingZoneListView, ParkingSpotListView

urlpatterns = [
    path('zones/', ParkingZoneListView.as_view(), name='parking-zones'),
    path('spots/', ParkingSpotListView.as_view(), name='parking-spots'),
]
