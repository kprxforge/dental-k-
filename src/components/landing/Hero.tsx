import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent">
      {/* Background Overlay to ensure readability while showing global wallpaper */}
      <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none" />


      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gold/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gold/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-12 items-center">
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Award Winning Oral Artistry</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 overflow-hidden">
              <div className="overflow-hidden mb-2">
                {"REDEFINING".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 100, filter: 'blur(10px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: i * 0.03 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden mb-2">
                {"DENTAL".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 100, filter: 'blur(10px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.4 + i * 0.03 }}
                    className="inline-block text-outline text-transparent"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden">
                {"EXCELLENCE.".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 100, filter: 'blur(10px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.8 + i * 0.03 }}
                    className="inline-block text-luxury"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-lg text-white/50 max-w-xl leading-relaxed"
            >
              Experience the pinnacle of dentistry where cutting-edge technology meets artistic precision. We craft bespoke smiles for the most discerning individuals.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 1.8
                }
              }
            }}
            className="flex flex-wrap gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <Link 
                to="/appointments"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-black font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <a 
                href="https://wa.me/1234567890"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5 text-gold" />
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 2.2
                }
              }
            }}
            className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5 max-w-lg"
          >
            {[
              { val: "15k+", label: "Happy Patients" },
              { val: "25+", label: "Expert Doctors" },
              { val: "99%", label: "Success Rate" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <p className="text-2xl font-bold text-white">{stat.val}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
