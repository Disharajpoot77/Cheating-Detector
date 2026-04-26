/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sidebar, Navbar } from './components/Layout';
import { Login } from './screens/Login';
import { StudentDashboard } from './screens/StudentDashboard';
import { LiveExam } from './screens/LiveExam';
import { AdminDashboard } from './screens/AdminDashboard.jsx';
import { AdminMonitoring } from './screens/AdminMonitoring';
import { SessionReport } from './screens/SessionReport';  

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);

  // Theme Sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (role) => {
    setUser({ role });
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setCurrentExam(null);
  };

  const renderScreen = () => {
    if (user?.role === 'admin') {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard />;
        case 'monitoring': return <AdminMonitoring />;
        case 'reports': return <SessionReport />;
        default: return <AdminDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard': return <StudentDashboard onStartExam={setCurrentExam} />;
        case 'profile': return <div className="flex items-center justify-center h-80 text-gray-500 font-bold uppercase tracking-widest">Student Profile Screen</div>;
        default: return <StudentDashboard onStartExam={setCurrentExam} />;
      }
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Exam View (Overlay) */}
      <AnimatePresence>
        {currentExam && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-[100]"
          >
            <LiveExam exam={currentExam} onFinish={() => setCurrentExam(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar
        role={user.role}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
          onMenuClick={() => setIsMobileOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + user.role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

