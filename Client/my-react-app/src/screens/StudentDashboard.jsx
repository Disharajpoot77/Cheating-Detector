import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

export const StudentDashboard = ({ onStartExam }) => {
  const mockExams = [
    {
      id: '1',
      title: 'Advanced Mathematics II',
      subject: 'Department of Applied Sciences',
      duration: 60,
      startTime: '2024-04-26 14:00',
      status: 'ongoing'
    },
    {
      id: '2',
      title: 'Computer Science Fundamentals',
      subject: 'School of IT',
      duration: 45,
      startTime: '2024-04-27 10:00',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Business Ethics & Management',
      subject: 'Department of Commerce',
      duration: 90,
      startTime: '2024-04-25 10:00',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Welcome back, Student!</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Here's your exam schedule and academic overview.</p>
      </div>
 
      {/* Instructions Panel */}
      <div className="glass p-6 rounded-3xl border-l-4 border-l-brand-600 shadow-xl shadow-brand-500/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Important Instructions</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Ensure your webcam and microphone are working.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Find a quiet, well-lit room for the examination.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                AI will monitor eye gaze, noise, and face presence.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Exam List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExams.map((exam) => (
          <motion.div
            key={exam.id}
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-6 relative overflow-hidden group border border-gray-100 dark:border-slate-800"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <FileText className="w-6 h-6 text-brand-600" />
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                exam.status === 'ongoing' ? "bg-green-100 text-green-600 dark:bg-green-950/30" :
                exam.status === 'upcoming' ? "bg-blue-100 text-blue-600 dark:bg-blue-950/30" :
                "bg-gray-100 text-gray-500 dark:bg-slate-800"
              )}>
                {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{exam.title}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{exam.subject}</p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                {exam.startTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                {exam.duration} Minutes
              </div>
            </div>

            <button
              disabled={exam.status === 'completed'}
              onClick={() => onStartExam(exam)}
              className={cn(
                "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
                exam.status === 'ongoing' 
                  ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20" 
                  : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
              )}
            >
              {exam.status === 'completed' ? 'Results Published' : exam.status === 'ongoing' ? 'Start Now' : 'Pending'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
