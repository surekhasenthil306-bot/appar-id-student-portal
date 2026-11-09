import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  School
} from 'lucide-react';
import { faqList } from '../data/mockData';

export default function HelpSupport({ t }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Duplicate Record Flag');
  const [ticketDesc, setTicketDesc] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 'GRV-SKCET-7819',
      date: '24-Oct-2024',
      category: 'Credit Transfer Missing',
      subject: 'Inclusion of NPTEL Cloud Computing course (3 credits)',
      status: 'Resolved',
      response: 'Credits verified by Controller of Examinations and mapped to ABC ledger under Anna University R-2022.'
    },
    {
      id: 'GRV-SKCET-6902',
      date: '10-Sep-2023',
      category: 'Aadhaar Demographic Match',
      subject: 'Alignment of candidate initials with Class 10 SSLC mark sheet',
      status: 'Resolved',
      response: 'Name confirmed as R. Karthik matching UIDAI token and college admission register.'
    }
  ]);
  const [newTicketSuccess, setNewTicketSuccess] = useState('');

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDesc) return;

    const newTicket = {
      id: `GRV-SKCET-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: ticketCategory,
      subject: ticketSubject,
      status: 'Under Review by Registrar',
      response: 'Grievance ticket forwarded to SKCET College Nodal Officer Dr. P. Ashoka Varthanan. Resolution within 2 working days.'
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketSuccess(`Grievance #${newTicket.id} registered with College Nodal Desk!`);
    setTicketSubject('');
    setTicketDesc('');
    setTimeout(() => setNewTicketSuccess(''), 5000);
  };

  return (
    <div className="help-support-root">
      
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2e1065', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={24} color="#6d28d9" />
          {t.helpPageTitle}
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '2px' }}>
          {t.helpPageDesc}
        </p>
      </div>

      {/* Official College Nodal Contact Directory */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        marginBottom: '22px'
      }}>
        <div style={{ background: '#ffffff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: '#faf5ff', color: '#6d28d9', padding: '12px', borderRadius: '10px' }}>
            <School size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>SKCET College Nodal Desk</div>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>Admin Block, Room 104</div>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>Intercom Ext: 214 • Mon-Fri 9 AM - 4:30 PM</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: '#fdf2f8', color: '#db2777', padding: '12px', borderRadius: '10px' }}>
            <Phone size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Helpline Phone</div>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>0422-2678001 / 02</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>National Toll-Free: <strong>1800-111-928</strong></div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: '#ecfdf5', color: '#059669', padding: '12px', borderRadius: '10px' }}>
            <Mail size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Official Email Desk</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>apaar.nodal@skcet.ac.in</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Official Grievance Redressal</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Ticket Form & Grievance History */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '22px', marginBottom: '22px' }}>
        
        {/* Ticket Form */}
        <div className="gov-card" style={{ margin: 0 }}>
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Send size={18} color="#6d28d9" />
              {t.registerGrievance}
            </div>
            <span className="badge badge-pink">SKCET SGRC</span>
          </div>

          <form onSubmit={handleTicketSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                {t.grievanceNature}
              </label>
              <select 
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}
              >
                <option value="Duplicate Record Flag">Duplicate Record / Board Record Conflict</option>
                <option value="Aadhaar Demographic Match">Initial / Name Mismatch between Aadhaar and HSC Certificate</option>
                <option value="Credit Transfer Missing">Academic Bank of Credits (ABC) Missing Course Marks</option>
                <option value="Admin Document Request">Query Regarding Admin Requested Mark Sheet</option>
                <option value="DigiLocker Hash Error">DigiLocker Cryptographic Hash Validation Error</option>
              </select>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                {t.grievanceSubject}
              </label>
              <input 
                type="text"
                required
                placeholder="e.g. Discrepancy in 5th Semester Course Code 22CS501 credits"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                {t.grievanceExplanation}
              </label>
              <textarea 
                required
                rows={4}
                placeholder="State your register number (713522104084), examination month/year, and specific discrepancy details."
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            {newTicketSuccess && (
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} /> {newTicketSuccess}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={14} /> {t.submitGrievanceBtn}
            </button>
          </form>
        </div>

        {/* Grievance Ticket History */}
        <div className="gov-card" style={{ margin: 0 }}>
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Clock size={18} color="#db2777" />
              Grievance Register History ({tickets.length})
            </div>
            <span className="badge badge-violet">Official Log</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.map((t) => (
              <div 
                key={t.id}
                style={{
                  background: '#faf5ff',
                  border: '1px solid #ddd6fe',
                  borderRadius: '8px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '0.82rem', color: '#6d28d9' }}>
                    {t.id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{t.date}</span>
                    {t.status === 'Resolved' ? (
                      <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>Resolved</span>
                    ) : (
                      <span className="badge badge-pending" style={{ fontSize: '0.65rem' }}>In Scrutiny</span>
                    )}
                  </div>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1e1b4b', marginBottom: '2px' }}>
                  {t.subject}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>
                  Category: {t.category}
                </div>

                <div style={{
                  background: '#ffffff',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.76rem',
                  color: '#334155'
                }}>
                  <strong>Authority Action:</strong> {t.response}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <HelpCircle size={18} color="#6d28d9" />
            {t.faqTitle}
          </div>
          <span className="badge badge-pink">Official Q&A</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqList.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: isOpen ? '#faf5ff' : '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: isOpen ? '#6d28d9' : '#1e1b4b'
                  }}
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp size={16} color="#6d28d9" /> : <ChevronDown size={16} color="#64748b" />}
                </button>

                {isOpen && (
                  <div style={{ padding: '14px 16px', background: '#faf5ff', borderTop: '1px solid #ddd6fe', fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
