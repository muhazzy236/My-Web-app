import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Stethoscope, Clock, ShieldCheck, Star, Users, Award } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 px-6 max-w-7xl mx-auto pb-10">
      
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-blue-800 text-sm font-semibold mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Accepting New Patients
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-slate-900">
              Quality Healthcare. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Transparent.</span>
            </h1>
            <p className="text-lg text-slate-600 mt-6 max-w-xl leading-relaxed">
              Experience the future of medicine in a calm, modern environment. 
              We combine advanced technology with compassionate care to put you first.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <NavLink to="/book">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 flex items-center gap-2">
                Book Appointment <ArrowRight size={20} />
              </button>
            </NavLink>
            <NavLink to="/services">
              <button className="px-8 py-4 glass-panel text-slate-800 hover:bg-white/50 rounded-xl font-semibold transition-all hover:scale-105">
                Our Services
              </button>
            </NavLink>
          </motion.div>

          {/* Trust Indicators */}
          <div className="pt-8 flex gap-8 items-center text-slate-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                   <img src={`https://picsum.photos/100/100?random=${i}`} alt="Patient" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                2k+
              </div>
            </div>
            <div className="text-sm">
              <div className="flex text-yellow-500 text-xs mb-1">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>
              <span className="font-semibold text-slate-800">4.9/5</span> from happy patients
            </div>
          </div>
        </div>

        {/* Hero Image / Visuals */}
        <div className="relative h-[500px] hidden lg:block">
          {/* Main Hero Card */}
          <motion.div 
            className="absolute right-0 top-10 w-4/5 h-[90%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/40"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://picsum.photos/800/1000?random=10" 
              alt="Doctor" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </motion.div>

          {/* Floating Widget 1 */}
          <motion.div 
            className="absolute top-20 left-0 glass-panel p-4 rounded-xl flex items-center gap-4 max-w-[200px]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <p className="font-bold text-slate-800">Verified</p>
            </div>
          </motion.div>

           {/* Floating Widget 2 */}
           <motion.div 
            className="absolute bottom-20 left-10 glass-panel p-4 rounded-xl flex items-center gap-4"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Top Rated</p>
              <p className="font-bold text-slate-800">Specialists</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <GlassCard hoverEffect delay={0.1} className="flex flex-col items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Clock size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">24/7 Service</h3>
          <p className="text-slate-600 text-sm">Emergency care is always available. We are here when you need us most.</p>
        </GlassCard>

        <GlassCard hoverEffect delay={0.2} className="flex flex-col items-start gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
            <Stethoscope size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Expert Doctors</h3>
          <p className="text-slate-600 text-sm">Highly qualified professionals from top medical institutions worldwide.</p>
        </GlassCard>

        <GlassCard hoverEffect delay={0.3} className="flex flex-col items-start gap-4">
          <div className="p-3 bg-cyan-100 text-cyan-600 rounded-2xl">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Leading Tech</h3>
          <p className="text-slate-600 text-sm">State-of-the-art diagnostic equipment for precise and fast results.</p>
        </GlassCard>
      </section>

      {/* Appointment Quick Book Preview */}
      <section className="relative rounded-3xl overflow-hidden glass-panel p-10 md:p-16 border border-white/50 text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10"></div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
          Ready to prioritize your health?
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Booking an appointment has never been easier. Select a time that works for you and skip the waiting room.
        </p>
        <NavLink to="/book">
          <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Book Now
          </button>
        </NavLink>
      </section>

    </div>
  );
};
