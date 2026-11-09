import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  QrCode,
  Building2,
  Calendar,
  Hash
} from 'lucide-react';
import { triggerFileDownload } from '../utils/documentHelper';

export default function DocumentViewerModal({ doc, student, onClose }) {
  if (!doc) return null;

  const studentName = student?.personal?.fullName || student?.name || 'R. Karthik';
  const apaarId = student?.academic?.apaarId || student?.apaarId || '4829-1058-3921';
  const regNo = student?.academic?.registerNo || student?.registerNo || '713522104084';
  const college = student?.academic?.collegeName || student?.college || 'Sri Krishna College of Engineering and Technology, Coimbatore';

  const handleDownload = () => {
    triggerFileDownload(
      doc.fileName || `${doc.title}.pdf`,
      doc.title,
      studentName,
      apaarId,
      regNo,
      college,
      doc.adminRemarks || doc.category
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-card" style={{ maxWidth: '820px', width: '95%', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modal Header */}
        <div className="modal-header" style={{ background: '#1e3a8a', color: '#ffffff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="#93c5fd" />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                {doc.title || doc.fileName}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#bfdbfe' }}>
                National Academic Depository (NAD) Official Verified PDF Record
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              type="button" 
              onClick={handlePrint}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Print Document"
            >
              <Printer size={14} /> Print
            </button>
            <button 
              type="button" 
              onClick={handleDownload}
              style={{
                background: '#2563eb',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Download PDF"
            >
              <Download size={14} /> Download PDF
            </button>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '4px 8px',
                marginLeft: '4px'
              }}
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body: Authentic PDF Document View */}
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f1f5f9' }}>
          
          {doc.fileUrl ? (
            <div style={{ background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
              {doc.fileName?.endsWith('.pdf') ? (
                <iframe src={doc.fileUrl} title={doc.title} style={{ width: '100%', height: '550px', border: 'none' }} />
              ) : (
                <img src={doc.fileUrl} alt={doc.title} style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }} />
              )}
            </div>
          ) : (
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '36px 32px',
              maxWidth: '720px',
              margin: '0 auto',
              color: '#0f172a',
              position: 'relative'
            }}>
              
              {/* Document Letterhead */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #1e3a8a', paddingBottom: '16px', marginBottom: '22px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '3px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <ShieldCheck size={14} /> Government of India • Ministry of Education & AICTE
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '4px 0', textTransform: 'uppercase' }}>
                  {doc.title}
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                  Automated Permanent Academic Account Registry (APAAR) • National Academic Depository
                </div>
              </div>

              {/* Watermark badge */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official 12-Digit APAAR ID
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a', letterSpacing: '0.08em' }}>
                    {apaarId}
                  </div>
                </div>
                <span className="badge badge-verified" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  <CheckCircle2 size={14} /> Cryptographically Authenticated via DigiLocker
                </span>
              </div>

              {/* Document Candidate Metadata */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '0.84rem',
                marginBottom: '20px'
              }}>
                <div>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Candidate Name:</span>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.92rem' }}>{studentName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Roll / Register No:</span>
                  <strong style={{ display: 'block', color: '#0f172a', fontFamily: 'monospace' }}>{regNo}</strong>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Institution / College:</span>
                  <strong style={{ display: 'block', color: '#0f172a' }}>{college}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Document Category:</span>
                  <div style={{ color: '#1e40af', fontWeight: 600 }}>{doc.category || 'Identity & Consent'}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Submission Date:</span>
                  <div style={{ color: '#0f172a', fontWeight: 600 }}>{doc.uploadedDate || '14-Sep-2023'}</div>
                </div>
                <div style={{ gridColumn: 'span 2', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Admin Verification Notes:</span>
                  <div style={{ color: '#334155', marginTop: '2px' }}>{doc.adminRemarks || 'Document verified and stored in central academic vault.'}</div>
                </div>
              </div>

              {/* Security validation footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px dashed #cbd5e1',
                paddingTop: '16px',
                marginTop: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <QrCode size={44} color="#1e3a8a" />
                  <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.3 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>QR Security Hash Verified</div>
                    <div>Token: DL-UIDAI-2024-8841</div>
                    <div style={{ color: '#059669', fontWeight: 600 }}>Status: Authenticated Record</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.78rem' }}>
                  <div style={{ color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <CheckCircle2 size={13} /> Digitally Signed
                  </div>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>Controller of Examinations</div>
                  <div style={{ color: '#64748b', fontSize: '0.72rem' }}>AICTE & Academic Depository</div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ padding: '12px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            File: <strong>{doc.fileName || `${doc.title}.pdf`}</strong> ({doc.fileSize || '1.4 MB'})
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: '7px 16px', fontSize: '0.82rem' }}>
              Close
            </button>
            <button type="button" className="btn-primary" onClick={handleDownload} style={{ padding: '7px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={14} /> Download Document
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
