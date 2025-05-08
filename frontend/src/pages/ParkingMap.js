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
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapContainerRef.current._leaflet_id) {
      const map = L.map(mapContainerRef.current).setView([49.8397, 24.0297], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      fetch("http://127.0.0.1:8000/api/parking/spots/")
        .then(res => res.json())
        .then(data => {
          data.forEach(spot => {
            if (spot.latitude && spot.longitude) {
              L.marker(
                [spot.latitude, spot.longitude]
                // { icon: customIcon } 
              )
                .addTo(map)
                .bindPopup(spot.location)
                .on("click", () => setSelectedParking(spot));
            }
          });
        })
        .catch(err => console.error("Помилка завантаження паркінгів:", err));
    }
  }, []);

  return (
    <div className="parking-map">
      <div id="map" ref={mapContainerRef}></div>

      {selectedParking && <BookingForm parking={selectedParking} onClose={() => setSelectedParking(null)} />}
    </div>
  );
};

export default ParkingMap;
