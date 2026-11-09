import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { studentProfileData } from '../data/mockData';

export default function Header({ studentData, onLogout, setActiveTab, currentLang, setCurrentLang, t }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const activeStudent = studentData || studentProfileData;
  const student = activeStudent.personal;
  const academic = activeStudent.academic;

  return (
    <header className="header-root">
      {/* Tri-color Top Indian Ribbon */}
      <div className="gov-tricolor-strip"></div>

      {/* Top Gov Info Bar */}
      <div className="gov-top-bar">
        <div className="gov-top-bar-inner">
          <div className="gov-top-links">
            <span style={{ fontWeight: 700 }}>{t.govIndia}</span>
            <span>•</span>
            <span>{t.moeAicte}</span>
            <span>•</span>
            <span>{t.autonomousCollege}</span>
          </div>

          <div className="gov-top-links">
            <span className="brand-tag-pink" style={{ fontSize: '0.65rem' }}>
              {t.nepTag}
            </span>
            
            {/* Real Working 3-Language Selector (English, Tamil, Hindi) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', padding: '2px 8px', borderRadius: '6px' }}>
              <Globe size={14} color="#93c5fd" />
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  color: '#ffffff', 
                  border: 'none', 
                  fontSize: '0.8rem', 
                  fontWeight: 700,
                  cursor: 'pointer',
                  outline: 'none'
                }}
                aria-label="Language Selector"
              >
                <option value="en" style={{ color: '#000', fontWeight: 600 }}>English</option>
                <option value="ta" style={{ color: '#000', fontWeight: 600 }}>தமிழ் (Tamil)</option>
                <option value="hi" style={{ color: '#000', fontWeight: 600 }}>हिन्दी (Hindi)</option>
              </select>
            </div>

            <span>|</span>
            <button 
              onClick={onLogout}
              style={{ background: 'transparent', color: '#fca5a5', border: 'none', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
              title="Sign Out from Portal"
            >
              <LogOut size={13} /> {t.signOut}
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="portal-header">
        <div className="portal-header-inner">
          <div className="brand-section">
            <div className="emblem-wrapper">
              <ShieldCheck size={32} />
            </div>

            <div className="brand-text">
              <h1>
                APAAR PORTAL
                <span className="brand-tag-pink">AICTE APPROVED</span>
              </h1>
              <p className="brand-subtitle">
                {t.portalSubtitle}
              </p>
            </div>
          </div>

          {/* Student Profile Quick Badge (NO PHOTO - Clean Initials Badge) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div 
              className="header-user-badge"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255, 255, 255, 0.4)'
              }}>
                RK
              </div>

              <div className="user-info-text">
                <div className="user-name">{student.fullName}</div>
                <div className="user-apar-id">APAAR: {academic.apaarId}</div>
              </div>
              <ChevronDown size={16} color="#fbcfe8" />

              {/* User Dropdown */}
              {showUserDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '270px',
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: '12px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                  padding: '14px',
                  zIndex: 100,
                  border: '1px solid #ddd6fe',
                  textAlign: 'left'
                }}>
                  <div style={{ paddingBottom: '10px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#3b0764' }}>{student.fullName}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Register No: {academic.registerNo}</div>
                    <div style={{ fontSize: '0.74rem', color: '#db2777', fontWeight: 600, marginTop: '2px' }}>{academic.collegeShort}</div>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('profile'); setShowUserDropdown(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px', background: 'transparent', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}
                  >
                    {t.navProfile}
                  </button>
                  <button 
                    onClick={() => { setActiveTab('verification'); setShowUserDropdown(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px', background: 'transparent', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}
                  >
                    {t.navVerification}
                  </button>
                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '6px', paddingTop: '8px' }}>
                    <button 
                      onClick={onLogout}
                      style={{ width: '100%', textAlign: 'left', padding: '8px', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <LogOut size={14} /> {t.signOut}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
