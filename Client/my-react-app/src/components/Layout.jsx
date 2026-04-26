import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  LayoutDashboard, 
  Monitor, 
  FileText, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Bell, 
  Search,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Sidebar = ({ 
  role, 
  activeTab, 
  onTabChange, 
  onLogout,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const adminLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Live Monitor', icon: Monitor },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const studentLinks = [
    { id: 'dashboard', label: 'Exams', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 glass lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              ProctoAI
            </span>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden ml-auto p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  activeTab === link.id
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                    : "text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <link.icon className={cn(
                  "w-5 h-5",
                  activeTab === link.id ? "text-white" : "group-hover:text-brand-600 dark:group-hover:text-brand-400"
                )} />
                {link.label}
              </button>
            ))}
          </nav>

          {/* User & Settings */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-slate-800 flex items-center justify-center border border-brand-200 dark:border-slate-700">
                <User className="w-4 h-4 text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate uppercase tracking-wider text-gray-500 dark:text-slate-500">
                  Logged in as
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-slate-200 truncate capitalize">
                  {role} User
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-sm font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export const Navbar = ({ isDarkMode, toggleDarkMode, onMenuClick }) => {
  return (
    <header className="h-16 glass sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between border-b border-gray-100 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search everything..."
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full border-none focus:ring-2 focus:ring-brand-500 outline-none w-64 text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-all"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full" />
        </button>
      </div>
    </header>
  );
};
