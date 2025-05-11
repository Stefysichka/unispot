import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BookingForm from "../components/BookingForm";
import "../styles/pages.scss";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ParkingMap = () => {
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    if (!mapInstance && mapContainerRef.current) {
      if (mapContainerRef.current._leaflet_id != null) {
        mapContainerRef.current._leaflet_id = null;
      }
  
      const map = L.map(mapContainerRef.current).setView([49.8397, 24.0297], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
      setMapInstance(map);
    }
  }, [mapInstance]);
  

  useEffect(() => {
    if (!mapInstance) return;

    mapInstance.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.removeLayer(layer);
      }
    });

    fetch("http://127.0.0.1:8000/api/parking/spots/")
      .then(res => res.json())
      .then(data => {
        console.log("Маркерів завантажено:", data.length);
        data.forEach(spot => {
          if (spot.latitude && spot.longitude) {
            const lat = parseFloat(spot.latitude);
            const lng = parseFloat(spot.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              L.marker([lat, lng])
                .addTo(mapInstance)
                .bindPopup(spot.location)
                .on("click", () => setSelectedParking(spot));
            }
          }
        });
      })
      .catch(err => console.error("Помилка завантаження паркінгів:", err));
  }, [mapInstance, selectedParking]);

  return (
    <div className="parking-map">
      <div id="map" ref={mapContainerRef} style={{ height: "500px" }}></div>

      {selectedParking && (
        <BookingForm
          parking={selectedParking}
          onClose={() => setSelectedParking(null)}
        />
      )}
    </div>
  );
};

export default ParkingMap;
