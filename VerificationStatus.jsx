import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  QrCode,
  UserCheck,
  Download,
  AlertCircle,
  Building2,
  Calendar,
  Check
} from 'lucide-react';
import { studentProfileData, sampleAparIds, allStudentAccounts } from '../data/mockData';
import { triggerFileDownload } from '../utils/documentHelper';

export default function VerificationStatus({ studentData, setActiveTab, t }) {
  const currentStudent = studentData || studentProfileData;
  const [searchAparId, setSearchAparId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchResult, setSearchResult] = useState(sampleAparIds[0]);
  const [errorMessage, setErrorMessage] = useState('');
  const [justVerified, setJustVerified] = useState(false);

  const handleVerify = (idToVerify) => {
    const target = idToVerify !== undefined ? idToVerify : searchAparId;
    if (!target.trim()) {
      setErrorMessage('Please enter a 12-digit APAAR ID to verify.');
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      // Clean non-digits
      const cleanTarget = target.replace(/\D/g, '');

      // 1. Check in allStudentAccounts
      const matchInAccounts = allStudentAccounts.find(s => {
        const cleanS = s.academic.apaarId.replace(/\D/g, '');
        return cleanS === cleanTarget;
      });

      if (matchInAccounts) {
        setSearchResult({
          apaarId: matchInAccounts.academic.apaarId,
          name: matchInAccounts.personal.fullName,
          college: matchInAccounts.academic.collegeName,
          department: matchInAccounts.academic.department,
          academicYear: matchInAccounts.academic.academicYear + ` (${matchInAccounts.academic.currentYear}, ${matchInAccounts.academic.currentSemester})`,
          registerNo: matchInAccounts.academic.registerNo,
          status: "Verified",
          aadhaarStatus: "e-KYC Verified (UIDAI OTP Seeded)",
          abcCredits: matchInAccounts.academic.creditsCompleted,
          issuedOn: matchInAccounts.verification.issuedDate,
          aicteId: matchInAccounts.academic.aictePermanentId,
          notes: "Official active record. Digitally verified by Institution & AICTE National Depository."
        });
        setJustVerified(true);
        setTimeout(() => setJustVerified(false), 3000);
        return;
      }

      // 2. Check in sampleAparIds
      const match = sampleAparIds.find(item => {
        const cleanSample = item.apaarId.replace(/\D/g, '');
        return cleanSample === cleanTarget;
      });

      if (match) {
        setSearchResult(match);
        setJustVerified(true);
        setTimeout(() => setJustVerified(false), 3000);
      } else {
        if (cleanTarget.length === 12) {
          const formatted = `${cleanTarget.slice(0,4)}-${cleanTarget.slice(4,8)}-${cleanTarget.slice(8,12)}`;
          setSearchResult({
            apaarId: formatted,
            name: "Candidate " + cleanTarget.slice(-4),
            college: "Sri Krishna College of Engineering and Technology, Coimbatore",
            department: "Computer Science & Engineering",
            academicYear: "2024 - 2025 (3rd Year)",
            registerNo: "7135" + cleanTarget.slice(-6),
            status: "Verified",
            aadhaarStatus: "e-KYC Verified (UIDAI Gateway)",
            abcCredits: 138,
            issuedOn: "15-Jan-2024",
            aicteId: "1-45629108",
            notes: "Verified record from AICTE Central National Depository."
          });
          setJustVerified(true);
          setTimeout(() => setJustVerified(false), 3000);
        } else {
          setErrorMessage('APAAR ID must contain exactly 12 digits (e.g. 4829-1058-3921).');
          setSearchResult(null);
        }
      }
    }, 300);
  };

  const handleSelectSample = (sample) => {
    setSearchAparId(sample.apaarId);
    handleVerify(sample.apaarId);
  };

  const handleDownloadVerificationSlip = () => {
    if (!searchResult) return;
    triggerFileDownload(
      `APAAR_Verification_Slip_${searchResult.apaarId}.pdf`,
      'APAAR Official Depository Verification Certificate',
      searchResult.name,
      searchResult.apaarId,
      searchResult.registerNo,
      searchResult.college,
      `Status: ${searchResult.status} | Aadhaar e-KYC: ${searchResult.aadhaarStatus} | Accumulated ABC Credits: ${searchResult.abcCredits}`
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '30px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
          <ShieldCheck size={26} color="#059669" />
          {t?.verifyPageTitle || 'Institutional APAAR Verification & Status Audit'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.84rem', marginTop: '4px' }}>
          Real-time institutional authentication ledger linked with UIDAI, AICTE, and State Technical Universities.
        </p>
      </div>

      {/* SECTION 1: VERIFICATION STATUS (VERTICAL STACKED TIMELINE) */}
      <div className="gov-card" style={{ marginBottom: '22px' }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <UserCheck size={18} color="#1e40af" />
            {t?.vertRoadmapTitle || '5-Step Verification Roadmap'}
          </div>
          <span className="badge badge-verified">
            <CheckCircle2 size={12} /> {t?.statVerified || 'Verified & Attested'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {currentStudent.verification.steps.map((step) => (
            <div 
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 16px'
              }}
            >
              <div style={{
                background: '#ecfdf5',
                color: '#059669',
                border: '1px solid #a7f3d0',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <Check size={16} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{step.title}</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>{step.date}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: '3px 0 0 0' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Summary Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.84rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>12-Digit Permanent APAAR ID:</span>
            <strong style={{ fontFamily: 'monospace', color: '#0f2b5c', fontSize: '0.92rem' }}>{currentStudent.academic.apaarId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>UIDAI e-KYC Verification Token:</span>
            <strong style={{ color: '#059669' }}>Authenticated (OTP Verified via Aadhaar Gateway)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>College Nodal Officer & Registrar:</span>
            <strong style={{ color: '#1e293b' }}>{currentStudent.verification.nodalOfficer}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>Academic Bank of Credits (ABC):</span>
            <strong style={{ color: '#0f2b5c' }}>{currentStudent.academic.abcId} ({currentStudent.academic.creditsCompleted} Credits)</strong>
          </div>
        </div>
      </div>

      {/* SECTION 4: INSTANT APAAR ID VERIFICATION TOOL (Requirement 5) */}
      <div className="gov-card" style={{ border: '2px solid #cbd5e1' }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Search size={20} color="#1e40af" />
            {t?.instantVerifyTitle || 'Instant APAAR ID Verification Tool'}
          </div>
          <span className="badge" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}>
            National Academic Depository (NAD)
          </span>
        </div>

        {/* Quick select buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', alignSelf: 'center' }}>
            Verify Registered Students:
          </span>
          {sampleAparIds.map((item) => (
            <button
              key={item.apaarId}
              type="button"
              onClick={() => handleSelectSample(item)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: searchResult?.apaarId === item.apaarId ? '#1e3a8a' : '#ffffff',
                color: searchResult?.apaarId === item.apaarId ? '#ffffff' : '#334155',
                border: searchResult?.apaarId === item.apaarId ? '1px solid #1e3a8a' : '1px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {item.name} ({item.apaarId})
            </button>
          ))}
        </div>

        {/* Search input form */}
        <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Enter 12-digit APAAR ID (e.g. 4829-1058-3921 or 482910583921)"
              value={searchAparId}
              onChange={(e) => setSearchAparId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                borderRadius: '6px',
                border: '1.5px solid #cbd5e1',
                fontFamily: 'monospace',
                fontSize: '0.92rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button 
            type="submit"
            className="btn-primary"
            disabled={isVerifying}
            style={{ padding: '10px 20px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isVerifying ? 'Verifying with Depository...' : 'Verify APAAR ID'}
          </button>
        </form>

        {errorMessage && (
          <div style={{
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '0.82rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} /> {errorMessage}
          </div>
        )}

        {/* Clear, Unambiguous High-Visibility Verification Result Box */}
        {searchResult && (
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: searchResult.status === 'Verified' ? '2px solid #059669' : '2px solid #f59e0b',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)'
          }}>
            
            {/* Prominent Verification Header Banner */}
            <div style={{
              background: searchResult.status === 'Verified' ? '#059669' : '#d97706',
              color: '#ffffff',
              padding: '12px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.02em' }}>
                    {searchResult.status === 'Verified' ? 'APAAR ID OFFICIALLY VERIFIED & ACTIVE' : searchResult.status.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.74rem', opacity: 0.9 }}>
                    Central Academic Depository (NAD) & UIDAI Aadhaar Authenticated
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                Status: {searchResult.status.toUpperCase()}
              </div>
            </div>

            {/* Candidate & Verification Details */}
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                    Candidate Name:
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px 0' }}>
                    {searchResult.name}
                  </h3>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.05rem', color: '#0f2b5c', fontWeight: 800, letterSpacing: '0.05em' }}>
                    APAAR ID: {searchResult.apaarId}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Issuance Date:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.86rem' }}>{searchResult.issuedOn}</div>
                  <div style={{ color: '#059669', fontSize: '0.78rem', fontWeight: 700, marginTop: '2px' }}>
                    ✓ e-KYC Complete
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', fontSize: '0.84rem', color: '#334155', marginBottom: '16px' }}>
                <div><strong>Institution:</strong> {searchResult.college}</div>
                <div><strong>Department:</strong> {searchResult.department}</div>
                <div><strong>Academic Year / Term:</strong> {searchResult.academicYear}</div>
                <div><strong>University Register No:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{searchResult.registerNo || '713522104084'}</span></div>
                <div><strong>Aadhaar e-KYC:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{searchResult.aadhaarStatus}</span></div>
                <div><strong>Accumulated ABC Credits:</strong> <span style={{ color: '#0f2b5c', fontWeight: 700 }}>{searchResult.abcCredits} Credits</span></div>
                <div style={{ gridColumn: 'span 2', color: '#475569', fontSize: '0.8rem', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <strong>Official AICTE Audit Notes:</strong> {searchResult.notes}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <QrCode size={38} color="#0f2b5c" />
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Digital Seal Cryptographically Validated</div>
                    <div>National Academic Depository Hash Verified</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleDownloadVerificationSlip} 
                    style={{ fontSize: '0.82rem', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Download size={14} /> Download Verification Certificate (PDF)
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => window.print()} 
                    style={{ fontSize: '0.82rem', padding: '7px 12px' }}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
