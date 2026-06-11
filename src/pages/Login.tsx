import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Bluetooth as Tooth, Mail, Lock, LogIn, Chrome, ArrowRight, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gold/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all">
              <Tooth className="w-6 h-6 text-gold" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">LUXURY<span className="text-gold">DENTAL</span></h1>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Access your premium oral health records</p>
        </div>

        <div className="glass-panel p-8 rounded-[32px] border border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-gold outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-gold outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-xs">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gold text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <LogIn className="w-5 h-5" />}
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center"><span className="px-4 bg-[#0A0A0A] text-[10px] text-white/20 uppercase tracking-widest font-bold">Or continue with</span></div>
          </div>

          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white/5 text-white/60 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" />
            Google Account
          </button>
        </div>

        <p className="text-center mt-12 text-sm text-white/40">
          New to Luxury Dental? <Link to="/register" className="text-gold font-bold hover:underline">Create an Account</Link>
        </p>
      </motion.div>
    </div>
  );
};
