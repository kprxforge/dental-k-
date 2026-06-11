import { motion } from 'motion/react';
import { 
  Stethoscope, 
  ShieldCheck, 
  Bone, 
  Sparkles, 
  Activity, 
  Smile, 
  Heart 
} from 'lucide-react';
import { cn } from '../lib/utils';

const services = [
  {
    title: "Cosmetic Dentistry",
    description: "Reinvent your smile with high-end aesthetic enhancements.",
    icon: Sparkles,
    color: "from-cyan-400/20 to-blue-500/20"
  },
  {
    title: "Dental Implants",
    description: "Realistic, durable solutions for missing teeth using titanium tech.",
    icon: Bone,
    color: "from-purple-400/20 to-pink-500/20"
  },
  {
    title: "Orthodontics",
    description: "Precision alignment with invisible aligners and smart tracking.",
    icon: Activity,
    color: "from-blue-400/20 to-cyan-500/20"
  },
  {
    title: "Root Canal Treatment",
    description: "High-precision microscopic root canal therapy for total relief.",
    icon: ShieldCheck,
    color: "from-green-400/20 to-emerald-500/20"
  },
  {
    title: "Teeth Whitening",
    description: "Advanced laser whitening for immediate, stunning results.",
    icon: Smile,
    color: "from-yellow-400/20 to-orange-500/20"
  },
  {
    title: "Smile Makeover",
    description: "Complete digital smile design tailored to your facial profile.",
    icon: Heart,
    color: "from-red-400/20 to-rose-500/20"
  }
];

export function Services() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Elite Dental Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-silver/60 max-w-2xl mx-auto"
          >
            We combine high-end medical expertise with the latest technological breakthroughs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-3xl",
                service.color
              )} />
              
              <div className="relative glass-panel rounded-3xl p-8 h-full flex flex-col items-start transition-all border-white/5 group-hover:border-white/20">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-electric-blue/20 group-hover:border-electric-blue/30 transition-all">
                  <service.icon className="w-7 h-7 text-white group-hover:text-cyan-glow transition-colors" />
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-silver/70 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-6">
                  <button className="text-sm font-medium text-electric-blue flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                    Learn More
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_8px_#0088ff]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
