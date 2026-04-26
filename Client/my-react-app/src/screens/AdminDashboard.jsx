import React from 'react';
import { 
  Users, 
  Monitor, 
  ShieldAlert, 
  TrendingUp, 
  ArrowUpRight,
  UserCheck,
  UserX,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const data = [
  { name: '08:00', value: 400 },
  { name: '10:00', value: 3000 },
  { name: '12:00', value: 2000 },
  { name: '14:00', value: 2780 },
  { name: '16:00', value: 1890 },
  { name: '18:00', value: 2390 },
  { name: '20:00', value: 3490 },
];

const alertData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 32 },
  { name: 'Thu', count: 21 },
  { name: 'Fri', count: 45 },
  { name: 'Sat', count: 28 },
  { name: 'Sun', count: 15 },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Admin Overview</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Real-time system health and student activity analytics.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all">Download Report</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="1,284" 
          change="+12.5%" 
          isPositive={true} 
          icon={Users}
          color="blue"
        />
        <StatCard 
          title="Active Exams" 
          value="24" 
          change="+4" 
          isPositive={true} 
          icon={Monitor}
          color="green"
        />
        <StatCard 
          title="Suspicious Flags" 
          value="156" 
          change="-23%" 
          isPositive={true} 
          icon={AlertTriangle}
          color="orange"
        />
        <StatCard 
          title="Cheating Alerts" 
          value="12" 
          change="+3" 
          isPositive={false} 
          icon={ShieldAlert}
          color="red"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Trends */}
        <div className="glass p-6 rounded-[32px] border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Activity Trends</h3>
            <select className="bg-transparent border-none text-sm text-gray-500 font-semibold outline-none cursor-pointer">
              <input type="button" value="Last 24 Hours" />
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    backgroundColor: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Breakdown */}
        <div className="glass p-6 rounded-[32px] border border-gray-100 dark:border-slate-800">
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Weekly Alert Breakdown</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
               <span className="w-3 h-3 rounded-full bg-brand-500" /> High Severity Only
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9', radius: 8}}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                  }} 
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold">Recent Alerts</h3>
          <button className="text-sm font-bold text-brand-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Alert Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              <RecentAlertRow 
                name="John Doe" 
                img="https://i.pravatar.cc/32?img=1" 
                type="Multiple Faces Detected" 
                time="2 mins ago" 
                severity="high" 
              />
              <RecentAlertRow 
                name="Sarah Smith" 
                img="https://i.pravatar.cc/32?img=5" 
                type="Looking Away Frequently" 
                time="15 mins ago" 
                severity="medium" 
              />
              <RecentAlertRow 
                name="Michael Chen" 
                img="https://i.pravatar.cc/32?img=8" 
                type="Noise Anomaly Detected" 
                time="34 mins ago" 
                severity="low" 
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass p-6 rounded-[32px] border border-gray-100 dark:border-slate-800"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-3 rounded-2xl",
        color === 'blue' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20" :
        color === 'green' ? "bg-green-100 text-green-600 dark:bg-green-900/20" :
        color === 'orange' ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20" :
        "bg-red-100 text-red-600 dark:bg-red-900/20"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
        isPositive ? "text-green-600 bg-green-50 dark:bg-green-900/20" : "text-red-600 bg-red-50 dark:bg-red-900/20"
      )}>
        <TrendingUp className={cn("w-3 h-3", !isPositive && "rotate-180")} />
        {change}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white leading-none">{value}</h3>
    </div>
  </motion.div>
);

const RecentAlertRow = ({ name, img, type, time, severity }) => (
  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
     <td className="px-6 py-4">
       <div className="flex items-center gap-3">
         <img src={img} alt="" className="w-8 h-8 rounded-full bg-gray-200" />
         <span className="font-semibold">{name}</span>
       </div>
     </td>
     <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-400">{type}</td>
     <td className="px-6 py-4 text-sm text-gray-400">{time}</td>
     <td className="px-6 py-4">
       <span className={cn(
         "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
         severity === 'high' ? "bg-red-100 text-red-600 dark:bg-red-950/30" :
         severity === 'medium' ? "bg-orange-100 text-orange-600 dark:bg-orange-950/30" :
         "bg-blue-100 text-blue-600 dark:bg-blue-950/30"
       )}>
         {severity}
       </span>
     </td>
     <td className="px-6 py-4">
       <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all">
         <Monitor className="w-4 h-4 text-brand-600" />
       </button>
     </td>
  </tr>
);
