export interface WallpaperConfig {
  url: string;
  type: 'image' | 'video';
  brightness: number;
  opacity: number;
  blur: number;
  objectFit: 'cover' | 'contain' | 'fill';
  attachment: 'fixed' | 'scroll';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  repeat: 'no-repeat' | 'repeat';
}

export const DEFAULT_WALLPAPER_CONFIG: WallpaperConfig = {
  url: 'https://res.cloudinary.com/dnliq4m8x/image/upload/v1781186644/PHOTO-2026-06-11-19-32-25_mfoezs.jpg',
  type: 'image',
  brightness: 80,
  opacity: 100,
  blur: 0,
  objectFit: 'cover',
  attachment: 'fixed',
  position: 'center',
  repeat: 'no-repeat'
};
