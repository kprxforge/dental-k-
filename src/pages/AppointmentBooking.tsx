import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Stethoscope, 
  Clock, 
  ArrowRight,
  Download,
  Share2,
  Bluetooth as Tooth,
  Sparkles
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const STEPS = [
  'Patient Info',
  'Treatment',
  'Specialist',
  'Date',
  'Time',
  'Confirm'
];

const TREATMENTS = [
  { id: '1', name: 'Dental Implant', category: 'Surgical', price: '$2,500+' },
  { id: '2', name: 'Root Canal', category: 'Endodontics', price: '$800+' },
  { id: '3', name: 'Teeth Whitening', category: 'Cosmetic', price: '$400+' },
  { id: '4', name: 'Orthodontics', category: 'Alignment', price: '$3,500+' },
  { id: '5', name: 'Smile Makeover', category: 'Aesthetic', price: '$5,000+' },
  { id: '6', name: 'Cosmetic Dentistry', category: 'Aesthetic', price: '$1,200+' },
];

const DOCTORS = [
  { id: '1', name: 'Dr. John', specialty: 'Implant Specialist', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Dr. Sarah', specialty: 'Orthodontist', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Dr. Michael', specialty: 'Endodontist', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200' },
];

export const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    treatment: null as any,
    doctor: null as any,
    date: '',
    timeSlot: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleBooking = () => {
    setIsSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFFFF']
    });
  };

  const currentStepProgress = (step / STEPS.length) * 100;

  if (isSuccess) {
    return <SuccessScreen data={formData} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold/30">
      {/* Professional Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Tooth className="w-6 h-6 text-gold" />
            <span className="text-lg font-bold tracking-tighter uppercase">Luxury<span className="text-gold">Dental</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Booking Portal</span>
            <div className="h-4 w-px bg-white/10" />
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Cancel</Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header & Progress */}
          <div className="mb-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Reserve Your <span className="text-gold">Artistry session</span></h1>
                <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold">Step {step}: {STEPS[step-1]}</p>
              </div>
              <div className="flex items-center gap-1">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step > i ? 'bg-gold w-8' : 'bg-white/10 w-4'}`} />
                ))}
              </div>
            </div>
            
            <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gold shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${currentStepProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <input 
                          type="text" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Ex: John Harrison"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-14 outline-none focus:border-gold/50 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Mobile Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <input 
                          type="tel" 
                          value={formData.mobile}
                          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-14 outline-none focus:border-gold/50 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-14 outline-none focus:border-gold/50 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Date of Birth</label>
                      <div className="relative group">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <input 
                          type="date" 
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-14 outline-none focus:border-gold/50 transition-all text-sm [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Gender Identification</label>
                    <div className="flex flex-wrap gap-4">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <button
                          key={g}
                          onClick={() => setFormData({...formData, gender: g})}
                          className={`px-8 py-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${formData.gender === g ? 'bg-gold text-black border-gold' : 'bg-black/20 border-white/5 text-white/40 hover:text-white'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TREATMENTS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setFormData({...formData, treatment: t})}
                        className={`p-6 rounded-3xl border transition-all text-left group relative overflow-hidden ${formData.treatment?.id === t.id ? 'bg-gold/10 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-black/20 border-white/5 hover:border-gold/30'}`}
                      >
                        <div className="relative z-10 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">{t.category}</p>
                            <h4 className="text-lg font-bold text-white mb-2">{t.name}</h4>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Estimated Cost: {t.price}</p>
                          </div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${formData.treatment?.id === t.id ? 'bg-gold text-black' : 'bg-white/5 text-white/20 group-hover:bg-gold/20 group-hover:text-gold'}`}>
                            {formData.treatment?.id === t.id ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1"
                >
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {DOCTORS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setFormData({...formData, doctor: d})}
                        className={`group relative rounded-[32px] border transition-all aspect-[4/5] overflow-hidden ${formData.doctor?.id === d.id ? 'border-gold shadow-[0_0_40px_rgba(212,175,55,0.2)] scale-[1.02]' : 'border-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100'}`}
                      >
                        <img src={d.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={d.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                          <p className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold mb-1">{d.specialty}</p>
                          <h4 className="text-xl font-bold text-white">{d.name}</h4>
                        </div>
                        {formData.doctor?.id === d.id && (
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="flex flex-col items-center">
                    <Calendar className="w-12 h-12 text-gold mb-6 opacity-40" />
                    <h3 className="text-2xl font-bold tracking-tighter mb-8 text-center">When would you like to visit?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                      {Array.from({ length: 8 }, (_, i) => addDays(new Date(), i + 1)).map((d) => (
                        <button
                          key={d.toISOString()}
                          onClick={() => setFormData({...formData, date: format(d, 'yyyy-MM-dd')})}
                          className={`p-6 rounded-3xl border transition-all text-center ${formData.date === format(d, 'yyyy-MM-dd') ? 'bg-gold text-black border-gold shadow-xl scale-105' : 'bg-black/20 border-white/5 text-white/40 hover:bg-white/5 hover:text-white'}`}
                        >
                          <span className="text-[10px] uppercase tracking-widest font-bold block mb-1">{format(d, 'EEE')}</span>
                          <span className="text-xl font-bold">{format(d, 'dd')}</span>
                          <span className="text-[10px] uppercase tracking-widest font-bold block mt-1">{format(d, 'MMM')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="flex flex-col items-center">
                    <Clock className="w-12 h-12 text-gold mb-6 opacity-40" />
                    <h3 className="text-2xl font-bold tracking-tighter mb-8 text-center">Available Sessions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                      {['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({...formData, timeSlot: slot})}
                          className={`py-6 rounded-3xl border transition-all text-sm font-bold tracking-widest ${formData.timeSlot === slot ? 'bg-gold text-black border-gold shadow-xl scale-105' : 'bg-black/20 border-white/5 text-white/40 hover:bg-white/5 hover:text-white'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div 
                  key="step6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-10 flex-1"
                >
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
                    <h3 className="text-3xl font-bold tracking-tighter mb-10">Confirm Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-2xl mx-auto border-t border-b border-white/10 py-10">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Patient</p>
                        <p className="text-lg font-bold">{formData.fullName}</p>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Treatment</p>
                        <p className="text-lg font-bold text-gold">{formData.treatment?.name}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Specialist</p>
                        <p className="text-lg font-bold uppercase">{formData.doctor?.name}</p>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Schedule</p>
                        <p className="text-lg font-bold uppercase tracking-tighter">
                          {formData.date ? format(new Date(formData.date), 'dd MMM yyyy') : ''} @ {formData.timeSlot}
                        </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-2xl transition-all ${step === 1 ? 'opacity-0' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <button 
                onClick={step === STEPS.length ? handleBooking : nextStep}
                disabled={
                  (step === 1 && (!formData.fullName || !formData.mobile || !formData.email)) ||
                  (step === 2 && !formData.treatment) ||
                  (step === 3 && !formData.doctor) ||
                  (step === 4 && !formData.date) ||
                  (step === 5 && !formData.timeSlot)
                }
                className="flex items-center gap-3 bg-gold text-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
              >
                {step === STEPS.length ? 'Confirm Appointment' : 'Continue'}
                <ArrowRight className="w-4 h-4 text-black/40" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Screen Component
const SuccessScreen = ({ data }: { data: any }) => {
  const appointmentId = `LD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gold/10 blur-[120px] rounded-full" />

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[48px] p-12 text-center shadow-2xl relative z-10"
        >
            <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-black mx-auto mb-10 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <Check className="w-12 h-12" />
            </div>
            
            <h2 className="text-4xl font-bold tracking-tighter text-white mb-4">Secured.</h2>
            <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold mb-12">Your invitation is being processed</p>

            <div className="grid grid-cols-2 gap-8 border-t border-b border-white/10 py-12 mb-12 text-left">
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">Appointment ID</p>
                    <p className="text-xl font-bold text-gold">{appointmentId}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">Specialist</p>
                    <p className="text-xl font-bold text-white uppercase">{data.doctor?.name}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">Date</p>
                    <p className="text-xl font-bold text-white uppercase">{data.date ? format(new Date(data.date), 'dd MMM yyyy') : ''}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">Time</p>
                    <p className="text-xl font-bold text-white">{data.timeSlot}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5">
                    <Download className="w-4 h-4 text-gold" /> Slip
                </button>
                <button className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5">
                    <Share2 className="w-4 h-4 text-gold" /> WhatsApp
                </button>
                <Link 
                    to="/" 
                    className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-gold text-black font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                >
                    Dismiss
                 </Link>
            </div>
        </motion.div>
    </div>
  );
};
