import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon,
  Maximize2,
  Camera,
  Activity,
  AlertTriangle
} from 'lucide-react';  
import { cn } from '../lib/utils';
 
const mockStudents = [
  { id: '1', name: 'Disha Rajpoot', status: 'normal', alert: null, img: 'https://i.pravatar.cc/150?u=alina' },
  { id: '2', name: 'Muskan', status: 'suspicious', alert: 'Looking Away', img: 'https://i.pravatar.cc/150?u=rob' },
  { id: '3', name: 'Sakshi', status: 'normal', alert: null, img: 'https://i.pravatar.cc/150?u=jane' },
  { id: '4', name: 'Anjali', status: 'cheating', alert: 'Multiple Persons', img: 'https://i.pravatar.cc/150?u=cody' },
  { id: '5', name: 'Gajal', status: 'normal', alert: null, img: 'https://i.pravatar.cc/150?u=esther' },
  { id: '6', name: 'Priyanshi', status: 'normal', alert: null, img: 'https://i.pravatar.cc/150?u=wade' },
  { id: '7', name: 'Ashu', status: 'suspicious', alert: 'Noise Detected', img: 'https://i.pravatar.cc/150?u=bessie' },
  { id: '8', name: 'Priyanshu', status: 'normal', alert: null, img: 'https://i.pravatar.cc/150?u=cameron' },
];

export const AdminMonitoring = () => {
    const [view, setView] = useState('grid');

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
             <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">Live Monitoring</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-full border border-red-100 dark:border-red-900/30">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider">Live • 42 Sessions</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Find student..."
                            className="pl-10 pr-4 py-2 glass rounded-xl border-none text-sm w-48 focus:w-64 transition-all"
                        />
                    </div>
                    <button className="p-2 glass rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                    <div className="flex glass p-1 rounded-xl">
                        <button 
                            onClick={() => setView('grid')}
                            className={cn("p-1.5 rounded-lg transition-all", view === 'grid' ? "bg-white dark:bg-slate-800 shadow-sm text-brand-600" : "text-gray-400")}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setView('list')}
                            className={cn("p-1.5 rounded-lg transition-all", view === 'list' ? "bg-white dark:bg-slate-800 shadow-sm text-brand-600" : "text-gray-400")}
                        >
                            <ListIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
             </div>

             <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                <div className="flex-1 overflow-y-auto pr-2 pb-10">
                    <div className={cn(
                        "grid gap-4",
                        view === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                    )}>
                        {mockStudents.map((student) => (
                            <StudentCard key={student.id} student={student} />
                        ))}
                    </div>
                </div>

                <div className="w-80 hidden xl:flex flex-col gap-4 sticky top-0 h-full">
                    <div className="glass flex-1 rounded-[32px] overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                Real-time Alerts
                            </h3>
                            <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">3 NEW</span>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            <AlertItem student="Cody Fisher" type="Critical: Multiple People" time="Just now" severity="high" img="https://i.pravatar.cc/40?u=cody" />
                            <AlertItem student="Bessie Cooper" type="Noise Detected" time="4 mins ago" severity="medium" img="https://i.pravatar.cc/40?u=bessie" />
                            <AlertItem student="Robert Fox" type="Eye Gaze Anomaly" time="12 mins ago" severity="low" img="https://i.pravatar.cc/40?u=rob" />
                        </div>
                         <button className="m-4 p-4 rounded-2xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-all uppercase tracking-widest">
                            Review All Flags
                        </button>
                    </div>
                </div>
             </div>
        </div>
    );
};

const StudentCard = ({ student }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className={cn(
            "glass rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 flex flex-col",
            student.status === 'cheating' ? "ring-2 ring-red-500" : student.status === 'suspicious' ? "ring-2 ring-orange-400" : ""
        )}
    >
        <div className="relative aspect-video bg-slate-900 overflow-hidden">
             <div className="absolute inset-0 opacity-40 grayscale flex items-center justify-center">
                <Camera className="w-10 h-10 text-slate-500" />
             </div>
             <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                 <div className={cn(
                     "px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border",
                     student.status === 'cheating' ? "bg-red-500/80 text-white border-red-400" :
                     student.status === 'suspicious' ? "bg-orange-500/80 text-white border-orange-400" :
                     "bg-black/40 text-white border-white/20 text-xs py-1"
                 )}>
                     {student.status.toUpperCase()}
                 </div>
                 {student.alert && (
                     <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-lg text-[9px] font-bold text-white border border-white/20 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-orange-400" />
                        {student.alert}
                     </div>
                 )}
             </div>
        </div>
        <div className="p-3.5 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2.5">
                <img src={student.img} className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-500/20" alt=""/>
                <div className="min-w-0">
                     <p className="text-xs font-bold truncate max-w-[90px]">{student.name}</p>
                     <p className="text-[9px] font-bold text-gray-400 uppercase">SEC-A</p>
                </div>
            </div>
            <Activity className="w-4 h-4 text-brand-600" />
        </div>
    </motion.div>
);

const AlertItem = ({ student, type, time, severity, img }) => (
    <div className="flex items-start gap-3 p-2 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
        <img src={img} className="w-8 h-8 rounded-lg shrink-0" alt=""/>
        <div className="min-w-0">
            <div className="flex justify-between items-center">
                <p className="text-xs font-bold truncate">{student}</p>
                <span className="text-[9px] text-gray-400">{time}</span>
            </div>
            <p className="text-[9px] font-bold text-red-500 uppercase mt-0.5">{type}</p>
        </div>
    </div>
);
