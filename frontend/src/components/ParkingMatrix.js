import React from "react";
import "../styles/components.scss";

const ParkingMatrix = ({ selectedSpot }) => {
  return (
    <div className="parking-matrix">
      <h2>Матриця паркування</h2>
      <p>Ви вибрали місце: {selectedSpot}</p>
      {/* Тут буде логіка для матриці */}
    </div>
  );
};

export default ParkingMatrix;