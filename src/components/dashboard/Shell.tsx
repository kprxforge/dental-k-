import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bluetooth as Tooth,
  Bell,
  Search,
  Users,
  Briefcase,
  History,
  Image as ImageIcon,
  Globe,
  Palette
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const { profile, isAdmin, isDoctor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const patientLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'History', icon: History, path: '/history' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Appointments', icon: Calendar, path: '/admin/appointments' },
    { name: 'Patients', icon: Users, path: '/admin/patients' },
    { name: 'Doctors', icon: Briefcase, path: '/admin/doctors' },
    { name: 'Treatments', icon: Tooth, path: '/admin/treatments' },
    { name: 'Reports', icon: FileText, path: '/admin/reports' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Website CMS', icon: Globe, path: '/admin/cms' },
    { name: 'Background', icon: Palette, path: '/admin/background' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const doctorLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/doctor' },
    { name: 'My Schedule', icon: Calendar, path: '/doctor/schedule' },
    { name: 'Patient Records', icon: Users, path: '/doctor/patients' },
    { name: 'Treatment Plans', icon: FileText, path: '/doctor/plans' },
  ];

  const links = isAdmin ? adminLinks : isDoctor ? doctorLinks : patientLinks;

  return (
    <div className="min-h-screen bg-transparent flex text-white font-sans overflow-hidden relative">
      <div className="fixed inset-0 bg-black/60 z-0 pointer-events-none" />
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0A0A0A] border-r border-white/5 flex flex-col relative z-20">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
              <Tooth className="w-5 h-5 text-gold" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-white">LUXURY<span className="text-gold">DENTAL</span></h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                location.pathname === link.path 
                  ? 'bg-gold text-black font-bold' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon className={`w-5 h-5 ${location.pathname === link.path ? 'text-black' : 'text-white/20 group-hover:text-gold'}`} />
              <span className="text-xs uppercase tracking-widest">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut className="w-5 h-5 text-white/20 group-hover:text-red-500" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-[#0A0A0A]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10 relative z-10">
          <div className="flex items-center gap-8 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search records, appointments..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 text-xs outline-none focus:border-gold/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-gold transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full border-2 border-[#0A0A0A]" />
            </button>
            
            <div className="h-10 w-px bg-white/5 mx-2" />

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold text-white">{profile?.name}</p>
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold">{profile?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 font-bold">
                    {profile?.name[0]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Portal */}
        <div className="flex-1 overflow-y-auto p-10 bg-transparent relative custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};
