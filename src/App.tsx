import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Components
import { GlobalBackground } from './components/GlobalBackground';
import { WallpaperSettings } from './components/WallpaperSettings';
import { WallpaperConfig, DEFAULT_WALLPAPER_CONFIG } from './types/wallpaper';

// Pages
import { Landing } from './pages/Landing';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AppointmentBooking } from './pages/AppointmentBooking';
import { Profile } from './pages/Profile';

// Portals
import { AdminPortal } from './pages/admin/AdminPortal';
import { DoctorPortal } from './pages/doctor/DoctorPortal';

export default function App() {
  const [wallpaperConfig, setWallpaperConfig] = useState<WallpaperConfig>(DEFAULT_WALLPAPER_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('wallpaper_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.url && parsed.url.includes('photo-1629909613654-28e377c37b09')) {
          parsed.url = DEFAULT_WALLPAPER_CONFIG.url;
          localStorage.setItem('wallpaper_config', JSON.stringify(parsed));
        }
        setWallpaperConfig(parsed);
      } catch (e) {
        console.error("Failed to parse wallpaper config", e);
      }
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalBackground config={wallpaperConfig} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/appointments" element={<AppointmentBooking />} />

          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Admin Portal */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminPortal 
                  wallpaperConfig={wallpaperConfig} 
                  onWallpaperChange={setWallpaperConfig} 
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/*" 
            element={
              <ProtectedRoute roles={['doctor']}>
                <DoctorPortal />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
