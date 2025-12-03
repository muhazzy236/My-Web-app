
import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { db, Lead, Analytics } from '../services/db';
import { ShieldCheck, LayoutDashboard, Users, BarChart3, LogOut, Search, Bot, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads'>('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    // Load data on mount or tab change
    if (isAuthenticated) {
      setLeads(db.getLeads());
      setAnalytics(db.getAnalytics());
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234ABCD') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  // Calculate new booking notifications
  const newBookingsCount = leads.filter(l => l.status === 'New').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative z-10">
        <GlassCard className="w-full max-w-md p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Access</h1>
          <p className="text-slate-500">Enter your credentials to access the dashboard.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password (1234ABCD)" 
              className="w-full p-3 rounded-xl bg-white/50 border border-slate-200 focus:ring-2 focus:ring-blue-400 outline-none text-slate-800"
            />
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
              Login to Dashboard
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      
      {/* Notification Banner */}
      {newBookingsCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg mb-6 flex items-center gap-3"
        >
          <div className="p-1 bg-white/20 rounded-full animate-pulse">
            <Bell size={18} />
          </div>
          <span className="font-semibold">Action Required:</span>
          <span>You have {newBookingsCount} new booking request(s) awaiting review.</span>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <GlassCard className="p-4 flex flex-col gap-2">
             <div className="flex items-center gap-2 mb-4 px-2">
                <div className="bg-blue-600 text-white p-1 rounded">
                    <ShieldCheck size={18} />
                </div>
                <span className="font-bold text-slate-800">Admin Panel</span>
             </div>
             
             <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-white/40'}`}
             >
                <LayoutDashboard size={18} /> Dashboard
             </button>

             <button 
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm w-full justify-between
                ${activeTab === 'leads' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-white/40'}`}
             >
                <div className="flex items-center gap-3">
                    <Users size={18} /> Leads
                </div>
                {newBookingsCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{newBookingsCount}</span>
                )}
             </button>

             <div className="h-px bg-slate-200 my-2"></div>

             <button 
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-600 hover:bg-red-50"
             >
                <LogOut size={18} /> Logout
             </button>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="flex-1">
            <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        key="dashboard"
                    >
                        <h2 className="text-3xl font-bold text-slate-800">Overview</h2>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <GlassCard className="p-6">
                                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Total Leads</div>
                                <div className="text-4xl font-bold text-slate-900 mt-2">{analytics?.totalLeads || 0}</div>
                                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <span className="bg-green-100 px-1.5 py-0.5 rounded">+12%</span> from last week
                                </div>
                            </GlassCard>
                            <GlassCard className="p-6 border-l-4 border-blue-500">
                                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Pending Bookings</div>
                                <div className="text-4xl font-bold text-slate-900 mt-2">{newBookingsCount}</div>
                                <div className="text-xs text-blue-600 mt-1">Requires Confirmation</div>
                            </GlassCard>
                            <GlassCard className="p-6">
                                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Avg. Response</div>
                                <div className="text-4xl font-bold text-slate-900 mt-2">2m</div>
                                <div className="text-xs text-purple-600 mt-1">Chatbot Speed</div>
                            </GlassCard>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             {/* Daily Activity Chart (Simple CSS Bar Chart) */}
                            <GlassCard className="min-h-[300px] flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><BarChart3 size={18}/> Daily Activity</h3>
                                </div>
                                <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2">
                                    {analytics?.dailyActivity?.map((day, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-2 w-full">
                                            <div 
                                                className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 relative group"
                                                style={{ height: `${Math.max((day.count || 0) * 20, 10)}px`, opacity: 0.8 }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {day.count}
                                                </div>
                                            </div>
                                            <div className="text-xs text-slate-400 rotate-0">{day.date.slice(5)}</div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>

                            {/* Service Distribution */}
                            <GlassCard className="min-h-[300px]">
                                <h3 className="font-bold text-slate-800 mb-6">Leads by Service</h3>
                                <div className="space-y-4">
                                    {Object.entries(analytics?.leadsByService || {}).map(([service, count], idx) => {
                                        const total = analytics?.totalLeads || 1;
                                        const percent = Math.round((count / total) * 100);
                                        return (
                                            <div key={idx}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium text-slate-700">{service}</span>
                                                    <span className="text-slate-500">{count} ({percent}%)</span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                    <div 
                                                        className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full" 
                                                        style={{ width: `${percent}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {(!analytics?.leadsByService || Object.keys(analytics.leadsByService).length === 0) && (
                                        <div className="text-center text-slate-400 py-10">No data available yet</div>
                                    )}
                                </div>
                            </GlassCard>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'leads' && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="leads"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-slate-800">Recent Bookings</h2>
                            <div className="relative">
                                <input 
                                    placeholder="Search leads..." 
                                    className="pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-slate-800"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            </div>
                        </div>

                        <GlassCard className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-200">
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Ref ID</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Contact</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Details</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Source</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {leads.length === 0 ? (
                                            <tr><td colSpan={6} className="p-8 text-center text-slate-500">No leads found.</td></tr>
                                        ) : leads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="p-4 font-mono text-xs font-bold text-blue-600">{lead.referenceId || 'N/A'}</td>
                                                <td className="p-4 font-medium text-slate-800">{lead.name}</td>
                                                <td className="p-4 text-slate-600 text-sm">{lead.contact}</td>
                                                <td className="p-4 text-slate-600 text-sm">
                                                    <div className="font-medium">{lead.service}</div>
                                                    <div className="text-xs text-slate-400">{lead.appointmentDetails || 'No details'}</div>
                                                </td>
                                                <td className="p-4 text-sm text-slate-500">
                                                    {lead.source === 'AI Chatbot' ? (
                                                        <span className="flex items-center gap-1 text-purple-600"><Bot size={14}/> Chatbot</span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-blue-600"><LayoutDashboard size={14}/> Form</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold
                                                        ${lead.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                                                    `}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
