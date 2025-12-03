import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';

const doctors = [
  { name: "Dr. Sarah Lin", role: "Chief Cardiologist", img: "https://picsum.photos/200/200?random=20" },
  { name: "Dr. James Wilson", role: "Head of Neurology", img: "https://picsum.photos/200/200?random=21" },
  { name: "Dr. Emily Chen", role: "Pediatric Specialist", img: "https://picsum.photos/200/200?random=22" },
  { name: "Dr. Michael Ross", role: "General Surgeon", img: "https://picsum.photos/200/200?random=23" },
];

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">
      
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <motion.h1 
          className="text-4xl md:text-5xl font-heading font-bold text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About CrystalCare
        </motion.h1>
        <motion.p 
          className="text-lg text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Founded in 2024, CrystalCare was built on a simple premise: healthcare should be transparent, accessible, and human-centered. We believe in treating the person, not just the symptoms.
        </motion.p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="space-y-4 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-slate-800">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            To provide exceptional medical care through the harmonious integration of advanced technology and compassionate human touch, ensuring every patient feels heard, understood, and cared for.
          </p>
        </GlassCard>
        <GlassCard className="space-y-4 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-slate-800">Our Vision</h2>
          <p className="text-slate-600 leading-relaxed">
            To set a new global standard for healthcare facilities where environment, technology, and expertise converge to create a healing sanctuary for all.
          </p>
        </GlassCard>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Meet Our Specialists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, idx) => (
            <GlassCard key={idx} hoverEffect delay={idx * 0.1} className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{doc.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{doc.role}</p>
              <div className="mt-4 flex justify-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Timeline / Stats */}
      <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200/50">
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider">Years Experience</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">50k+</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider">Patients Healed</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider">Satisfaction</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">24</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider">Awards Won</div>
        </div>
      </GlassCard>
    </div>
  );
};
