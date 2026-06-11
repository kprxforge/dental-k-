import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { Calendar, Users, Clipboard, Clock, CheckCircle, ChevronRight, User } from 'lucide-react';

export const DoctorDashboard = () => {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);

  const stats = [
    { label: "Today's Visits", value: "8", icon: Calendar, color: "text-gold" },
    { label: "Total Patients", value: "142", icon: Users, color: "text-blue-400" },
    { label: "Pending Notes", value: "4", icon: Clipboard, color: "text-red-400" },
    { label: "Hours Logged", value: "112", icon: Clock, color: "text-green-400" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold tracking-tighter">Doctor's <span className="text-gold">Station</span></h2>
           <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-1">Specialist: Orthodontics & Implants</p>
        </div>
        <button className="px-6 py-2 rounded-full bg-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">View All Patients</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex items-center gap-6">
             <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-7 h-7" />
             </div>
             <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{stat.label}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Today's Queue */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <h3 className="text-xl font-bold tracking-tighter flex items-center gap-3">
             <Clock className="w-5 h-5 text-gold" />
             Today's Treatment Queue
          </h3>
          <div className="space-y-4">
            {[
              { patient: "Scarlett Johansson", time: "09:00 AM", treatment: "Porcelain Veneers", status: "Ongoing" },
              { patient: "Robert Downey Jr", time: "11:30 AM", treatment: "Dental Implant", status: "Waiting" },
              { patient: "Chris Evans", time: "02:00 PM", treatment: "Scaling & Polishing", status: "Confirmed" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-gold/30 transition-all cursor-pointer group">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                       <User className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-white">{item.patient}</p>
                       <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{item.time} • {item.treatment}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.status === 'Ongoing' ? 'bg-gold/20 text-gold' : 'bg-white/5 text-white/30'}`}>
                       {item.status}
                    </span>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary / Notes */}
        <div className="col-span-12 lg:col-span-5 p-10 rounded-[32px] bg-gold/5 border border-gold/10">
           <h3 className="text-xl font-bold tracking-tighter mb-8 italic">Internal Notes</h3>
           <textarea 
             className="w-full h-48 bg-transparent border-none text-white/60 text-sm focus:ring-0 p-0 resize-none placeholder:text-white/10"
             placeholder="Jot down quick patient observations or follow-up tasks for your assistant..."
           />
           <div className="pt-8 border-t border-gold/10 mt-8 flex justify-between items-center">
              <span className="text-[10px] text-gold uppercase tracking-widest font-bold">Auto-saving to cloud</span>
              <button className="flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest">
                Save Draft <CheckCircle className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
