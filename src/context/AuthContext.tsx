import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isDoctor: boolean;
  isPatient: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isDoctor: false,
  isPatient: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.email);
      try {
        setUser(user);
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          let docSnap = null;
          try {
            docSnap = await getDoc(docRef);
          } catch (dbError) {
            console.warn("Firestore profile fetch failed (offline/permission error), using fallback profile:", dbError);
          }

          if (docSnap && docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            console.log("No profile found or failed to fetch, creating default...");
            // If it's an admin-looking email, give it admin role for demo purposes
            const role = user.email?.includes('admin') ? 'admin' : 'patient';
            const newProfile: UserProfile = {
              userId: user.uid,
              name: user.displayName || user.email?.split('@')[0] || 'User',
              email: user.email || '',
              role: role as any,
              phone: '',
              photoURL: user.photoURL || '',
              createdAt: new Date().toISOString()
            };
            setProfile(newProfile);
            // Optionally save to Firestore if you want it to persist
            // await setDoc(docRef, newProfile);
          }
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
        clearTimeout(safetyTimeout);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    isDoctor: profile?.role === 'doctor',
    isPatient: profile?.role === 'patient',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
