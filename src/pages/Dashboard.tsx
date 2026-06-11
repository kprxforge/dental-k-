import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shell } from '../components/dashboard/Shell';
import { PatientDashboard } from './patient/PatientDashboard';
import { AdminDashboard } from './admin/AdminDashboard';
import { DoctorDashboard } from './doctor/DoctorDashboard';

export const Dashboard = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <Shell>
      {profile.role === 'admin' && <AdminDashboard />}
      {profile.role === 'doctor' && <DoctorDashboard />}
      {profile.role === 'patient' && <PatientDashboard />}
    </Shell>
  );
};
