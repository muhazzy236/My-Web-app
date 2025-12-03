
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../services/db';

const SYSTEM_INSTRUCTION = `
You are Clara, the AI assistant for CrystalCare Medical. 
Tone: Professional, warm, empathetic, and trustworthy.
Role: Help visitors understand services, answer general queries, and capture appointment leads.
Safety: 
- NEVER provide specific medical diagnoses. 
- If a user describes severe symptoms (chest pain, trouble breathing), tell them to call 911 immediately.

Booking Process (STRICT):
1. Ask for the patient's Name.
2. Ask for Contact Info (Email or Phone).
3. Ask for the desired Service or Department.
4. Ask for preferred Date/Time.
5. CRITICAL: Once you have ALL 4 details, tell the user: "To confirm this booking and send your request to our team, please type the word HEALTY."
6. Do NOT call the 'saveLead' tool until the user explicitly types "HEALTY" (case-insensitive).
7. If the user types "HEALTY" and you have the details, call the 'saveLead' tool immediately.

Services: Cardiology, Neurology, Pediatrics, Orthopedics, Ophthalmology, General Medicine.
Hours: Open 24/7 for emergencies. Regular consults 8am-8pm.
`;

const saveLeadTool: FunctionDeclaration = {
  name: 'saveLead',
  description: 'Save a patient lead after they have typed the trigger word HEALTY.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'Patient name' },
      contact: { type: Type.STRING, description: 'Phone number or email' },
      service: { type: Type.STRING, description: 'Department/Service' },
      appointmentDetails: { type: Type.STRING, description: 'Preferred date and time' }
    },
    required: ['name', 'contact', 'service'],
  },
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am Clara. To book an appointment, I will need your Name, Contact Info, Service, and Preferred Time.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Generate a Chat Session ID only once per session
  const [chatId] = useState(() => 'CHAT-' + Math.floor(1000 + Math.random() * 9000));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const chatHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model,
        contents: [
            ...chatHistory,
            { role: 'user', parts: [{ text: userMsg }]}
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [saveLeadTool] }],
        }
      });

      // Handle Function Calls
      const functionCalls = response.candidates?.[0]?.content?.parts?.filter(p => p.functionCall);
      
      let botResponseText = response.text || "";

      if (functionCalls && functionCalls.length > 0) {
        for (const call of functionCalls) {
          if (call.functionCall && call.functionCall.name === 'saveLead') {
            const args = call.functionCall.args as any;
            
            // 1. Save to Database
            db.addLead({
              referenceId: chatId,
              name: args.name,
              contact: args.contact,
              service: args.service || 'General',
              source: 'AI Chatbot',
              appointmentDetails: args.appointmentDetails || 'Not specified'
            });

            // 2. Email Logic (Trigger mailto)
            const subject = encodeURIComponent(`AI Booking Request: ${chatId} - ${args.name}`);
            const body = encodeURIComponent(
`New Booking via AI Chatbot
Reference ID: ${chatId}

Patient Information:
-------------------
Name: ${args.name}
Contact: ${args.contact}
Service Interest: ${args.service}
Preferred Time: ${args.appointmentDetails || 'Not specified'}

Sent via CrystalCare Clara AI`
            );
            
            // Execute mailto
            window.location.href = `mailto:onibudomuhammed@gmail.com?subject=${subject}&body=${body}`;

            botResponseText = `Thank you, ${args.name}. I have verified your request using code "${chatId}". Your email client should open now to send the final confirmation to our team. Is there anything else?`;
          }
        }
      }

      if (!botResponseText && !functionCalls?.length) {
          botResponseText = "I apologize, could you please repeat that?";
      }

      setMessages(prev => [...prev, { role: 'model', text: botResponseText }]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please call us directly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] rounded-2xl glass-panel flex flex-col overflow-hidden shadow-2xl border border-white/60"
          >
            {/* Header */}
            <div className="bg-white/40 p-4 border-b border-white/30 flex items-center gap-3 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-white flex items-center justify-center text-blue-600 shadow-sm">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Clara AI</h3>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                   Ref: {chatId}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/10">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold
                    ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-blue-100 text-blue-600'}
                  `}>
                    {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-slate-800 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-white/50'}
                  `}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Loader2 size={14} className="animate-spin text-blue-600"/>
                  </div>
                  <div className="bg-white/50 p-3 rounded-2xl rounded-tl-none text-slate-500 text-xs flex items-center">
                    Clara is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/40 border-t border-white/30 backdrop-blur-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type here..."
                  className="flex-1 bg-white/70 border-none rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-slate-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
