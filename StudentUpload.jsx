import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Download, 
  ShieldAlert, 
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import DocumentViewerModal from './DocumentViewerModal';
import { triggerFileDownload } from '../utils/documentHelper';

export default function StudentUpload({ documents, setDocuments, studentData, t }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  
  // Custom upload form state
  const [targetDocId, setTargetDocId] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Academic Records');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('');
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [previewModalDoc, setPreviewModalDoc] = useState(null);

  // Native File Input Ref to open computer's file manager
  const fileInputRef = useRef(null);

  const pendingCount = documents.filter(d => d.status === 'Action Required').length;

  const handleNativeFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      const sizeStr = file.size > 1048576 
        ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' 
        : (file.size / 1024).toFixed(1) + ' KB';
      setSelectedFileSize(sizeStr);
      try {
        const url = URL.createObjectURL(file);
        setSelectedFileUrl(url);
      } catch (err) {
        // Fallback
      }
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "));
      }
    }
  };

  const handleOpenFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    if (!selectedFileName && !targetDocId) {
      alert('Please click "Click here to get document" to fetch a file from your computer.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          if (targetDocId) {
            setDocuments(prevDocs => prevDocs.map(d => {
              if (d.id === targetDocId) {
                return {
                  ...d,
                  status: 'Under Verification',
                  uploadedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                  fileName: selectedFileName || 'Semester_5_DigiLocker_Verified.pdf',
                  fileSize: selectedFileSize || '2.4 MB',
                  fileUrl: selectedFileUrl,
                  adminRemarks: 'Submitted via DigiLocker token. Under SKCET Nodal & Anna University verification.'
                };
              }
              return d;
            }));
            setUploadSuccessMsg('Document successfully submitted for AICTE & Anna University verification!');
          } else {
            const newDoc = {
              id: `DOC-${Date.now().toString().slice(-3)}`,
              title: docTitle || 'Academic Mark Sheet',
              category: docCategory,
              mandatory: false,
              status: 'Under Verification',
              uploadedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              fileSize: selectedFileSize || '1.8 MB',
              fileName: selectedFileName || 'Document_Uploaded.pdf',
              fileUrl: selectedFileUrl,
              adminRemarks: 'Awaiting college nodal verification.',
              source: 'Student Upload'
            };
            setDocuments(prev => [newDoc, ...prev]);
            setUploadSuccessMsg(`Successfully uploaded "${newDoc.title}"!`);
          }

          setSelectedFileName('');
          setSelectedFileSize('');
          setTargetDocId('');
          setDocTitle('');
          setTimeout(() => setUploadSuccessMsg(''), 4500);
          return 0;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handlePrepareUploadFor = (doc) => {
    setTargetDocId(doc.id);
    setDocTitle(doc.title);
    setDocCategory(doc.category);
    handleOpenFilePicker();
  };

  const filteredDocs = documents.filter(doc => {
    const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchStat = filterStatus === 'All' || doc.status === filterStatus;
    return matchCat && matchStat;
  });

  return (
    <div className="student-upload-root">
      
      {/* Hidden Native File Input */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleNativeFileChange}
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        style={{ display: 'none' }}
      />

      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2e1065', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UploadCloud size={26} color="#6d28d9" />
          {t.uploadPageTitle}
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '2px' }}>
          {t.uploadPageDesc}
        </p>
      </div>

      {/* Admin Notice */}
      {pendingCount > 0 && (
        <div className="admin-alert-banner">
          <div className="admin-alert-content">
            <div className="admin-alert-icon">
              <AlertTriangle size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 800, color: '#be185d', fontSize: '0.92rem' }}>
                  URGENT COMPLIANCE: 1 Document Requested by AICTE Admin
                </span>
                <span className="badge badge-warning">High Priority</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#475569' }}>
                Document: <strong>Semester 5 Official Mark Sheet (with DigiLocker verification hash)</strong>.
                Submit immediately for Academic Bank of Credits (ABC) ledger reconciliation before 15-Nov-2024.
              </p>
            </div>
          </div>
          <button 
            type="button"
            className="btn-pink"
            onClick={() => handlePrepareUploadFor(documents.find(d => d.id === 'DOC-105'))}
          >
            {t.uploadNow} <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* SECTION 1: UPLOAD ACADEMIC DOCUMENT */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <UploadCloud size={18} color="#6d28d9" />
            {targetDocId ? 'Fulfill Admin Requested Document' : 'Upload Academic Mark Sheet / Certificate'}
          </div>
          {targetDocId && (
            <span className="badge badge-pink">Fulfilling Admin Request</span>
          )}
        </div>

        <form onSubmit={handleSimulateUpload}>
          {targetDocId ? (
            <div style={{
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.84rem'
            }}>
              <div style={{ color: '#9d174d', fontWeight: 800 }}>Fulfilling Request: {docTitle}</div>
              <div style={{ color: '#475569', fontSize: '0.78rem', marginTop: '2px' }}>
                This mark sheet will be routed directly to the Anna University & AICTE Examination Cell for credit verification.
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Document Title:
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. NPTEL Elite Certificate in Cloud Computing"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Document Category:
                </label>
                <select 
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}
                >
                  <option value="Academic Records">Academic Mark Sheets & Transcripts</option>
                  <option value="Identity & Consent">Identity & Consent (Aadhaar/APAAR)</option>
                  <option value="Credit Transfer">SWAYAM / NPTEL MOOC Credit Transfer</option>
                  <option value="Institute Endorsement">SKCET College Endorsement</option>
                </select>
              </div>
            </div>
          )}

          {/* Click here to get document */}
          <div 
            className="dropzone"
            onClick={handleOpenFilePicker}
            style={{ padding: '36px 20px', cursor: 'pointer', textAlign: 'center' }}
          >
            <div className="dropzone-icon">
              <FolderOpen size={28} />
            </div>

            {selectedFileName ? (
              <div>
                <div style={{ fontWeight: 800, color: '#059669', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} /> Fetched from File Manager: {selectedFileName}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                  File Size: <strong>{selectedFileSize}</strong> • Ready to submit. Click below if you wish to change file.
                </p>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleOpenFilePicker(); }}
                  className="btn-pink"
                  style={{ fontSize: '0.95rem', padding: '10px 22px', fontWeight: 800, marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <FolderOpen size={18} /> {t.uploadBtnText}
                </button>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '6px' }}>
                  {t.uploadBtnSub}
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#6d28d9', marginBottom: '4px' }}>
                <span>Verifying DigiLocker hash and submitting to server...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#ede9fe', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'linear-gradient(90deg, #ec4899 0%, #6d28d9 100%)' }}></div>
              </div>
            </div>
          )}

          {uploadSuccessMsg && (
            <div style={{
              marginTop: '14px',
              padding: '10px 14px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              color: '#065f46',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} /> {uploadSuccessMsg}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
            {targetDocId && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => { setTargetDocId(''); setSelectedFileName(''); }}
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : t.submitToAicte}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: AICTE COMPLIANCE INSTRUCTIONS */}
      <div className="gov-card" style={{ background: '#faf5ff', border: '1px solid #ddd6fe' }}>
        <div className="gov-card-header">
          <div className="gov-card-title">
            <ShieldAlert size={18} color="#db2777" />
            {t.complianceTitle}
          </div>
          <span className="badge badge-pink">Mandatory Guidelines</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', fontSize: '0.84rem', color: '#475569' }}>
          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, color: '#1e1b4b', marginBottom: '4px' }}>
              1. DigiLocker QR Signature Hash
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
              All semester mark sheets and grade cards must carry the authentic DigiLocker QR code hash. Scanned photocopies without cryptographic signature will be rejected by the AICTE scrutiny cell.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, color: '#1e1b4b', marginBottom: '4px' }}>
              2. Aadhaar e-KYC One Student Principle
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
              Documents are mapped to your registered Aadhaar token <code>XXXX-XXXX-4921</code>. Ensure candidate initials and name match with the college admission register (R. Karthik).
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, color: '#1e1b4b', marginBottom: '4px' }}>
              3. ABC Credit Depository Validation
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
              Approved mark sheets transfer credits directly to your Academic Bank of Credits account <strong>ABC-784-219-042</strong> within 48 hours of endorsement by the SKCET college Nodal Officer.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: UPLOADED DOCUMENTS REPOSITORY TABLE */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <FileText size={18} color="#6d28d9" />
            {t.uploadedRepoTitle} ({filteredDocs.length})
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#fff' }}
            >
              <option value="All">All Categories</option>
              <option value="Academic Records">Academic Mark Sheets</option>
              <option value="Identity & Consent">Identity & Consent</option>
              <option value="Credit Transfer">Credit Transfer</option>
              <option value="Institute Endorsement">Institute Endorsement</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#fff' }}
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Action Required">Action Required</option>
              <option value="Under Verification">Under Verification</option>
            </select>
          </div>
        </div>

        <div className="gov-table-wrapper">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Remarks / Admin Feedback</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{doc.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {doc.fileName} • {doc.fileSize}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>{doc.category}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>{doc.uploadedDate}</span>
                  </td>
                  <td>
                    {doc.status === 'Verified' && (
                      <span className="badge badge-verified">
                        <CheckCircle2 size={12} /> {t.statVerified}
                      </span>
                    )}
                    {doc.status === 'Action Required' && (
                      <span className="badge badge-warning">
                        <AlertTriangle size={12} /> Action Required
                      </span>
                    )}
                    {doc.status === 'Under Verification' && (
                      <span className="badge badge-pending">
                        <Clock size={12} /> In Scrutiny
                      </span>
                    )}
                  </td>
                  <td style={{ maxWidth: '280px', fontSize: '0.78rem', color: doc.status === 'Action Required' ? '#be185d' : '#64748b', fontWeight: doc.status === 'Action Required' ? 700 : 400 }}>
                    {doc.adminRemarks}
                  </td>
                  <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {doc.status === 'Action Required' ? (
                      <button 
                        type="button"
                        className="btn-primary"
                        onClick={() => handlePrepareUploadFor(doc)}
                        style={{ padding: '6px 12px', fontSize: '0.76rem', fontWeight: 600 }}
                      >
                        Upload Now
                      </button>
                    ) : (
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button 
                          type="button"
                          className="btn-outline"
                          onClick={() => setPreviewModalDoc(doc)}
                          style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          title="View PDF Document"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button 
                          type="button"
                          className="btn-primary"
                          onClick={() => triggerFileDownload(
                            doc.fileName,
                            doc.title,
                            studentData?.personal?.fullName || 'R. Karthik',
                            studentData?.academic?.apaarId || '4829-1058-3921',
                            studentData?.academic?.registerNo || '713522104084',
                            studentData?.academic?.collegeName || 'Sri Krishna College of Engineering and Technology, Coimbatore',
                            doc.adminRemarks
                          )}
                          style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          title="Download Official PDF"
                        >
                          <Download size={13} /> Download
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Preview & Full View Modal */}
      {previewModalDoc && (
        <DocumentViewerModal 
          doc={previewModalDoc}
          student={studentData}
          onClose={() => setPreviewModalDoc(null)}
        />
      )}

    </div>
  );
}
