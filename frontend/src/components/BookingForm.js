import React, { useState } from "react";
import "../styles/components.scss";

const BookingForm = ({ parking, onClose }) => {
  const [spotType, setSpotType] = useState("regular");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) {
      setError("Всі поля повинні бути заповнені!");
      return;
    }
  
    if (startTime >= endTime) {
      setError("Початковий час має бути до кінцевого!");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    const startISO = new Date(`${date}T${startTime}`).toISOString();
    const endISO = new Date(`${date}T${endTime}`).toISOString();
  
    const payload = {
      parking_spot: parking.id,
      parking_type: spotType,
      start_time: startISO,
      end_time: endISO,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/parking/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        onClose();
      } else {
        const data = await response.json();
        const errorMsg = data?.non_field_errors?.[0] || "Не вдалося забронювати. Перевір дані або спробуй ще раз.";
        setError(errorMsg);
        console.error("Помилка бронювання:", data);
      }      
    } catch (err) {
      console.error("Помилка запиту:", err);
      setError("Сталася помилка під час бронювання.");
    }
  };
  
  return (
    <div className="booking-form">
      <h3>Бронювання для {parking.location}</h3>
      <label>
        Тип місця:
        <select value={spotType} onChange={(e) => setSpotType(e.target.value)}>
          <option value="regular">Звичайне</option>
          <option value="accessible">Інвалідне</option>
        </select>
      </label>
      <label>
        Дата:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Від:
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label>
        До:
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit}>Забронювати</button>
      <button onClick={onClose} className="cancel-btn">Скасувати</button>
    </div>
  );
};

export default BookingForm;
