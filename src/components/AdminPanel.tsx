import React from 'react';
import RSVPList from './RSVPList';

const AdminPanel: React.FC = () => {
  return (
    <div className='admin-panel'>
      <div className='admin-header'>
        <h1>Wedding Admin Panel</h1>
        <p>Quản lý thông tin xác nhận tham dự</p>
      </div>

      <RSVPList />
    </div>
  );
};

export default AdminPanel;
