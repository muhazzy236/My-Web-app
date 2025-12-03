import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "What insurance plans do you accept?", a: "We accept most major insurance plans including BlueCross, Aetna, Cigna, and Medicare. Please contact our billing department for verification." },
  { q: "Do you offer telemedicine appointments?", a: "Yes! We offer secure video consultations for general follow-ups, prescription refills, and minor ailments." },
  { q: "How do I get my test results?", a: "Results are usually available within 24-48 hours via our secure online patient portal. We will also notify you by email." },
  { q: "Is there parking available?", a: "Yes, we have a free dedicated parking lot for patients directly behind the clinic building." },
];

export const Contact: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-heading font-bold text-slate-900">Get in Touch</h1>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
          Have questions? Our support team is here to help you 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <GlassCard className="flex items-center gap-6 p-8">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Phone</h3>
              <p className="text-slate-600">+1 (555) 123-4567</p>
              <p className="text-xs text-slate-500">Mon-Fri 8am-8pm</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-6 p-8">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Email</h3>
              <p className="text-slate-600">help@crystalcare.com</p>
              <p className="text-xs text-slate-500">We reply within 2 hours</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-6 p-8">
            <div className="p-4 bg-cyan-100 text-cyan-600 rounded-full">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Location</h3>
              <p className="text-slate-600">123 Medical Plaza</p>
              <p className="text-slate-600">Innovation City, ST 90210</p>
            </div>
          </GlassCard>

          {/* Emergency Box */}
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center">
            <h3 className="text-red-600 font-bold text-xl mb-2">Medical Emergency?</h3>
            <p className="text-red-500 mb-4">If you are experiencing a life-threatening emergency, please do not use this form.</p>
            <a href="tel:911" className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-pulse">
                Call 911 Immediately
            </a>
          </div>
        </div>

        {/* Map Placeholder */}
        <GlassCard className="h-full min-h-[400px] p-0 overflow-hidden relative group">
          <img 
            src="https://picsum.photos/800/800?random=99" 
            alt="Map" 
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl text-center">
                <MapPin className="mx-auto text-red-500 mb-2" size={32} />
                <p className="font-bold text-slate-800">CrystalCare Clinic</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto pt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <GlassCard key={idx} className="p-0 overflow-hidden cursor-pointer">
              <div 
                className="p-6 flex justify-between items-center"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <h3 className="font-semibold text-slate-800">{item.q}</h3>
                {openFaq === idx ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-slate-400" />}
              </div>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white/30 px-6 pb-6"
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
