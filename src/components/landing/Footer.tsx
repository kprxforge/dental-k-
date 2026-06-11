import React from 'react';
import { Bluetooth as Tooth, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="pt-32 pb-12 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all">
                <Tooth className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tighter text-white">LUXURY<span className="text-gold">DENTAL</span></h1>
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/40">Exclusive Oral Artistry</p>
              </div>
            </Link>
            <p className="text-white/40 leading-relaxed text-sm">
              Crafting bespoke smiles for the world's most discerning individuals. Our clinic combines medical excellence with aesthetic mastery.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Treatments', 'Doctors', 'Smile Gallery', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-white/40 hover:text-gold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <p className="text-sm text-white/40">77 Beverly Hills Luxury Plaza,<br />Los Angeles, CA 90210</p>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <p className="text-sm text-white/40">+1 (555) LUX-GOLD</p>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <p className="text-sm text-white/40">concierge@luxurydental.com</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Newsletter</h4>
            <p className="text-sm text-white/40 mb-6">Receive exclusive dental health tips and aesthetic inspiration.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-xs outline-none focus:border-gold transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-white/20">
            &copy; 2026 LUXURY DENTAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
