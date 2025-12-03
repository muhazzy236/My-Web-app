import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { HeartPulse, Brain, Baby, Bone, Eye, Microscope, Stethoscope, Pill } from 'lucide-react';

const servicesList = [
  { icon: HeartPulse, title: "Cardiology", desc: "Comprehensive heart care including diagnostics, monitoring, and surgery." },
  { icon: Brain, title: "Neurology", desc: "Expert care for disorders of the nervous system, brain, and spinal cord." },
  { icon: Baby, title: "Pediatrics", desc: "Specialized healthcare for infants, children, and adolescents." },
  { icon: Bone, title: "Orthopedics", desc: "Treatment for bones, joints, ligaments, tendons, and muscles." },
  { icon: Eye, title: "Ophthalmology", desc: "Advanced eye care services, surgeries, and vision correction." },
  { icon: Microscope, title: "Laboratory", desc: "Quick and accurate diagnostic testing with state-of-the-art equipment." },
  { icon: Stethoscope, title: "General Medicine", desc: "Primary care for all ages, focusing on prevention and wellness." },
  { icon: Pill, title: "Pharmacy", desc: "In-house pharmacy providing prescription medications and advice." },
];

export const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Our Medical Services</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We offer a wide range of medical specialties under one roof. Our multidisciplinary team works together to provide holistic care tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servicesList.map((service, idx) => (
          <GlassCard key={idx} hoverEffect delay={idx * 0.05} className="flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-white flex items-center justify-center text-blue-600 mb-6 shadow-sm">
              <service.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed flex-grow">{service.desc}</p>
            <button className="mt-6 text-blue-600 font-semibold text-sm hover:translate-x-1 transition-transform self-start flex items-center gap-1">
              Learn more <span>→</span>
            </button>
          </GlassCard>
        ))}
      </div>
      
      {/* Feature Block */}
      <div className="mt-20">
         <GlassCard className="grid md:grid-cols-2 gap-10 items-center overflow-hidden p-0 bg-white/40">
            <div className="p-10 space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Advanced Diagnostic Center</h2>
                <p className="text-slate-700">
                    Our clinic is equipped with the latest MRI, CT Scan, and X-ray technology. We believe that accurate diagnosis is the first step towards effective treatment.
                </p>
                <ul className="space-y-2">
                    {['Full Body Checkups', 'Digital X-Rays', '3D Ultrasound', 'Genetic Testing'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-slate-800 font-medium">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-full min-h-[300px]">
                <img src="https://picsum.photos/800/600?random=50" alt="Equipment" className="w-full h-full object-cover" />
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
