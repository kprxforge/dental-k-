import { collection, doc, setDoc, query, getDocs } from 'firebase/firestore';
import { db } from './config';

export const seedData = async () => {
  const treatments = [
    { name: 'Porcelain Veneers', category: 'Cosmetic', price: 1200, duration: '2h', description: 'Hand-crafted ceramic masterpieces.' },
    { name: 'Dental Implant', category: 'Surgical', price: 2500, duration: '3h', description: 'Advanced titanium restoration.' },
    { name: 'Laser Whitening', category: 'Aesthetic', price: 499, duration: '1h', description: 'Instant brilliance in one session.' },
    { name: 'Clear Alignment', category: 'Orthodontic', price: 3500, duration: '1h', description: 'Invisible path to perfection.' }
  ];

  const doctors = [
    { name: 'Dr. Julianne Sterling', specialty: 'Cosmetic Specialist', bio: 'Expert in smile design with 15 years experience.', active: true },
    { name: 'Dr. Sebastian Vance', specialty: 'Implant Surgeon', bio: 'Renowned surgical lead with international accreditation.', active: true }
  ];

  // Seed Treatments
  for (const t of treatments) {
    const q = query(collection(db, 'treatments'));
    const snap = await getDocs(q);
    if (snap.empty) {
      await setDoc(doc(collection(db, 'treatments')), t);
    }
  }

  // Seed Doctors
  for (const d of doctors) {
    const q = query(collection(db, 'doctors'));
    const snap = await getDocs(q);
    if (snap.empty) {
      await setDoc(doc(collection(db, 'doctors')), { ...d, userId: 'dummy-id-' + Math.random() });
    }
  }
};
