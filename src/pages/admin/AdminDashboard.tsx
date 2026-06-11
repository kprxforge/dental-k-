import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion } from 'motion/react';
import { Users, Calendar, DollarSign, Activity, FileCheck, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    patients: 1240,
    appointments: 89,
    revenue: 45200,
    doctors: 12
  });

  const chartData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 8000 },
    { name: 'Fri', revenue: 12000 },
    { name: 'Sat', revenue: 9000 },
    { name: 'Sun', revenue: 4200 },
  ];

  const StatCard = ({ title, value, icon: Icon, change, isPositive }: any) => (
    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}%
        </div>
      </div>
      <div>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">{title}</p>
        <p className="text-3xl font-bold">{typeof value === 'number' && title === 'Revenue' ? `$${value.toLocaleString()}` : value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tighter">Admin <span className="text-gold">Operations</span></h2>
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Export Reports</button>
          <button className="px-6 py-2 rounded-full bg-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">New Patient</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.patients} icon={Users} change={12} isPositive={true} />
        <StatCard title="Active Appointments" value={stats.appointments} icon={Calendar} change={5} isPositive={true} />
        <StatCard title="Revenue" value={stats.revenue} icon={DollarSign} change={24} isPositive={true} />
        <StatCard title="Total Doctors" value={stats.doctors} icon={Briefcase} change={2} isPositive={false} />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-8 p-10 rounded-[32px] bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold tracking-tighter">Financial Analytics</h3>
            <select className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-gold focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff30', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff30', fontSize: 10 }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#ffffff10', borderRadius: '16px' }}
                  itemStyle={{ color: '#D4AF37', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-4 p-10 rounded-[32px] bg-white/5 border border-white/10 space-y-8">
          <h3 className="text-xl font-bold tracking-tighter">Recent Activities</h3>
          <div className="space-y-6">
            {[
              { action: 'New Appointment', patient: 'Lana Del Rey', time: '2 mins ago', icon: Calendar },
              { action: 'Invoice Paid', patient: 'Elon Musk', time: '15 mins ago', icon: DollarSign },
              { action: 'Report Uploaded', patient: 'Jeff Bezos', time: '1 hour ago', icon: FileCheck },
              { action: 'New Patient', patient: 'Tim Cook', time: '3 hours ago', icon: Users },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold/50 shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white mb-0.5">{item.action}</p>
                  <p className="text-[10px] text-white/40">{item.patient} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 rounded-2xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/5 transition-all">View Full Logs</button>
        </div>
      </div>
    </div>
  );
};
