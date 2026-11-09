import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  AlertTriangle, 
  Printer, 
  Copy, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  QrCode, 
  ArrowUpRight,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { studentProfileData } from '../data/mockData';

export default function Dashboard({ studentData, setActiveTab, documents, notifications, t }) {
  const [copied, setCopied] = useState(false);
  const activeStudent = studentData || studentProfileData;
  const student = activeStudent.personal;
  const academic = activeStudent.academic;
  const verification = activeStudent.verification;

  const handleCopyApar = () => {
    navigator.clipboard.writeText(academic.apaarId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pendingDocs = documents.filter(d => d.status === 'Action Required');

  return (
    <div className="dashboard-root">
      
      {/* Institutional Student Header Banner */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #ddd6fe',
        borderLeft: '5px solid #6d28d9',
        borderRadius: '10px',
        padding: '18px 24px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.72rem', background: '#f5f3ff', color: '#6d28d9', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
                {t.dashBatch}
              </span>
              <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#065f46', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                <CheckCircle2 size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {t.dashKycActive}
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1e1b4b', margin: '4px 0' }}>
              {t.dashTitle}: {student.fullName}
            </h2>
            <div style={{ fontSize: '0.84rem', color: '#475569' }}>
              {t.regNo}: <strong>{academic.registerNo}</strong> • {t.dept}: <strong>{academic.department}</strong> • {academic.collegeShort}
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#64748b' }}>
            <div>{t.acadYear}: <strong>{academic.academicYear}</strong></div>
            <div>{t.currentTerm}: <strong>{academic.currentYear} ({academic.currentSemester})</strong></div>
            <div>{t.permAicteId}: <strong>{academic.aictePermanentId}</strong></div>
          </div>
        </div>
      </div>

      {/* Admin Notice Callout */}
      {pendingDocs.length > 0 && (
        <div className="admin-alert-banner">
          <div className="admin-alert-content">
            <div className="admin-alert-icon">
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 800, color: '#be185d', fontSize: '0.88rem' }}>
                  {t.urgentNotice}
                </span>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Deadline: 15-Nov-2024</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569' }}>
                {t.urgentNoticeDesc}
              </p>
            </div>
          </div>
          <button 
            className="btn-pink"
            onClick={() => setActiveTab('upload')}
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
          >
            {t.uploadNow} <ArrowUpRight size={14} />
          </button>
        </div>
      )}

      {/* Standard Academic Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-violet">
            <ShieldCheck size={22} />
          </div>
          <div className="stat-details">
            <div className="stat-label">{t.statAparStatus}</div>
            <div className="stat-value" style={{ color: '#059669', fontSize: '1.2rem' }}>
              {t.statVerified}
            </div>
            <div className="stat-sub">
              {t.statNodalStamped}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-pink">
            <Award size={22} />
          </div>
          <div className="stat-details">
            <div className="stat-label">{t.statAbcCredits}</div>
            <div className="stat-value" style={{ color: '#db2777' }}>
              {academic.creditsCompleted} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>/ 165</span>
            </div>
            <div className="stat-sub">
              CGPA: <strong>{academic.cgpa}</strong> / 10.0
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-amber">
            <FileText size={22} />
          </div>
          <div className="stat-details">
            <div className="stat-label">{t.statPendingDoc}</div>
            <div className="stat-value" style={{ color: '#d97706' }}>
              {pendingDocs.length} Record
            </div>
            <div className="stat-sub">
              Semester 5 Mark Sheet
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-green">
            <RefreshCw size={22} />
          </div>
          <div className="stat-details">
            <div className="stat-label">{t.statDedupScan}</div>
            <div className="stat-value" style={{ color: '#0f172a', fontSize: '1.15rem' }}>
              {t.statZeroConflict}
            </div>
            <div className="stat-sub" style={{ color: '#059669', fontWeight: 600 }}>
              {t.statTnMerged}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Official APAAR ID Digital Card (TOP) */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <ShieldCheck size={18} color="#6d28d9" />
            {t.cardTitle}
          </div>
          <span className="badge badge-verified">
            <CheckCircle2 size={12} /> {t.cardActiveBadge}
          </span>
        </div>

        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <div className="apar-card-official" id="printable-apar-card">
            
            {/* Header */}
            <div className="apar-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fbcfe8'
                }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {t.cardHeading}
                  </h3>
                  <p style={{ fontSize: '0.7rem', color: '#ddd6fe' }}>{t.cardGovtIndia}</p>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #d97706 100%)',
                width: '40px',
                height: '30px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.62rem',
                fontWeight: 800,
                color: '#78350f'
              }}>
                {t.chip}
              </div>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
              <div className="photo-placeholder-box">
                <UserCheck size={36} color="#c4b5fd" />
                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#fbcfe8', marginTop: '6px', lineHeight: 1.2 }}>
                  {t.photoKycVerified}
                </span>
                <span style={{ fontSize: '0.58rem', color: '#ddd6fe', marginTop: '2px' }}>
                  {t.photoNone}
                </span>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                  {student.fullName}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#fbcfe8', fontWeight: 600 }}>
                  {t.regNo}: <strong>{academic.registerNo}</strong> • Roll: {academic.rollNo}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#ddd6fe', marginTop: '2px' }}>
                  {t.program}: <strong>{academic.degree}</strong>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#ddd6fe', marginTop: '2px' }}>
                  {t.institution}: <strong>{academic.collegeShort} (Code: {academic.annaUnivCode})</strong>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#ddd6fe', marginTop: '2px' }}>
                  {t.dob}: <strong>{student.dob}</strong> • {t.bloodGroup}: <strong>{student.bloodGroup}</strong>
                </div>

                {/* 12 Digit Number */}
                <div className="apar-number-box">
                  <div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#fbcfe8', fontWeight: 700 }}>
                      {t.apar12Digit}
                    </div>
                    <div className="apar-number-value">{academic.apaarId}</div>
                  </div>
                  <button 
                    onClick={handleCopyApar}
                    style={{ background: 'rgba(255,255,255,0.18)', padding: '5px 8px', borderRadius: '6px', color: '#fff', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copied ? <Check size={13} color="#a7f3d0" /> : <Copy size={13} />}
                    {copied ? t.copiedBtn : t.copyBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '12px' }}>
              <div style={{ fontSize: '0.68rem', color: '#cbd5e1', maxWidth: '380px', lineHeight: 1.3 }}>
                {t.cardLegalNote} <strong>{academic.abcId}</strong>
              </div>
              <div style={{ background: '#ffffff', padding: '4px', borderRadius: '6px' }}>
                <QrCode size={40} color="#2e1065" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => window.print()} style={{ fontSize: '0.82rem', padding: '7px 14px' }}>
              <Printer size={14} /> {t.printCard}
            </button>
            <button className="btn-outline-pink" onClick={handleCopyApar} style={{ fontSize: '0.82rem', padding: '7px 14px' }}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t.copiedBtn : t.copy12Digit}
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('profile')} style={{ fontSize: '0.82rem', padding: '7px 14px' }}>
              {t.viewProfileSheet}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Multi-Tier Verification Process (BELOW THE APAAR CARD) */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <UserCheck size={18} color="#059669" />
            {t.vertRoadmapTitle}
          </div>
          <button 
            onClick={() => setActiveTab('verification')}
            className="btn-outline" 
            style={{ padding: '4px 10px', fontSize: '0.76rem' }}
          >
            {t.openVerificationTab} <ChevronRight size={13} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {verification.steps.map((step) => (
            <div 
              key={step.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#faf5ff',
                border: '1px solid #ddd6fe',
                borderRadius: '8px',
                padding: '12px 16px'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#059669',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                ✓
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#1e1b4b' }}>
                    {step.title}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    Completed: {step.date}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '1px' }}>
                  {step.desc}
                </div>
              </div>

              <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>{t.statVerified}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '14px',
          padding: '10px 14px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          fontSize: '0.78rem',
          color: '#475569',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <span><strong>College Nodal Officer:</strong> {verification.nodalOfficer}</span>
          <span><strong>De-Duplication Status:</strong> {t.statZeroConflict} ({t.statTnMerged})</span>
        </div>
      </div>

    </div>
  );
}
