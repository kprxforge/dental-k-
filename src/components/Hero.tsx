import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play, Star, Users, MapPin, Phone, Bluetooth as ToothIcon, Sparkles, Activity, Shield, Droplets, Smile } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-transparent pt-20">
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-12 items-center min-h-[calc(100vh-80px)] py-12">
        {/* Left Side Content */}
        <div className="col-span-12 lg:col-span-6 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-gold/50" />
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold">The Future of Dentistry</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-medium leading-[0.95] text-white"
            >
              Crafting <br />
              Perfect Smiles <br />
              Through <span className="font-serif italic text-gold">Innovation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-lg max-w-lg leading-relaxed font-light"
            >
              Experience the next generation of dental care with precision, advanced technology, and world-class specialists.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="px-10 py-5 gold-button rounded-full font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-3">
              Book Appointment
              <ArrowRight className="w-4 h-4 translate-y-px" />
            </button>
            <button className="px-10 py-5 bg-black/40 border border-white/10 text-white rounded-full font-bold text-sm tracking-wider uppercase hover:bg-white/10 transition-all flex items-center gap-3 glass-panel">
              Explore Treatments
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Play className="w-3 h-3 fill-white translate-x-px" />
              </div>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-panel p-6 rounded-3xl inline-flex items-center gap-12 border-white/5"
          >
            {[
              { label: 'Happy Patients', value: '15K+', icon: ToothIcon },
              { label: 'Expert Specialists', value: '25+', icon: Users },
              { label: 'Patient Rating', value: '4.9', icon: Star },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bottom Story Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-6"
          >
            <div className="relative group cursor-pointer w-[300px] h-[150px] glass-panel rounded-2xl overflow-hidden border-white/5 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dnliq4m8x/image/upload/v1781186644/PHOTO-2026-06-11-19-32-25_mfoezs.jpg" 
                alt="Clinic Interior" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <div className="text-[8px] uppercase font-bold tracking-widest text-white/60 mb-1">Watch Our Story</div>
                <div className="text-sm font-serif text-white leading-tight">Transforming Smiles,<br />Transforming Lives.</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side Category Rail */}
        <div className="hidden lg:flex col-span-6 justify-end items-center h-full relative">
          {/* Vertical Badge indicating slice/page */}
          <div className="absolute right-0 top-0 text-[10px] font-mono text-white/40 rotate-90 translate-x-4 -translate-y-4 tracking-[0.5em]">01 / 04</div>
          
          <div className="flex flex-col gap-4">
            {[
              { id: 'implants', label: 'Implants', icon: Droplets },
              { id: 'cosmetic', label: 'Cosmetic', icon: Sparkles },
              { id: 'ortho', label: 'Orthodontics', icon: Shield },
              { id: 'laser', label: 'Laser Care', icon: Activity },
              { id: 'smile', label: 'Smile Design', icon: Smile },
            ].map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
                className="group w-24 h-24 rounded-2xl glass-panel border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-gold/10 hover:border-gold/20 transition-all"
              >
                <cat.icon className="w-6 h-6 text-white/60 group-hover:text-gold transition-colors" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-white/30 group-hover:text-white transition-colors">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Info Pill */}
      <div className="absolute bottom-12 right-12 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="glass-panel px-8 py-4 rounded-full flex items-center gap-8 border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Phone className="w-3 h-3 text-gold" />
            </div>
            <span className="text-xs font-bold text-white/80">+94 77 123 4567</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-glow/10 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-cyan-glow" />
            </div>
            <span className="text-xs font-bold text-white/80">Colombo, Sri Lanka</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">Open Today</span>
            </div>
            <span className="text-xs font-bold text-white/80">9:00 AM – 8:00 PM</span>
          </div>
        </motion.div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-electric-blue/5 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    </section>
  );
}
