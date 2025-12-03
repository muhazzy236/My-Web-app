
export interface Lead {
  id: string;
  referenceId?: string;
  name: string;
  contact: string; // Email or Phone
  service: string;
  source: 'Booking Form' | 'AI Chatbot';
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
  appointmentDetails?: string;
}

export interface Analytics {
  totalLeads: number;
  leadsByService: Record<string, number>;
  dailyActivity: { date: string; count: number }[];
}

const LEADS_KEY = 'crystalcare_leads';

// Seed some initial dummy data if empty
const seedData = () => {
  if (!localStorage.getItem(LEADS_KEY)) {
    const dummyLeads: Lead[] = [
      { id: '1', referenceId: 'REF-9821', name: 'Alice Smith', contact: 'alice@example.com', service: 'Cardiology', source: 'Booking Form', date: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'Contacted' },
      { id: '2', referenceId: 'REF-3342', name: 'Bob Jones', contact: '555-0123', service: 'General', source: 'AI Chatbot', date: new Date(Date.now() - 86400000 * 1).toISOString(), status: 'New' },
    ];
    localStorage.setItem(LEADS_KEY, JSON.stringify(dummyLeads));
  }
};

export const db = {
  getLeads: (): Lead[] => {
    seedData();
    const data = localStorage.getItem(LEADS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const leads = db.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'New',
    };
    leads.unshift(newLead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return newLead;
  },

  updateLeadStatus: (id: string, status: Lead['status']) => {
    const leads = db.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index].status = status;
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    }
  },

  getAnalytics: (): Analytics => {
    const leads = db.getLeads();
    
    // Calculate leads by service
    const leadsByService: Record<string, number> = {};
    leads.forEach(l => {
      const svc = l.service || 'General';
      leadsByService[svc] = (leadsByService[svc] || 0) + 1;
    });

    // Calculate daily activity (last 7 days)
    const dailyActivity: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = leads.filter(l => l.date.startsWith(dateStr)).length;
      dailyActivity.push({ date: dateStr, count });
    }

    return {
      totalLeads: leads.length,
      leadsByService,
      dailyActivity
    };
  }
};
