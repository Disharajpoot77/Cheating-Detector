import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Mic, 
  Timer, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  Smartphone, 
  Users,
  ShieldCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../lib/utils';

export const LiveExam = ({ exam, onFinish }) => {
  const mockQuestions = [
    {
      id: '1',
      text: 'What is the primary function of the operating system kernel?',
      options: [
        'Resource management and process scheduling',
        'Displaying graphics to the user',
        'Filtering junk emails',
        'Running web applications'
      ]
    },
    {
      id: '2',
      text: 'In database management systems, what does ACID stand for?',
      options: [
        'Access, Control, Integrated, Data',
        'Atomicity, Consistency, Isolation, Durability',
        'Architecture, Connection, Interface, Design',
        'All Candidates In Database'
      ]
    }
  ];

  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [aiStatus, setAiStatus] = useState({
    face: true,
    multiple: false,
    gaze: true,
    noise: false,
    mobile: false
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Simulate AI detections
    const aiSim = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.95) {
        setAiStatus(prev => ({ ...prev, gaze: false }));
        setTimeout(() => setAiStatus(prev => ({ ...prev, gaze: true })), 2000);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(aiSim);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = mockQuestions[currentQuestion];

  return (
    <div className="fixed inset-0 z-[60] bg-gray-50 dark:bg-slate-950 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-16 glass border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-brand-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider">Live Exam</div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">{exam.title}</h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-orange-500 font-mono font-bold text-xl glass px-4 py-1.5 rounded-2xl border-orange-200 dark:border-orange-900/30">
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setShowAlert(true)}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
          >
            Submit Exam
          </button>
        </div>
      </header>

      <main className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left Section: Question */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="glass p-8 rounded-[32px]">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-bold text-brand-600 uppercase tracking-widest">Question {currentQuestion + 1} of {mockQuestions.length}</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white leading-tight">
              {currentQ.text}
            </h3>
            
            <div className="mt-10 space-y-4">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [currentQ.id]: idx })}
                  className={cn(
                    "w-full p-5 rounded-2xl text-left border-2 transition-all flex items-center justify-between group",
                    answers[currentQ.id] === idx 
                      ? "bg-brand-50 border-brand-500 dark:bg-brand-950/20" 
                      : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-slate-700"
                  )}
                >
                  <span className={cn(
                    "text-lg font-medium",
                    answers[currentQ.id] === idx ? "text-brand-700 dark:text-brand-400" : "text-gray-600 dark:text-slate-300"
                  )}>
                    {option}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                    answers[currentQ.id] === idx ? "border-brand-500 bg-brand-500" : "border-gray-300 dark:border-slate-600"
                  )}>
                    {answers[currentQ.id] === idx && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-auto py-4">
            <button
               disabled={currentQuestion === 0}
               onClick={() => setCurrentQuestion(prev => prev - 1)}
               className="px-8 py-3 rounded-2xl font-bold bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 disabled:opacity-50 text-gray-600 dark:text-slate-400"
            >
              Previous
            </button>
            <button
               disabled={currentQuestion === mockQuestions.length - 1}
               onClick={() => setCurrentQuestion(prev => prev + 1)}
               className="px-8 py-3 rounded-2xl font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20 flex items-center gap-2"
            >
              Next Question
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Section: AI Proctor */}
        <div className="w-80 flex flex-col gap-6 shrink-0">
          {/* Webcam Feed */}
          <div className="relative aspect-video glass rounded-3xl overflow-hidden border-2 border-brand-500 shadow-2xl">
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
              <div className="text-slate-400 text-center">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-xs uppercase tracking-widest font-bold">Live Stream Active</p>
              </div>
            </div>
            {/* AI Overlay Mockup */}
            <div className="absolute inset-x-8 inset-y-12 border-2 border-brand-400/50 rounded-xl animate-pulse-subtle">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-brand-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-brand-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-brand-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-brand-500" />
            </div>
            
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] text-white font-bold uppercase tracking-widest">Recording</span>
            </div>
          </div>

          {/* AI Indicators */}
          <div className="glass p-5 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2 border-b border-gray-100 dark:border-slate-800 pb-2">AI Monitoring Indicators</h4>
            
            <div className="grid grid-cols-1 gap-3">
              <Indicator label="Face Detected" status={aiStatus.face ? 'success' : 'danger'} icon={Users} />
              <Indicator label="Eye Gaze Tracker" status={aiStatus.gaze ? 'success' : 'warning'} icon={Eye} />
              <Indicator label="Noise Detection" status={aiStatus.noise ? 'danger' : 'success'} icon={Mic} />
              <Indicator label="Mobile Detection" status={aiStatus.mobile ? 'danger' : 'success'} icon={Smartphone} />
            </div>
          </div>

          <div className="glass p-5 rounded-3xl bg-brand-600/5 border-brand-600/20">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-bold text-brand-700 dark:text-brand-400">Secure Protocol v2.4</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed italic">
              "System is analyzing browser activity and peripheral connectivity in real-time."
            </p>
          </div>
        </div>
      </main>

      {/* Warning/Submit Modal */}
      <AnimatePresence>
        {showAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAlert(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-md glass p-8 rounded-[40px] text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-10 h-10 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Submit?</h3>
              <p className="text-gray-500 dark:text-slate-400 mb-8">
                Once submitted, your responses will be recorded and the proctoring session will end. You cannot modify answers later.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={onFinish}
                  className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 shadow-xl shadow-brand-600/20 transition-all"
                >
                  Confirm & Submit
                </button>
                <button
                  onClick={() => setShowAlert(false)}
                  className="w-full py-4 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                >
                  Back to Exam
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Indicator = ({ label, status, icon: Icon }) => (
  <div className={cn(
    "flex items-center justify-between p-3 rounded-2xl border transition-colors",
    status === 'success' ? "bg-green-50/50 border-green-100 dark:bg-green-950/10 dark:border-green-900/30" :
    status === 'warning' ? "bg-yellow-50/50 border-yellow-100 dark:bg-yellow-950/10 dark:border-yellow-900/30 font-bold" :
    "bg-red-50/50 border-red-100 dark:bg-red-950/10 dark:border-red-900/30 font-bold"
  )}>
    <div className="flex items-center gap-3">
      <div className={cn(
        "p-2 rounded-xl",
        status === 'success' ? "text-green-600" :
        status === 'warning' ? "text-yellow-600" :
        "text-red-600"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-slate-300">{label}</span>
    </div>
    <div className={cn(
      "w-2 h-2 rounded-full",
      status === 'success' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
      status === 'warning' ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-pulse" :
      "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"
    )} />
  </div>
);
