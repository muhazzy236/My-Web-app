
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Calendar, Clock, CheckCircle, User, Mail, Phone, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../services/db';

export const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRefId, setLastRefId] = useState('');

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.department) newErrors.department = "Please select a department";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Generate Reference ID
    const refId = 'REF-' + Math.floor(1000 + Math.random() * 9000);
    setLastRefId(refId);

    // Simulate API processing time
    setTimeout(() => {
      // 1. Save Lead to 'Database'
      db.addLead({
        referenceId: refId,
        name: formData.name,
        contact: formData.email, // Storing primary contact
        service: formData.department,
        source: 'Booking Form',
        appointmentDetails: `${formData.date} at ${formData.time}`
      });

      // 2. Email Logic
      // Construct the email content
      const subject = encodeURIComponent(`Appointment Request: ${refId} - ${formData.name}`);
      const body = encodeURIComponent(
`New Appointment Request
Reference ID: ${refId}

Patient Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Appointment Details:
-------------------
Department: ${formData.department}
Date: ${formData.date}
Time: ${formData.time}

Sent via CrystalCare Online Booking System`
      );

      // Open the user's email client to send the email to the specific address
      window.location.href = `mailto:onibudomuhammed@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold text-slate-900"
        >
          Book an Appointment
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 mt-2"
        >
          Schedule your visit in a few simple steps.
        </motion.p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8 gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300
              ${step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/40 text-slate-400 border border-white/60'}
            `}>
              {s}
            </div>
            {s < 3 && (
              <div className={`w-12 h-1 mx-2 rounded-full transition-colors duration-300 ${step > s ? 'bg-blue-600' : 'bg-white/40'}`} />
            )}
          </div>
        ))}
      </div>

      <GlassCard className="relative overflow-hidden min-h-[500px] flex items-center justify-center backdrop-blur-xl">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full max-w-lg"
            >
              <form className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User className="text-blue-600" size={24} />
                  Patient Information
                </h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <div className="relative">
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-4 pl-12 rounded-xl bg-white/50 border focus:outline-none focus:ring-2 transition-all text-slate-800
                        ${errors.name ? 'border-red-400 focus:ring-red-200' : 'border-white/60 focus:ring-blue-400'}
                      `}
                      placeholder="John Doe" 
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                      <div className="relative">
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-4 pl-12 rounded-xl bg-white/50 border focus:outline-none focus:ring-2 transition-all text-slate-800
                              ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-white/60 focus:ring-blue-400'}
                            `}
                            placeholder="john@example.com" 
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 ml-1">Phone</label>
                      <div className="relative">
                        <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-4 pl-12 rounded-xl bg-white/50 border focus:outline-none focus:ring-2 transition-all text-slate-800
                              ${errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-white/60 focus:ring-blue-400'}
                            `}
                            placeholder="(555) 000-0000" 
                        />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.phone}</p>}
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] flex items-center gap-2"
                  >
                    Next Step <ChevronRight size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 2: Appointment Details */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full max-w-lg"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Appointment Details
                </h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Department</label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-xl bg-white/50 border focus:outline-none focus:ring-2 transition-all appearance-none text-slate-800
                      ${errors.department ? 'border-red-400 focus:ring-red-200' : 'border-white/60 focus:ring-blue-400'}
                    `}
                  >
                    <option value="">Select Department</option>
                    <option value="General">General Practice</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Dental">Dental</option>
                  </select>
                  {errors.department && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.department}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 ml-1">Date</label>
                        <input 
                            type="date"
                            name="date"
                            min={today}
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full p-4 rounded-xl bg-white/50 border focus:outline-none focus:ring-2 transition-all text-slate-800
                              ${errors.date ? 'border-red-400 focus:ring-red-200' : 'border-white/60 focus:ring-blue-400'}
                            `}
                        />
                        {errors.date && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.date}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 ml-1">Preferred Time</label>
                        <select 
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={`w-full p-4 rounded-xl bg-white/50 border focus:outline-none focus:ring-2 transition-all text-slate-800
                              ${errors.time ? 'border-red-400 focus:ring-red-200' : 'border-white/60 focus:ring-blue-400'}
                            `}
                        >
                            <option value="">Select Time</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="13:00">01:00 PM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="15:00">03:00 PM</option>
                            <option value="16:00">04:00 PM</option>
                        </select>
                        {errors.time && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.time}</p>}
                    </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-white/50 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} /> Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking <CheckCircle size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 p-8 w-full max-w-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-xl"
              >
                <CheckCircle size={48} />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-heading font-bold text-slate-800">Booking Initiated!</h2>
                <p className="text-slate-600">
                  Your details have been saved to our system.<br/>
                  Your email client has been opened to send the final confirmation request to <span className="text-blue-600 font-medium">onibudomuhammed@gmail.com</span>.
                </p>
              </div>

              <div className="bg-white/50 border border-white p-6 rounded-2xl inline-block text-left w-full shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Appointment Receipt</span>
                  <span className="font-mono text-slate-800 font-bold">{lastRefId}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department</span>
                    <span className="font-semibold text-slate-800">{formData.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date</span>
                    <span className="font-semibold text-slate-800">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time</span>
                    <span className="font-semibold text-slate-800">{formData.time}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                 <button 
                  onClick={() => { 
                    setStep(1); 
                    setFormData({ name: '', email: '', phone: '', department: '', date: '', time: '' }); 
                    setErrors({});
                  }} 
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </GlassCard>
    </div>
  );
};
