import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  UploadCloud, 
  BellRing, 
  ShieldAlert, 
  FileSpreadsheet, 
  HelpCircle,
  LogOut,
  School,
  CheckCircle2
} from 'lucide-react';
import { studentProfileData } from '../data/mockData';

export default function Navbar({ studentData, activeTab, setActiveTab, unreadNotificationsCount, pendingDocsCount, onLogout, t }) {
  const activeStudent = studentData || studentProfileData;
  const academic = activeStudent.academic;
  const student = activeStudent.personal;

  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'profile', label: t.navProfile, icon: UserCheck },
    { 
      id: 'upload', 
      label: t.navUpload, 
      icon: UploadCloud, 
      badge: pendingDocsCount > 0 ? pendingDocsCount : null,
      badgeType: 'pink'
    },
    { 
      id: 'notifications', 
      label: t.navNotifications, 
      icon: BellRing, 
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
      badgeType: 'amber'
    },
    { id: 'verification', label: t.navVerification, icon: ShieldAlert },
    { id: 'reports', label: t.navReports, icon: FileSpreadsheet },
    { id: 'help', label: t.navHelp, icon: HelpCircle },
  ];

  return (
    <aside className="portal-sidebar-vertical">
      {/* College Info Box */}
      <div className="sidebar-college-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <School size={16} color="#ec4899" />
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#fbcfe8', fontWeight: 800 }}>
            {t.collegeAffiliation}
          </span>
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>
          SKCET Coimbatore
        </div>
        <div style={{ fontSize: '0.7rem', color: '#c4b5fd', marginTop: '2px' }}>
          Anna Univ Code: <strong>7135</strong> • AICTE
        </div>
      </div>

      {/* Vertical Navigation Links */}
      <div className="sidebar-nav-links">
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', padding: '0 12px 6px', fontWeight: 800 }}>
          {t.mainNav}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Icon size={18} />
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && (
                <span className={item.badgeType === 'pink' ? 'nav-badge-pink' : 'nav-badge-amber'}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Student Details Mini Card in Sidebar */}
      <div className="sidebar-student-summary">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#6d28d9',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            RK
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e1b4b' }}>{student.fullName}</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Reg: {academic.registerNo}</div>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
          <div><strong>Branch:</strong> B.E. CSE (3rd Year)</div>
          <div style={{ color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <CheckCircle2 size={12} /> Aadhaar e-KYC
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="sidebar-logout-btn"
        >
          <LogOut size={14} /> {t.signOut}
        </button>
      </div>
    </aside>
  );
}
