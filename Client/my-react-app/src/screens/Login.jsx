import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  BarChart3, 
  User, 
  Shield 
} from 'lucide-react';

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e, role) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(role);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex font-sans overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-brand-600 relative overflow-hidden flex-col justify-center p-20 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400 blur-[150px] rounded-full opacity-50 -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 blur-[150px] rounded-full opacity-50 -ml-20 -mb-20" />
          
          <div className="relative z-10 max-w-lg">
             <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                   <ShieldCheck className="text-brand-600 w-8 h-8" />
                </div>
                <span className="text-3xl font-display font-bold tracking-tight">ProctoAI</span>
             </div>
             <h1 className="text-6xl font-display font-bold leading-tight mb-8">Next-Gen Exam <br/>Security.</h1>
             <p className="text-xl text-brand-100 leading-relaxed mb-12">
                Powered by adaptive AI to ensure academic integrity with zero human dependency.
             </p>

             <div className="space-y-6">
                <FeatureItem icon={Shield} text="Advanced Eye-Gaze Tracking" />
                <FeatureItem icon={Shield} text="Ambient Noise Signature Analysis" />
                <FeatureItem icon={Shield} text="Instant Multi-Face Alerting" />
             </div>
          </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[420px] space-y-10"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">Welcome Back</h2>
            <p className="text-gray-500 dark:text-slate-400">Access your secure proctoring portal</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-2xl outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 transition-all text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Password</label>
                <button type="button" className="text-xs font-bold text-brand-600 hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-2xl outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 transition-all text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'student')}
                disabled={isLoading}
                className="py-4 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <User className="w-5 h-5" />
                Student
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'admin')}
                disabled={isLoading}
                className="py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Admin
                  </>
                )}
              </button>
            </div>
          </form>

 
          <footer className="pt-10 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 dark:border-slate-800">
             <ShieldCheck className="w-4 h-4" /> Secure Auth Protocol Active
          </footer> 
        </motion.div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-600 transition-all">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-lg font-medium opacity-90">{text}</span>
  </div>
);
