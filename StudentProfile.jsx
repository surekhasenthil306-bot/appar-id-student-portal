import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  CheckCircle2, 
  Edit3, 
  Copy, 
  Check, 
  FileText, 
  Save, 
  X,
  Download,
  Building2,
  GraduationCap,
  User,
  MapPin,
  ShieldCheck,
  QrCode,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  Award
} from 'lucide-react';
import { studentProfileData } from '../data/mockData';
import { triggerFileDownload } from '../utils/documentHelper';

export default function StudentProfile({ studentData, t }) {
  // Use passed studentData or fall back to default
  const activeData = studentData || studentProfileData;

  // localStorage key is unique per student (using APAAR ID)
  const storageKey = `apaar_student_${activeData.academic.apaarId}`;

  const [copiedId, setCopiedId] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load from localStorage if available, else use the passed data
  const getInitialPersonal = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return { ...activeData.personal, ...JSON.parse(saved) };
    } catch (_) {}
    return { ...activeData.personal };
  };

  // Editable Student State
  const [student, setStudent] = useState(getInitialPersonal);
  const [draft, setDraft] = useState(getInitialPersonal);

  // Update when studentData prop changes (e.g. on different login)
  useEffect(() => {
    const loaded = getInitialPersonal();
    setStudent(loaded);
    setDraft(loaded);
  }, [studentData]);

  const academic = activeData.academic;
  const verification = activeData.verification;

  const handleCopy = () => {
    navigator.clipboard.writeText(academic.apaarId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCard = () => {
    triggerFileDownload(
      `APAAR_Card_${academic.apaarId}.pdf`,
      'Official APAAR Student Card & Academic Record',
      student.fullName,
      academic.apaarId,
      academic.registerNo,
      academic.collegeName,
      `Degree: ${academic.degree} | Dept: ${academic.department} | CGPA: ${academic.cgpa} | ABC Credits: ${academic.creditsCompleted}`
    );
  };

  const handleOpenEdit = () => {
    setDraft({ ...student });
    setIsEditModalOpen(true);
    setSuccessMessage('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setStudent({ ...draft });
    // Persist changes permanently in localStorage
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
    } catch (_) {}
    setIsEditModalOpen(false);
    setSuccessMessage('Student Profile updated successfully! All changes saved permanently.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '30px' }}>
      
      {/* Top Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#faf5ff', color: '#6d28d9', padding: '8px', borderRadius: '10px', display: 'flex', border: '1px solid #ddd6fe' }}>
              <User size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
                {t?.profileSheetTitle || 'Student Academic Profile'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '2px 0 0 0' }}>
                Permanent Academic Account Registry • Ministry of Education & AICTE
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            type="button"
            className="btn-pink"
            onClick={handleDownloadCard}
          >
            <Download size={15} /> Download APAAR Card (PDF)
          </button>

          <button 
            type="button"
            className="btn-primary"
            onClick={handleOpenEdit}
          >
            <Edit3 size={15} /> Edit Profile
          </button>

          <button 
            type="button"
            className="btn-outline"
            onClick={handlePrint}
          >
            <Printer size={15} /> Print
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: 600,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} /> {successMessage}
        </div>
      )}

      {/* Hero Student Banner (Violet, Pink & White Theme) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #ddd6fe',
        borderRadius: '14px',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: '0 4px 15px rgba(109, 40, 217, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Student Avatar */}
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.6rem',
            border: '2px solid #f472b6',
            boxShadow: '0 4px 12px rgba(109, 40, 217, 0.25)',
            flexShrink: 0
          }}>
            {student.fullName ? student.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'ST'}
            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.04em', color: '#fbcfe8' }}>
              KYC OK
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
                {student.fullName}
              </h1>
              <span className="badge badge-verified" style={{ padding: '4px 12px', fontSize: '0.74rem' }}>
                <CheckCircle2 size={13} /> {verification.overallStatus} Active
              </span>
            </div>

            <div style={{ color: '#6d28d9', fontSize: '0.88rem', marginTop: '4px', fontWeight: 600 }}>
              {academic.degree} • {academic.department}
            </div>

            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={14} color="#ec4899" /> {academic.collegeName} ({academic.collegeCode})
            </div>
          </div>
        </div>

        {/* 12-Digit APAAR Chip Box */}
        <div style={{
          background: '#faf5ff',
          border: '1.5px dashed #7c3aed',
          borderRadius: '10px',
          padding: '14px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6d28d9', fontWeight: 800 }}>
              Official APAAR Identifier
            </span>
            <button 
              type="button"
              onClick={handleCopy}
              className="btn-outline"
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '3px 8px'
              }}
              title="Copy APAAR ID"
            >
              {copiedId ? <Check size={12} color="#059669" /> : <Copy size={12} />}
              {copiedId ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '1.35rem', fontWeight: 800, color: '#2e1065', letterSpacing: '0.08em' }}>
            {academic.apaarId}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={12} /> Seeded with UIDAI Aadhaar e-KYC
          </div>
        </div>
      </div>

      {/* Main Grid: 4 Organized Information Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* SECTION 1: ACADEMIC DETAILS */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #ddd6fe',
          borderRadius: '12px',
          padding: '22px',
          boxShadow: '0 2px 8px rgba(109, 40, 217, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #ede9fe', paddingBottom: '12px', marginBottom: '16px' }}>
            <GraduationCap size={20} color="#6d28d9" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
              Academic & Institutional Registry
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Roll Number:</span>
              <strong style={{ fontFamily: 'monospace', color: '#1e1b4b' }}>{academic.rollNo}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>University Register No:</span>
              <strong style={{ fontFamily: 'monospace', color: '#6d28d9' }}>{academic.registerNo}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>College Code:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{academic.collegeCode} (Code: {academic.annaUnivCode})</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Degree / Programme:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b', textAlign: 'right' }}>{academic.degree}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Current Semester:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{academic.currentYear} • {academic.currentSemester}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Cumulative GPA:</span>
              <strong style={{ color: '#6d28d9', fontSize: '0.94rem' }}>{academic.cgpa} / 10.00</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>ABC Credit Ledger:</span>
              <span style={{ fontWeight: 700, color: '#db2777' }}>{academic.abcId} ({academic.creditsCompleted} Credits)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>AICTE Permanent ID:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e1b4b' }}>{academic.aictePermanentId}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Admission Quota:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{academic.admissionType}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: PERSONAL & DEMOGRAPHIC DETAILS */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #ddd6fe',
          borderRadius: '12px',
          padding: '22px',
          boxShadow: '0 2px 8px rgba(109, 40, 217, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #ede9fe', paddingBottom: '12px', marginBottom: '16px' }}>
            <User size={20} color="#ec4899" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
              Personal & Demographic Profile
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Father's Name:</span>
              <strong style={{ color: '#1e1b4b' }}>{student.fatherName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Mother's Name:</span>
              <strong style={{ color: '#1e1b4b' }}>{student.motherName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Date of Birth:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.dob}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Gender:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.gender}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Blood Group:</span>
              <strong style={{ color: '#db2777' }}>{student.bloodGroup}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Community / Category:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.community} ({student.category})</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Nationality:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.nationality}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Mother Tongue:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.motherTongue}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Masked Aadhaar Token:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#6d28d9' }}>{student.aadhaarNumberMasked}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: COMMUNICATION & RESIDENCE */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #ddd6fe',
          borderRadius: '12px',
          padding: '22px',
          boxShadow: '0 2px 8px rgba(109, 40, 217, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #ede9fe', paddingBottom: '12px', marginBottom: '16px' }}>
            <MapPin size={20} color="#6d28d9" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
              Communication & Residential Records
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Student Mobile:</span>
              <strong style={{ fontFamily: 'monospace', color: '#1e1b4b' }}>{student.mobile}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Parent / Guardian Mobile:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e1b4b' }}>{student.guardianMobile}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Institutional Email:</span>
              <span style={{ fontFamily: 'monospace', color: '#6d28d9', fontWeight: 700 }}>{student.email}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Personal Email:</span>
              <span style={{ fontFamily: 'monospace', color: '#475569' }}>{student.alternateEmail}</span>
            </div>

            <div style={{ borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Permanent Address:</span>
              <div style={{ fontWeight: 600, color: '#1e1b4b', lineHeight: 1.4 }}>{student.permanentAddress}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>District & State:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.district}, {student.domicileState} (PIN: {student.pincode})</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: INSTITUTIONAL ENDORSEMENT */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #ddd6fe',
          borderRadius: '12px',
          padding: '22px',
          boxShadow: '0 2px 8px rgba(109, 40, 217, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #ede9fe', paddingBottom: '12px', marginBottom: '16px' }}>
            <ShieldCheck size={20} color="#059669" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2e1065', margin: 0 }}>
              Official Verification & Endorsement
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Verification Status:</span>
              <span style={{ color: '#059669', fontWeight: 700 }}>✓ Officially Attested</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Issuance Date:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{verification.issuedDate}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Faculty Advisor:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{academic.mentorFaculty}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Head of Department:</span>
              <span style={{ fontWeight: 600, color: '#1e1b4b' }}>{academic.hodName}</span>
            </div>

            <div style={{ borderBottom: '1px solid #faf5ff', paddingBottom: '6px' }}>
              <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>AICTE Nodal Officer:</span>
              <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{verification.nodalOfficer}</div>
            </div>

            <div style={{ background: '#faf5ff', padding: '10px 14px', borderRadius: '8px', border: '1px dashed #ddd6fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#6d28d9', textTransform: 'uppercase', fontWeight: 800 }}>
                  Cryptographic Token
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#2e1065', fontWeight: 700 }}>
                  NAD-SKCET-2024-8841
                </div>
              </div>
              <QrCode size={30} color="#6d28d9" />
            </div>
          </div>
        </div>

      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '680px' }}>
            <div className="modal-header" style={{ background: '#0f2b5c', color: '#ffffff' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={18} /> Edit Profile Details
              </h3>
              <button 
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                style={{ background: 'transparent', color: '#ffffff', fontSize: '1.2rem', padding: '4px', border: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto', padding: '20px' }}>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.82rem', color: '#1e40af' }}>
                  Note: Academic parameters (APAAR ID, Register No, CGPA) are verified with Anna University & AICTE and cannot be manually edited. Personal contact details may be updated.
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Candidate Full Name:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.fullName}
                      onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Father's Name:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.fatherName}
                      onChange={(e) => setDraft({ ...draft, fatherName: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Mother's Name:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.motherName}
                      onChange={(e) => setDraft({ ...draft, motherName: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Date of Birth:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.dob}
                      onChange={(e) => setDraft({ ...draft, dob: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Gender:
                    </label>
                    <select 
                      value={draft.gender}
                      onChange={(e) => setDraft({ ...draft, gender: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Blood Group:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.bloodGroup}
                      onChange={(e) => setDraft({ ...draft, bloodGroup: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Student Mobile:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.mobile}
                      onChange={(e) => setDraft({ ...draft, mobile: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Personal Email:
                    </label>
                    <input 
                      type="email"
                      required
                      value={draft.alternateEmail}
                      onChange={(e) => setDraft({ ...draft, alternateEmail: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Permanent Address:
                  </label>
                  <textarea 
                    rows={2}
                    required
                    value={draft.permanentAddress}
                    onChange={(e) => setDraft({ ...draft, permanentAddress: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      District:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.district}
                      onChange={(e) => setDraft({ ...draft, district: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Pincode:
                    </label>
                    <input 
                      type="text"
                      required
                      value={draft.pincode}
                      onChange={(e) => setDraft({ ...draft, pincode: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <X size={15} /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
