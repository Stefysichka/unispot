import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSpots = () => {
  const [spots, setSpots] = useState([]);
  const [newSpot, setNewSpot] = useState({ location: '', latitude: '', longitude: '', spot_type: 'regular' });
  const [editSpotId, setEditSpotId] = useState(null);
  const [editSpot, setEditSpot] = useState({ location: '', latitude: '', longitude: '', spot_type: 'regular' });

  const fetchSpots = () => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/parking/spots/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setSpots(response.data))
    .catch(error => console.error('Error fetching spots:', error));
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/parking/spots/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => fetchSpots());
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/api/parking/spots/', newSpot, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setNewSpot({ location: '', latitude: '', longitude: '', spot_type: 'regular' });
      fetchSpots();
    });
  };

  const handleEdit = (spot) => {
    setEditSpotId(spot.id);
    setEditSpot({
      location: spot.location,
      latitude: spot.latitude,
      longitude: spot.longitude,
      spot_type: spot.spot_type
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/api/parking/spots/${editSpotId}/`, editSpot, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setEditSpotId(null);
      setEditSpot({ location: '', latitude: '', longitude: '', spot_type: 'regular' });
      fetchSpots();
    });
  };

  return (
    <div class = "admin-spots">
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Локація"
          value={newSpot.location}
          onChange={(e) => setNewSpot({ ...newSpot, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Широта"
          value={newSpot.latitude}
          onChange={(e) => setNewSpot({ ...newSpot, latitude: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Довгота"
          value={newSpot.longitude}
          onChange={(e) => setNewSpot({ ...newSpot, longitude: e.target.value })}
          required
        />
        <select
          value={newSpot.spot_type}
          onChange={(e) => setNewSpot({ ...newSpot, spot_type: e.target.value })}
        >
          <option value="regular">Звичайне</option>
          <option value="accessible">Для осіб з інвалідністю</option>
        </select>
        <button type="submit">Додати місце</button>
      </form>

      <ul>
        {spots.map(spot => (
          <li key={spot.id}>
            {editSpotId === spot.id ? (
              <form onSubmit={handleUpdate} className="edit-form">
               <div className="edit-form-fields">
                  <input
                    type="text"
                    value={editSpot.location}
                    onChange={(e) => setEditSpot({ ...editSpot, location: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    value={editSpot.latitude}
                    onChange={(e) => setEditSpot({ ...editSpot, latitude: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    value={editSpot.longitude}
                    onChange={(e) => setEditSpot({ ...editSpot, longitude: e.target.value })}
                    required
                  />
                  <select
                    value={editSpot.spot_type}
                    onChange={(e) => setEditSpot({ ...editSpot, spot_type: e.target.value })}
                  >
                    <option value="regular">Звичайне</option>
                    <option value="accessible">Для осіб з інвалідністю</option>
                  </select>
                </div>
                <div className="edit-form-buttons">
                  <button type="submit">Оновити</button>
                  <button type="button" onClick={() => setEditSpotId(null)}>Скасувати</button>
                </div>
              </form>
            ) : (
              <div className="spot-row"> 
                <span>
                  {spot.location} (Lat: {spot.latitude}, Lng: {spot.longitude}) - {spot.spot_type}
                </span>
                <div className="buttons">
                  <button onClick={() => handleDelete(spot.id)}>Видалити</button>
                  <button onClick={() => handleEdit(spot)}>Редагувати</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AdminSpots;