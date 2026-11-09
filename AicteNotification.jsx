import React, { useState } from 'react';
import { 
  BellRing, 
  Search, 
  Download, 
  Eye, 
  BookmarkCheck
} from 'lucide-react';
import { triggerFileDownload } from '../utils/documentHelper';

export default function AicteNotification({ notifications, setNotifications, setActiveTab, t }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalNotification, setActiveModalNotification] = useState(null);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleOpenDetail = (notif) => {
    handleMarkAsRead(notif.id);
    setActiveModalNotification(notif);
  };

  const filteredNotifs = notifications.filter(n => {
    const matchFilter = selectedFilter === 'All' 
      || (selectedFilter === 'Action Required' && (n.category === 'Action Required' || n.category === 'Admin Request'))
      || n.category === selectedFilter;
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase())
      || n.refNumber.toLowerCase().includes(searchTerm.toLowerCase())
      || n.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="aicte-notifications-root">
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2e1065', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BellRing size={26} color="#6d28d9" />
            {t.notifPageTitle}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '2px' }}>
            {t.notifPageDesc}
          </p>
        </div>

        <button 
          className="btn-outline-pink"
          onClick={handleMarkAllRead}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          <BookmarkCheck size={14} /> {t.markAllRead}
        </button>
      </div>

      {/* Filter and Search Box */}
      <div className="gov-card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search circulars by reference number or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.86rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '2px 0' }}>
            {['All', 'Action Required', 'Circular', 'Exam & Credit', 'Scholarships'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  background: selectedFilter === filter ? '#6d28d9' : '#f1f5f9',
                  color: selectedFilter === filter ? '#ffffff' : '#475569',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Official Government Table Format for Circulars */}
      <div className="gov-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', background: '#faf5ff', borderBottom: '1px solid #ddd6fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#3b0764' }}>
            {t.gazetteRegister}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Showing {filteredNotifs.length} Published Circulars
          </span>
        </div>

        <div className="gov-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table className="gov-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>{t.slNo}</th>
                <th style={{ width: '110px' }}>{t.circularDate}</th>
                <th>{t.circularRef}</th>
                <th>{t.subject}</th>
                <th>{t.issuingAuth}</th>
                <th style={{ width: '120px' }}>{t.category}</th>
                <th style={{ textAlign: 'center', width: '130px' }}>{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No circulars match your search query.
                  </td>
                </tr>
              ) : (
                filteredNotifs.map((item, index) => {
                  const isUrgent = item.priority === 'Urgent' || item.priority === 'High';
                  return (
                    <tr key={item.id} style={{ background: !item.read ? '#fdf4ff' : 'transparent' }}>
                      <td style={{ fontWeight: 700, color: '#64748b', textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {item.date}
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#6d28d9', fontWeight: 700 }}>
                        {item.refNumber}
                      </td>
                      <td>
                        <div 
                          onClick={() => handleOpenDetail(item)}
                          style={{ fontWeight: 700, color: isUrgent ? '#9d174d' : '#1e1b4b', cursor: 'pointer', lineHeight: 1.3 }}
                        >
                          {item.title}
                          {!item.read && (
                            <span style={{ marginLeft: '6px', fontSize: '0.65rem', background: '#ec4899', color: '#fff', padding: '1px 6px', borderRadius: '4px', verticalAlign: 'middle' }}>
                              NEW
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
                          {item.summary.slice(0, 95)}...
                        </div>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: '#334155' }}>
                        {item.issuingOfficer || 'AICTE Headquarters, New Delhi'}
                      </td>
                      <td>
                        <span className={isUrgent ? 'badge badge-pink' : 'badge badge-violet'} style={{ fontSize: '0.68rem' }}>
                          {item.priority}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button 
                            className="btn-outline"
                            onClick={() => handleOpenDetail(item)}
                            style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                            title="View Circular Details"
                          >
                            <Eye size={13} /> {t.viewCircular}
                          </button>
                          <button 
                            className="btn-secondary"
                            onClick={() => triggerFileDownload(
                              `${item.refNumber.replace(/[\/\\?%*:|"<>]/g, '_')}.pdf`,
                              item.title,
                              'All Affiliated Technical Students',
                              'CIRCULAR-NATIONAL',
                              item.refNumber,
                              item.authority || 'Ministry of Education & AICTE',
                              item.content
                            )}
                            style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                            title="Download Official PDF"
                          >
                            <Download size={13} /> {t.downloadPdf}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Circular Gazette Modal */}
      {activeModalNotification && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '720px' }}>
            <div style={{ padding: '24px 28px', borderBottom: '2px solid #0f172a', background: '#ffffff', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6d28d9', letterSpacing: '0.05em' }}>
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
              </div>
              <div style={{ fontSize: '0.72rem', color: '#475569' }}>
                (A Statutory Body of the Government of India) • Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '10px 0 4px', textTransform: 'uppercase' }}>
                OFFICIAL NOTIFICATION / CIRCULAR
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                <span><strong>Ref No:</strong> <code>{activeModalNotification.refNumber}</code></span>
                <span><strong>Date:</strong> {activeModalNotification.date}</span>
              </div>
            </div>

            <div className="modal-body" style={{ padding: '24px 28px' }}>
              <div style={{ marginBottom: '14px', fontSize: '0.84rem', color: '#1e293b' }}>
                <strong>To:</strong><br />
                The Principals / Directors of all AICTE Approved Institutions,<br />
                Autonomous Colleges & Affiliated Universities (including Anna University, Chennai).
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderLeft: '4px solid #6d28d9', marginBottom: '16px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#1e1b4b' }}>
                  SUBJECT: {activeModalNotification.title}
                </strong>
              </div>

              <div style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.7, marginBottom: '20px' }}>
                <p style={{ marginBottom: '12px' }}>
                  Sir / Madam,
                </p>
                <p style={{ marginBottom: '12px' }}>
                  {activeModalNotification.summary}
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Under the directives of the National Education Policy (NEP 2020) and the Academic Bank of Credits (ABC) regulations, seamless mobility and multi-disciplinary academic pursuits require universal integration of the 12-digit APAAR ID for technical degree candidates.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                    ✓ Digitally Signed & Approved
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', marginTop: '4px' }}>
                    {activeModalNotification.issuingOfficer || 'Member Secretary, AICTE'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    All India Council for Technical Education, New Delhi
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModalNotification(null)}>
                Close
              </button>
              <button className="btn-primary" onClick={() => triggerFileDownload(
                `${activeModalNotification.refNumber.replace(/[\/\\?%*:|"<>]/g, '_')}.pdf`,
                activeModalNotification.title,
                'All Affiliated Technical Students',
                'CIRCULAR-NATIONAL',
                activeModalNotification.refNumber,
                activeModalNotification.authority || 'Ministry of Education & AICTE',
                activeModalNotification.content
              )}>
                <Download size={14} /> Download Official PDF Circular
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
