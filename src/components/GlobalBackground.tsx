import React from 'react';
import { motion } from 'motion/react';
import { WallpaperConfig } from '../types/wallpaper';

interface GlobalBackgroundProps {
  config: WallpaperConfig;
}

export function GlobalBackground({ config }: GlobalBackgroundProps) {
  const bgStyles: React.CSSProperties = {
    filter: `brightness(${config.brightness}%) blur(${config.blur}px)`,
    opacity: config.opacity / 100,
    objectFit: config.objectFit,
    backgroundAttachment: config.attachment,
    backgroundPosition: config.position,
    backgroundRepeat: config.repeat,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        {config.type === 'video' ? (
          <video 
            src={config.url} 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={bgStyles}
            className="w-full h-full"
          />
        ) : (
          <img 
            src={config.url} 
            alt="Website Background" 
            style={bgStyles}
            className="w-full h-full"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      {/* Optional dark overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}
