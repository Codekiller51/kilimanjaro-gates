import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import TourManagement from './TourManagement';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tours" element={<TourManagement />} />
        <Route path="bookings" element={<div>Bookings Management</div>} />
        <Route path="users" element={<div>Users Management</div>} />
        <Route path="reviews" element={<div>Reviews Management</div>} />
        <Route path="blog" element={<div>Blog Management</div>} />
        <Route path="destinations" element={<div>Destinations Management</div>} />
        <Route path="travel-info" element={<div>Travel Info Management</div>} />
        <Route path="inquiries" element={<div>Inquiries Management</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;