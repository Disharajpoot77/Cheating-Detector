import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Flag, 
  MapPin, 
  User, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockLogs = [
  { id: '1', timestamp: '14:22:10', type: 'face_missing', severity: 'medium', message: 'Candidate face not detected for 5 seconds' },
  { id: '2', timestamp: '14:25:44', type: 'multiple_faces', severity: 'high', message: 'Detected secondary person in background' },
  { id: '3', timestamp: '14:30:12', type: 'looking_away', severity: 'low', message: 'Candidate looking away from screen frequently' },
  { id: '4', timestamp: '14:45:05', type: 'noise', severity: 'medium', message: 'Sustained audio levels exceeding threshold' },
  { id: '5', timestamp: '15:10:22', type: 'mobile_detected', severity: 'high', message: 'Object matching mobile device signature found' },
];

export const SessionReport = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-display font-bold">Session Analytics</h1>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> April 26, 2024</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1.5"><User className="w-4 h-4" /> Exam ID: #MATH-402</span>
                </div>
            </div>

            {/* Student Header */}
            <div className="glass p-8 rounded-[40px] flex flex-wrap items-center justify-between gap-8 border-b-4 border-b-brand-600 shadow-2xl shadow-brand-500/5">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-brand-600 to-brand-400 p-1">
                        <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full rounded-[28px] object-cover border-4 border-white dark:border-slate-900" alt=""/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Johnathan Alexander</h2>
                        <p className="text-gray-500 dark:text-slate-400 font-mono text-sm tracking-tight">Reg ID: 2024-CS-8812 • Verified via BioMatch™</p>
                        <div className="flex gap-2 mt-3">
                            <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-950/30 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-200/50">Verified Identity</span>
                            <span className="px-3 py-1 bg-brand-100 text-brand-600 dark:bg-brand-950/30 rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-200/50">89% Integrity Score</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-12 text-center">
                    <div>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                         <p className="text-2xl font-bold font-mono">01:42:05</p>
                    </div>
                    <div>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Warnings</p>
                         <p className="text-2xl font-bold font-mono text-orange-500">14</p>
                    </div>
                    <div>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Final Result</p>
                         <p className="text-2xl font-bold font-mono text-red-500">FLAGGED</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline Logs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                         <h3 className="text-xl font-bold flex items-center gap-2"><History className="w-5 h-5 text-brand-600" /> Event Timeline</h3>
                         <button className="text-sm font-bold text-brand-600 flex items-center gap-1">Expand All <ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-4">
                        {mockLogs.map((log, idx) => (
                            <LogCard key={log.id} log={log} isLast={idx === mockLogs.length - 1} />
                        ))}
                    </div>
                </div>

                {/* Behavioral Insights */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Zap className="w-5 h-5 text-brand-600" /> AI Insights</h3>
                    <div className="space-y-4">
                         <InsightCard 
                            title="Face Presence" 
                            score="92%" 
                            desc="Candidate face was present for the majority of the session with intermittent dips."
                         />
                         <InsightCard 
                            title="Gaze Consistency" 
                            score="64%" 
                            desc="Candidate frequently looked at the bottom-right corner, indicating possible material usage."
                            type="warning"
                         />
                         <InsightCard 
                            title="Audio Environment" 
                            score="78%" 
                            desc="Average noise levels were within range, but two high-decibel spikes were recorded."
                         />
                    </div>

                    <div className="glass p-6 rounded-[32px] bg-brand-600 text-white shadow-xl shadow-brand-600/30">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-6 h-6" />
                            <h4 className="font-bold">Final Proctor Decision</h4>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed mb-6">
                           "Based on AI-detected patterns and severity index, this session is marked for manual review due to significant gaze deviations and mobile signature detection."
                        </p>
                        <button className="w-full py-3 bg-white text-brand-600 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-brand-50 transition-all">
                            Approve/Audit Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LogCard = ({ log, isLast }) => (
    <div className="relative group">
        {!isLast && <div className="absolute left-6 top-10 bottom-[-24px] w-0.5 bg-gray-100 dark:bg-slate-800" />}
        <div className="flex gap-4">
            <div className={cn(
                "w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center relative z-10 border-4 border-white dark:border-slate-950",
                log.severity === 'high' ? "bg-red-500 text-white" : log.severity === 'medium' ? "bg-orange-500 text-white" : "bg-blue-500 text-white"
            )}>
                <Flag className="w-5 h-5" />
            </div>
            <div className="flex-1 glass p-5 rounded-[24px] group-hover:border-brand-500/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm md:text-base capitalize tracking-tight">{log.type.replace('_', ' ')}</h4>
                    <span className="text-[10px] md:text-xs font-mono font-bold text-gray-400">{log.timestamp}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 mb-3">{log.message}</p>
                <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-gray-400">#TAG-PROCTO</span>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-gray-400">#AI-DETECT</span>
                </div>
            </div>
        </div>
    </div>
);

const InsightCard = ({ title, score, desc, type = 'normal' }) => (
    <div className="glass p-5 rounded-[24px] border border-gray-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-3">
             <h4 className="text-sm font-bold">{title}</h4>
             <span className={cn(
                 "text-sm font-mono font-bold",
                 type === 'warning' ? "text-orange-500" : "text-brand-600"
             )}>{score}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: score }}
                transition={{ duration: 1, delay: 0.5 }}
                className={cn(
                    "h-full rounded-full",
                    type === 'warning' ? "bg-orange-500" : "bg-brand-600"
                )}
            />
        </div>
        <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div> 
);
 