import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { Appointment, Treatment } from '../../types';
import { motion } from 'motion/react';
import { Bluetooth as ToothIcon, Calendar, Clock, FileText, CreditCard, ChevronRight, Sparkles, Activity } from 'lucide-react';
import { format } from 'date-fns';

export const PatientDashboard = () => {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;
      const q = query(
        collection(db, 'appointments'), 
        where('patientId', '==', profile.userId),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snap = await getDocs(q);
      setAppointments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Appointment));
      setLoading(false);
    };
    fetchData();
  }, [profile]);

  const WelcomeCard = () => (
    <div className="relative overflow-hidden p-10 rounded-[32px] bg-gradient-to-br from-gold/20 via-gold/5 to-transparent border border-gold/20">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest">
            Patient Portal
          </div>
          <h2 className="text-4xl font-bold tracking-tighter">Welcome Back, <br /> <span className="text-gold">{profile?.name}</span></h2>
          <p className="text-white/40 max-w-md text-sm">Your oral health is our priority. View your treatment history and manage upcoming sessions from your premium dashboard.</p>
        </div>
        <div className="flex gap-4">
           <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center min-w-[120px]">
              <p className="text-3xl font-bold text-white">{appointments.length}</p>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Visits</p>
           </div>
           <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center min-w-[120px]">
              <p className="text-3xl font-bold text-gold">4.9</p>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Health Score</p>
           </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    </div>
  );

  return (
    <div className="space-y-10">
      <WelcomeCard />

      <div className="grid grid-cols-12 gap-8">
        {/* Appointments Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tighter flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold" />
              Incoming Appointments
            </h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-gold hover:underline">View All History</button>
          </div>

          <div className="space-y-4">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl" />)
            ) : appointments.length > 0 ? (
              appointments.map((app) => (
                <div key={app.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{format(new Date(app.date), 'MMM dd, yyyy')} at {app.timeSlot}</p>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Status: <span className="text-gold">{app.status}</span></p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
              ))
            ) : (
              <div className="p-12 text-center rounded-2xl border border-white/5 bg-white/[0.02]">
                <p className="text-white/20 uppercase tracking-[0.2em] text-xs font-bold">No active sessions found</p>
                <button className="mt-4 text-gold text-xs font-bold hover:underline">Book Your First Visit</button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Mini-cards */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-bold tracking-tighter">Fast Actions</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Treatment Planner', icon: Sparkles, color: 'text-gold' },
              { label: 'Download X-Rays', icon: FileText, color: 'text-blue-400' },
              { label: 'Settle Invoices', icon: CreditCard, color: 'text-green-400' },
            ].map((action, i) => (
              <button key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group">
                <div className="flex items-center gap-4">
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                  <span className="text-xs font-bold uppercase tracking-widest">{action.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
              </button>
            ))}
          </div>

          {/* Health Tip */}
          <div className="p-8 rounded-3xl bg-gold/5 border border-gold/10 relative overflow-hidden group">
             <h4 className="text-gold font-bold mb-2">Daily Oral Tip</h4>
             <p className="text-white/50 text-xs leading-relaxed italic italic">"Maintain your porcelain veneers by avoiding abrasive toothpaste and scheduling bi-annual polishing sessions."</p>
             <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ToothIcon className="w-24 h-24 text-gold rotate-12" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
