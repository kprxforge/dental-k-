import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Bluetooth as Tooth, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Treatments', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Smile Gallery', href: '#gallery' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all">
            <Tooth className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white">LUXURY<span className="text-gold">DENTAL</span></h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/40">Exclusive Oral Artistry</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-medium text-white/50 hover:text-gold uppercase tracking-widest transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <Link 
              to="/admin"
              className="px-6 py-2 rounded-full border border-gold/30 hover:bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              to="/admin/login"
              className="px-6 py-2 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Admin Login
            </Link>
          )}

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Tooth className="w-8 h-8 text-gold" />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10">
              <Link 
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="text-xl font-bold uppercase tracking-tighter">Admin Portal</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Authorized Access Only</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ChevronRight className="w-6 h-6 text-black" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
