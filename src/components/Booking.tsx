import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric-blue/30 bg-electric-blue/5 backdrop-blur-md mb-6"
          >
            <Calendar className="w-4 h-4 text-electric-blue" />
            <span className="text-xs font-bold tracking-widest uppercase text-electric-blue">Priority Access</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Secure Your Consultation</h2>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-white/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                  <div className="group relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/40 group-focus-within:text-cyan-glow transition-colors" />
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-glow/50 focus:bg-white/10 transition-all text-white placeholder:text-silver/30"
                    />
                  </div>
                  <div className="group relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/40 group-focus-within:text-cyan-glow transition-colors" />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-glow/50 focus:bg-white/10 transition-all text-white placeholder:text-silver/30"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/40 group-focus-within:text-cyan-glow transition-colors" />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-glow/50 focus:bg-white/10 transition-all text-white placeholder:text-silver/30"
                    />
                  </div>
                  <div className="group relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/40 group-focus-within:text-cyan-glow transition-colors" />
                    <input
                      required
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-cyan-glow/50 focus:bg-white/10 transition-all text-white [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <textarea
                    placeholder="Preferred Treatment or Concerns"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-cyan-glow/50 focus:bg-white/10 transition-all text-white placeholder:text-silver/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-electric-blue to-cyan-glow text-navy font-bold rounded-2xl flex items-center justify-center gap-3 group translate-y-0 hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(0,136,255,0.3)] hover:shadow-[0_0_30px_rgba(0,136,255,0.5)]"
                  >
                    CONFIRM APPOINTMENT REQUEST
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-cyan-glow/10 flex items-center justify-center mb-8 border border-cyan-glow/30">
                  <CheckCircle2 className="w-12 h-12 text-cyan-glow" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Transmission Received</h3>
                <p className="text-silver/60 max-w-sm mb-10">
                  Your request has been prioritized. Our AI coordinator will sync with your schedule shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/10 transition-all"
                >
                  SCHEDULE ANOTHER
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Decorative Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-glow/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-electric-blue/10 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="text-3xl font-display font-bold mb-8">
              NOVA<span className="text-cyan-glow">DENT</span>
            </div>
            <p className="text-silver/50 leading-relaxed mb-8">
              Pioneering the future of dental medicine through computational excellence and human-centric design.
            </p>
            <div className="flex gap-4">
              {['Insta', 'X-Holo', 'Meta'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-electric-blue/20 hover:border-electric-blue/30 transition-all cursor-pointer">
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-silver/60">
              {['Services', 'Technology', 'Doctors', 'Pricing', 'Legal'].map(link => (
                <li key={link}><a href="#" className="hover:text-cyan-glow transition-colors cursor-pointer">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Headquarters</h4>
            <ul className="space-y-4 text-silver/60">
              <li>Neo-Tokyo District 9</li>
              <li>Nexus Blvd, Suite 404</li>
              <li>+1 (555) NOVA-DENT</li>
              <li>hq@novadent.io</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Newsletter</h4>
            <p className="text-silver/50 text-sm mb-6">Receive curated insights on the latest biomedical breakthroughs.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="email@nexus.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-glow/50 transition-all text-sm"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-electric-blue rounded-lg cursor-pointer">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <div className="text-silver/30 text-xs">
            © 2026 NOVADENT BIOMEDICAL INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-silver/30 text-xs">
            <a href="#" className="hover:text-silver/60 transition-colors">PRIVACY_PROTOCOL</a>
            <a href="#" className="hover:text-silver/60 transition-colors">SECURITY_AUDIT</a>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-glow/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
    </footer>
  );
}
