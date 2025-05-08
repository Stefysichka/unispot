import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://127.0.0.1:8000/api/parking/admin-stats/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setStats(response.data);
    })
    .catch(error => {
      console.error('Error fetching stats:', error);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div class = "admin-stats">
      <h2>Загальна статистика</h2>
      <p>Користувачі: {stats.total_users}</p>
      <p>Паркувальні місця: {stats.total_parking_spots}</p>
      <p>Бронювання: {stats.total_bookings}</p>
    </div>
  );
};

export default AdminStats;
