import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DoctorDashboard } from './DoctorDashboard';
import { Shell } from '../../components/dashboard/Shell';

export const DoctorPortal = () => {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/schedule" element={<div className="text-white/40 uppercase tracking-widest text-xs font-bold">My Personal Schedule coming soon...</div>} />
        <Route path="/patients" element={<div className="text-white/40 uppercase tracking-widest text-xs font-bold">Assigned Patient Records coming soon...</div>} />
        <Route path="*" element={<Navigate to="/doctor" />} />
      </Routes>
    </Shell>
  );
};
