export type UserRole = 'patient' | 'doctor' | 'admin';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  photoURL?: string;
  createdAt: any;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  treatmentId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  room?: string;
  createdAt: any;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  schedule: Record<string, string[]>;
  active: boolean;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  duration: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  doctorId: string;
  type: 'xray' | 'scan' | 'prescription' | 'lab';
  fileName: string;
  url: string;
  date: any;
}

export interface Invoice {
  id: string;
  patientId: string;
  appointmentId: string;
  amount: number;
  status: 'unpaid' | 'paid';
  method?: string;
  items: Array<{ name: string; price: number }>;
  date: any;
}

export interface WebsiteConfig {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  wallpaper: {
    url: string;
    brightness: number;
    blur: number;
    opacity: number;
  };
}
