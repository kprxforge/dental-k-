import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { Shell } from '../components/dashboard/Shell';
import { motion } from 'motion/react';
import { User, Mail, Phone, Shield, Camera, Save, AlertCircle } from 'lucide-react';

export const Profile = () => {
  const { profile, user } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), formData);
      setMessage('Profile updated elegantly.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Shell>
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter">Your <span className="text-gold">Identity</span></h2>
          <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold mt-2">Personal Security & Aesthetic Profile</p>
        </div>

        <div className="p-10 rounded-[32px] bg-white/5 border border-white/10 space-y-10">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-dashed border-gold/30 flex items-center justify-center overflow-hidden">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white/10" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
               <h3 className="text-xl font-bold">{profile?.name}</h3>
               <p className="text-gold text-[10px] uppercase font-bold tracking-widest">{profile?.role}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-gold outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email"
                  value={profile?.email}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm opacity-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Concierge Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-gold outline-none transition-all"
                  placeholder="+1 (555) LUX-GOLD"
                />
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {message && (
                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20 flex items-center gap-3 text-gold text-xs">
                  <Shield className="w-4 h-4" />
                  {message}
                </div>
              )}
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full py-5 rounded-2xl bg-gold text-black font-bold uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSaving ? 'Updating...' : 'Save Signature Profile'}
                <Save className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Shell>
  );
};
