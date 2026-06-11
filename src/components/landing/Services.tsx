import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  Gem, 
  Activity, 
  Microwave, 
  CircleDot,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: <Gem className="w-8 h-8" />,
    title: "Dental Implants",
    description: "Restoring your smile with permanent, natural-looking porcelain implants crafted with titanium precision.",
    price: "From $2,499",
    delay: 0.1
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Smile Makeover",
    description: "A comprehensive aesthetic transformation combining veneers, whitening, and artistic contouring.",
    price: "Custom Pricing",
    delay: 0.2
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Root Canal",
    description: "Painless, high-precision endodontic treatment using the latest laser-guided microscopic technology.",
    price: "From $899",
    delay: 0.3
  },
  {
    icon: <Microwave className="w-8 h-8" />,
    title: "Teeth Whitening",
    description: "Professional laser whitening for a brilliant, long-lasting transformation up to 8 shades lighter.",
    price: "From $499",
    delay: 0.4
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Orthodontics",
    description: "Discreet alignment solutions including Invisalign and premium ceramic bespoke braces.",
    price: "From $3,999",
    delay: 0.5
  },
  {
    icon: <CircleDot className="w-8 h-8" />,
    title: "Cosmetic Surgery",
    description: "Advanced gum contouring and facial aesthetics to frame your perfect ceramic restorations.",
    price: "From $1,299",
    delay: 0.6
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-32 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            WORLD-CLASS <span className="text-gold">TREATMENTS</span>
          </motion.h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto uppercase tracking-widest text-xs font-medium">
            We offer an exclusive suite of dental services using the world's most advanced oral technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: service.delay }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/40 leading-relaxed mb-8">{service.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-gold font-bold">{service.price}</span>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 group-hover:text-gold transition-colors">
                  Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
