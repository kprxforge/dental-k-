import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { Shell } from '../../components/dashboard/Shell';
import { WallpaperSettings } from '../../components/WallpaperSettings';
import { WallpaperConfig } from '../../types/wallpaper';

interface AdminPortalProps {
  wallpaperConfig: WallpaperConfig;
  onWallpaperChange: (config: WallpaperConfig) => void;
}

export const AdminPortal = ({ wallpaperConfig, onWallpaperChange }: AdminPortalProps) => {
  const EmptyView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
      <div className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">Admin Console</div>
      <h3 className="text-xl font-bold tracking-tighter text-white">{title} Management</h3>
      <p className="text-white/20 text-xs tracking-widest uppercase">Feature integration pending</p>
    </div>
  );

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/appointments" element={<EmptyView title="Appointment" />} />
        <Route path="/patients" element={<EmptyView title="Patient" />} />
        <Route path="/doctors" element={<EmptyView title="Doctor" />} />
        <Route path="/treatments" element={<EmptyView title="Treatment" />} />
        <Route path="/reports" element={<EmptyView title="Reports" />} />
        <Route path="/gallery" element={<EmptyView title="Gallery" />} />
        <Route path="/cms" element={<EmptyView title="Website CMS" />} />
        <Route path="/background" element={
          <div className="space-y-8">
            <div className="flex flex-col space-y-1">
              <h2 className="text-2xl font-bold tracking-tighter text-white uppercase">Background Manager</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Customize global ambience</p>
            </div>
            <div className="max-w-4xl">
              <WallpaperSettings config={wallpaperConfig} onChange={onWallpaperChange} inline hideFloatingButton />
            </div>
          </div>
        } />
        <Route path="/settings" element={<EmptyView title="Settings" />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Shell>
  );
};
