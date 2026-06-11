import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-t-2 border-gold rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold animate-pulse">Establishing Secure Session</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Wait for profile if we have a user but no profile yet (and we're not loading)
  // This handles the gap between auth state check and firestore profile check
  if (!profile && user) {
     return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-t-2 border-gold rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Synchronizing Profile...</p>
      </div>
    );
  }

  if (roles && profile && !roles.includes(profile.role)) {
    console.warn("Unauthorized access attempt:", profile.role, "tried to access", roles);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
