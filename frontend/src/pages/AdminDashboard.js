import React, { useState } from 'react';
import AdminStats from './AdminStats';
import AdminSpots from './AdminSpots';
import AdminUsers from './AdminUsers';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  return (
    <div class = "admin-dashboard">
      <section>
        <AdminStats />
      </section>

      <div class = "admin-controls">
        <button onClick={() => setActiveSection(activeSection === 'spots' ? null : 'spots')}>
          {activeSection === 'spots' ? 'Сховати керування паркувальними зонами' : 'Керування паркувальними зонами'}
        </button>
        <button onClick={() => setActiveSection(activeSection === 'users' ? null : 'users')}>
          {activeSection === 'users' ? 'Сховати керування користувачами' : 'Керування користувачами'}
        </button>
      </div>

      {activeSection === 'spots' && <AdminSpots />}
      {activeSection === 'users' && <AdminUsers />}
    </div>
  );
};

export default AdminDashboard;
