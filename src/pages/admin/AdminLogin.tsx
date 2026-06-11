import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bluetooth as Tooth, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In a real app, username might be an identifier or email
      const email = username.includes('@') ? username : `${username}@admin.com`;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 mb-6">
            <Tooth className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">ADMIN<span className="text-gold">PORTAL</span></h2>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium">Management Authentication</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-black/40 border border-white/5 focus:border-gold/50 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full bg-black/40 border border-white/5 focus:border-gold/50 rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/10 outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between ml-1 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className={`w-5 h-5 rounded-lg border transition-all ${rememberMe ? 'bg-gold border-gold' : 'bg-black/40 border-white/10'}`} />
                  {rememberMe && <Lock className="absolute inset-0 m-auto w-3 h-3 text-black" />}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold group-hover:text-white/60 transition-colors">Remember Me</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gold text-black font-bold text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
