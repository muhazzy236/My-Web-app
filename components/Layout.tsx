import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50" />
      
      {/* Ambient Floating Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-400/20 rounded-full blur-3xl -z-10" />
      <div className="fixed top-[40%] left-[60%] w-[25rem] h-[25rem] bg-purple-300/20 rounded-full blur-3xl -z-10" />

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4
        ${isScrolled ? 'glass-panel shadow-sm py-3' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-lg text-white shadow-lg">
              <Activity size={24} />
            </div>
            <span className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600">
              CrystalCare
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  text-sm font-medium tracking-wide transition-colors duration-200
                  ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-500'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink to="/book">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Book Appointment
              </button>
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-700 p-2 glass-panel rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-4 right-4 z-40 glass-panel rounded-2xl overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    text-lg font-medium p-2 rounded-lg transition-colors
                    ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink to="/book" className="mt-2">
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow-md">
                  Book Appointment
                </button>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-24 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/30 bg-white/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 p-1.5 rounded text-white">
                  <Activity size={20} />
                </div>
                <span className="text-xl font-heading font-bold text-slate-800">CrystalCare</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Providing world-class medical services with a modern, patient-first approach. 
                Transparent, trusted, and technologically advanced.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><NavLink to="/about" className="hover:text-blue-500">About Us</NavLink></li>
                <li><NavLink to="/services" className="hover:text-blue-500">Our Services</NavLink></li>
                <li><NavLink to="/book" className="hover:text-blue-500">Book Appointment</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-blue-500">Contact Support</NavLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>General Practice</li>
                <li>Cardiology</li>
                <li>Pediatrics</li>
                <li>Neurology</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  <span>123 Medical Plaza, Innovation City</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  <span>care@crystalcare.com</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a href="#" className="p-2 bg-white/50 rounded-full hover:bg-blue-500 hover:text-white transition-all"><Facebook size={18} /></a>
                <a href="#" className="p-2 bg-white/50 rounded-full hover:bg-blue-400 hover:text-white transition-all"><Twitter size={18} /></a>
                <a href="#" className="p-2 bg-white/50 rounded-full hover:bg-pink-500 hover:text-white transition-all"><Instagram size={18} /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} CrystalCare Medical Clinic. All rights reserved.</p>
            <NavLink to="/admin" className="flex items-center gap-1 opacity-60 hover:opacity-100 hover:text-blue-600 transition-all">
               <Lock size={12} /> Admin Login
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};