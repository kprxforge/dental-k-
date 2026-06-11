import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, Wand2, ArrowLeftRight, Share2, Download } from 'lucide-react';

export const SmileSimulator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [simulatedImage, setSimulatedImage] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const simulateSmile = async () => {
    if (!image) return;
    setIsSimulating(true);
    try {
      const response = await fetch('/api/ai/smile-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
      });
      const data = await response.json();
      if (data.result) {
        setSimulatedImage(data.result);
      }
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <section id="gallery" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
              <Wand2 className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">AI-Powered Experience</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              VISUALIZE YOUR <br />
              <span className="text-gold">PERFECT SMILE.</span>
            </h2>
            
            <p className="text-xl text-white/50 leading-relaxed max-w-lg">
              Our advanced AI Smile Simulator takes a photo of your face and instantly generates a professional preview of your future aesthetic.
            </p>

            <ul className="space-y-4">
              {['Instant AI Generation', 'Proprietary Aesthetic Algorithms', 'Before / After Comparison'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {!image ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="group relative px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-[0.2em] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  Upload Photo <Camera className="w-5 h-5" />
                </span>
                <input 
                  type="file" 
                  hidden 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </button>
            ) : (
              <div className="flex gap-4">
                 <button 
                  onClick={simulateSmile}
                  disabled={isSimulating}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-black font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isSimulating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                  {isSimulating ? 'Processing...' : 'Run Simulator'}
                </button>
                <button 
                  onClick={() => { setImage(null); setSimulatedImage(null); }}
                  className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest text-xs font-bold"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] bg-white/5 border border-white/10 overflow-hidden relative group">
              {image ? (
                <div className="absolute inset-0 flex">
                  <div className="relative w-full h-full">
                    <img 
                      src={simulatedImage || image} 
                      className="w-full h-full object-cover transition-all duration-1000" 
                      alt="Smile Preview"
                    />
                    
                    {simulatedImage && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Before</span>
                        <ArrowLeftRight className="w-4 h-4 text-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold text-white/100">AI After</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-white/20">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                    <Camera className="w-10 h-10" />
                  </div>
                  <p className="uppercase tracking-[0.3em] text-xs font-bold">Waiting for image...</p>
                </div>
              )}
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -top-12 -right-12 w-48 p-6 rounded-3xl glass-panel border-white/10 hidden md:block">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Engine Online</span>
               </div>
               <div className="space-y-2">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 200] }} 
                      transition={{ duration: 2, repeat: Infinity }} 
                      className="h-full w-1/3 bg-gold" 
                    />
                  </div>
                  <div className="h-1 w-2/3 bg-white/5 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
