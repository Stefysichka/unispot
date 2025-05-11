import React, { useEffect, useState } from 'react';
import axios from 'axios';

function toDatetimeLocalValue(date) {
  const local = new Date(date);
  const offset = local.getTimezoneOffset();
  const localDate = new Date(local.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16); 
}


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');

  const fetchBookings = () => {
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
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = (id, booking) => {
    if (!booking) {
      console.error('Booking object is undefined!');
      return;
    }
  
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/api/parking/bookings/${id}/`, {
      parking_spot: booking.parking_spot,
      parking_type: booking.parking_type,
      start_time: new Date(newStartTime).toISOString(),
      end_time: new Date(newEndTime).toISOString(),

    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setEditingId(null);
      setNewStartTime('');
      setNewEndTime('');
      fetchBookings();
    })
    .catch(error => console.error('Error updating booking:', error));
  };
  
  

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/parking/bookings/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setBookings(prev => prev.filter(b => b.id !== id));
    })
    .catch(error => console.error('Error deleting booking:', error));
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  if (bookings.length === 0) {
    return <p>У вас поки немає бронювань.</p>;
  }

  return (
    <div className="my-bookings">
      <ul className="booking-list">
        {bookings.map(booking => (
          <li key={booking.id} className="booking-item">
            <div>
              <strong>Місце:</strong> {booking.parking_spot}
            </div>
            <div>
              <strong>Дата:</strong> {formatDateTime(booking.start_time)} - {formatDateTime(booking.end_time)}
            </div>

            {editingId === booking.id ? (
              <div className="edit-form">
                <label>Початок:</label>
                <input 
                  type="datetime-local" 
                  value={newStartTime} 
                  onChange={(e) => setNewStartTime(e.target.value)} 
                />
                <label>Кінець:</label>
                <input 
                  type="datetime-local" 
                  value={newEndTime} 
                  onChange={(e) => setNewEndTime(e.target.value)} 
                />
                <button onClick={() => handleUpdate(booking.id, booking)}>Зберегти</button>
                <button className="cancel-button" onClick={() => setEditingId(null)}>Скасувати</button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setEditingId(booking.id);
                    setNewStartTime(toDatetimeLocalValue(booking.start_time));
                    setNewEndTime(toDatetimeLocalValue(booking.end_time));
                  }}
                >
                  Редагувати
                </button>
                <button className="cancel-button" onClick={() => handleDelete(booking.id)}>Видалити бронювання</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
