import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Upload, 
  RotateCcw, 
  Save, 
  X, 
  Image as ImageIcon,
  Monitor,
  Check,
  Sliders as SlidersIcon,
  Eye
} from 'lucide-react';
import { WallpaperConfig, DEFAULT_WALLPAPER_CONFIG } from '../types/wallpaper';
import { cn } from '../lib/utils';

interface WallpaperSettingsProps {
  config: WallpaperConfig;
  onChange: (config: WallpaperConfig) => void;
  hideFloatingButton?: boolean;
  inline?: boolean;
}

export function WallpaperSettings({ config, onChange, hideFloatingButton = false, inline = false }: WallpaperSettingsProps) {
  const [isOpen, setIsOpen] = useState(inline);
  const [isSaved, setIsSaved] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const galleryImages = [
    { name: 'Technology', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80' },
    { name: 'AI', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80' },
    { name: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80' },
    { name: 'Business', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' },
    { name: 'Space', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80' },
    { name: 'Luxury', url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80' }
  ];

  const updateConfig = (updates: Partial<WallpaperConfig>) => {
    onChange({ ...config, ...updates });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setPreviewUrl(url);
        updateConfig({ url, type: 'image' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('wallpaper_config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleReset = () => {
    onChange(DEFAULT_WALLPAPER_CONFIG);
    setPreviewUrl(null);
  };

  const Slider = ({ label, value, min, max, unit = '', onChange: onValChange }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">{label}</label>
        <span className="text-[10px] font-mono text-gold">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onValChange(Number(e.target.value))}
        className="w-full accent-gold h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
      />
    </div>
  );

  return (
    <>
      {/* Floating Settings Button */}
      {!hideFloatingButton && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-gold shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
          <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            {!inline && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              />
            )}

            {/* Panel */}
            <motion.div
              initial={inline ? { opacity: 0, y: 20 } : { x: '100%', opacity: 0 }}
              animate={inline ? { opacity: 1, y: 0 } : { x: 0, opacity: 1 }}
              exit={inline ? { opacity: 0, y: 20 } : { x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "bg-[#0A0A0A] border border-white/10 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[32px]",
                inline ? "relative w-full h-[800px]" : "fixed top-0 right-0 h-full w-[400px] z-[120]"
              )}
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <h3 className="text-xl font-bold tracking-tighter text-white">Wallpaper <span className="text-gold">Settings</span></h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-1">Aesthetic Customization</p>
                </div>
                {!inline && (
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                
                {/* Visual Preview */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold flex items-center gap-2">
                    <Monitor className="w-3 h-3" /> Live Preview
                  </h4>
                  <div className="aspect-video rounded-2xl border border-white/10 overflow-hidden relative bg-[#050505]">
                    <img 
                      src={config.url} 
                      className="w-full h-full object-cover" 
                      style={{ 
                        filter: `brightness(${config.brightness}%) blur(${config.blur / 5}px)`,
                        opacity: config.opacity / 100
                      }}
                      alt="Preview"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Active Selection</span>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold flex items-center gap-2">
                    <Upload className="w-3 h-3" /> Custom Source
                  </h4>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/5 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-gold/30 hover:bg-white/[0.02] transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                       <p className="text-sm font-bold text-white">Upload Brand Media</p>
                       <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">JPG, PNG, WEBP Supported</p>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {/* Gallery */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold flex items-center gap-2">
                    <Check className="w-3 h-3" /> Preset Library
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {galleryImages.map((img) => (
                      <button
                        key={img.name}
                        onClick={() => updateConfig({ url: img.url, type: 'image' })}
                        className={cn(
                          "group relative h-24 rounded-xl overflow-hidden border transition-all",
                          config.url === img.url ? "border-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]" : "border-white/5"
                        )}
                      >
                        <img src={img.url} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-bold text-white uppercase tracking-widest">{img.name}</span>
                        </div>
                        {config.url === img.url && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold text-black flex items-center justify-center">
                             <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Controls */}
                <div className="space-y-6">
                   <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold flex items-center gap-2">
                    <SlidersIcon className="w-3 h-3" /> Background Controls
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Sizing Mode</label>
                      <div className="flex gap-2 flex-wrap">
                        {['cover', 'contain', 'fill'].map((fit) => (
                          <button
                            key={fit}
                            onClick={() => updateConfig({ objectFit: fit as any })}
                            className={cn(
                              "px-4 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all",
                              config.objectFit === fit ? "bg-gold text-black border-gold" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                            )}
                          >
                            {fit}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Positioning</label>
                      <div className="flex gap-2 flex-wrap">
                        {['center', 'top', 'bottom', 'left', 'right'].map((pos) => (
                          <button
                            key={pos}
                            onClick={() => updateConfig({ position: pos as any })}
                            className={cn(
                              "px-3 py-2 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all",
                              config.position === pos ? "bg-gold text-black border-gold" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                            )}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Behavior</label>
                      <div className="flex gap-2">
                        {['fixed', 'scroll'].map((att) => (
                          <button
                            key={att}
                            onClick={() => updateConfig({ attachment: att as any })}
                            className={cn(
                              "flex-1 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all",
                              config.attachment === att ? "bg-gold text-black border-gold" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                            )}
                          >
                            {att}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-6">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold flex items-center gap-2">
                    <Eye className="w-3 h-3" /> Optical Correction
                  </h4>
                  <div className="space-y-8">
                    <Slider label="Opacity" value={config.opacity} min={0} max={100} unit="%" onChange={(v: number) => updateConfig({ opacity: v })} />
                    <Slider label="Blur Level" value={config.blur} min={0} max={20} unit="px" onChange={(v: number) => updateConfig({ blur: v })} />
                    <Slider label="Brightness" value={config.brightness} min={0} max={150} unit="%" onChange={(v: number) => updateConfig({ brightness: v })} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/5 bg-white/[0.02] grid grid-cols-2 gap-4">
                <button 
                  onClick={handleReset}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 text-white/60 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-white/5"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaved}
                  className={cn(
                    "flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]",
                    isSaved ? "bg-green-500 text-white" : "bg-gold text-black hover:scale-105 active:scale-95"
                  )}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
