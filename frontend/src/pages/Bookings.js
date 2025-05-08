import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/parking/bookings/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setBookings(response.data);
    })
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });
  }, []);

  const handleUpdate = (id) => {
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/api/parking/bookings/${id}/`, {
      date: newDate,
      start_time: newStartTime,
      end_time: newEndTime
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => window.location.reload())
    .catch(error => console.error('Error updating booking:', error));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/parking/bookings/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => window.location.reload())
    .catch(error => console.error('Error deleting booking:', error));
  };

  if (bookings.length === 0) {
    return <p>У вас поки немає бронювань.</p>;
  }

  return (
    <div class = "my-bookings">
      <ul className="booking-list">
        {bookings.map(booking => (
          <li key={booking.id} className="booking-item">
            <div>
              <strong>Місце:</strong> {booking.parking_spot}
            </div>
            <div>
              <strong>Дата:</strong> {booking.date}
            </div>
            <div>
              <strong>Час:</strong> {booking.start_time} - {booking.end_time}
            </div>
            
            {editingId === booking.id ? (
              <div className="edit-form">
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                <input type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
                <input type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
                <button onClick={() => handleUpdate(booking.id)}>Зберегти</button>
              </div>
            ) : (
              <button onClick={() => setEditingId(booking.id)}>Редагувати</button>
            )}
            
            <button className="cancel-button" onClick={() => handleDelete(booking.id)}>Скасувати</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
