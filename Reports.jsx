import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { studentProfileData } from '../data/mockData';
import { triggerFileDownload } from '../utils/documentHelper';

export default function Reports({ studentData, t }) {
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const activeStudent = studentData || studentProfileData;
  const student = activeStudent.personal;
  const academic = activeStudent.academic;
  const abc = activeStudent.abcBank;

  const handleDownload = (docName) => {
    triggerFileDownload(
      `${docName.replace(/\s+/g, '_')}_${academic.apaarId}.pdf`,
      docName,
      student.fullName,
      academic.apaarId,
      academic.registerNo,
      academic.collegeName,
      `Official certified academic report | Accumulated Credits: ${abc.creditsTotal} | CGPA: ${academic.cgpa}`
    );
    setDownloadSuccess(`Downloaded official ${docName} to your computer.`);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  const semesterCourses = [
    { code: "22CS501", title: "Design and Analysis of Algorithms", category: "Professional Core", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
    { code: "22CS502", title: "Database Management Systems", category: "Professional Core", credits: 3, grade: "A+", gradePoint: 9, result: "PASS" },
    { code: "22CS503", title: "Computer Networks & Security", category: "Professional Core", credits: 3, grade: "A+", gradePoint: 9, result: "PASS" },
    { code: "22CS504", title: "Theory of Computation", category: "Professional Core", credits: 4, grade: "A", gradePoint: 8, result: "PASS" },
    { code: "22CS507", title: "Database Management Systems Laboratory", category: "Practical", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
    { code: "22CS508", title: "Networks and Security Laboratory", category: "Practical", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
    { code: "22CS901", title: "SWAYAM NPTEL: Cloud Computing (CS602)", category: "Online Elective", credits: 3, grade: "Elite Gold", gradePoint: 9, result: "PASS" },
    { code: "22MC501", title: "Mandatory Course: Constitution of India", category: "Non-Credit", credits: 0, grade: "COMPLETED", gradePoint: 0, result: "PASS" },
  ];

  return (
    <div className="reports-root">
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2e1065', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={24} color="#6d28d9" />
            {t.reportsPageTitle}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.84rem' }}>
            {t.reportsPageDesc}
          </p>
        </div>

        <button className="btn-primary" onClick={() => window.print()}>
          <Printer size={15} /> {t.printGradeStatement}
        </button>
      </div>

      {downloadSuccess && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontWeight: 600,
          fontSize: '0.84rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} /> {downloadSuccess}
        </div>
      )}

      {/* OFFICIAL COLLEGE MARK STATEMENT SHEET */}
      <div className="profile-form-sheet" style={{ marginBottom: '24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '18px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6d28d9', letterSpacing: '0.05em' }}>
            ANNA UNIVERSITY AFFILIATED AUTONOMOUS INSTITUTION
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: '3px 0' }}>
            {t.collegeFullName}
          </h2>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>
            OFFICE OF THE CONTROLLER OF EXAMINATIONS
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
            Kuniyamuthur, Coimbatore - 641008, Tamil Nadu
          </div>

          <div style={{
            display: 'inline-block',
            margin: '12px auto 0',
            border: '1.5px solid #0f172a',
            padding: '3px 18px',
            fontWeight: 800,
            fontSize: '0.85rem',
            background: '#faf5ff',
            color: '#3b0764'
          }}>
            STATEMENT OF GRADES & ABC CREDIT ACCUMULATION (END SEMESTER EXAMINATIONS)
          </div>
        </div>

        {/* Student metadata table */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '8px 24px',
          fontSize: '0.84rem',
          marginBottom: '18px',
          background: '#f8fafc',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0'
        }}>
          <div><strong>{t.lblStudentName}</strong> {student.fullName}</div>
          <div><strong>{t.lblRegisterNo}</strong> <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{academic.registerNo}</span></div>
          <div><strong>{t.lblDegree}</strong> {academic.degree}</div>
          <div><strong>{t.lblDept}</strong> {academic.department}</div>
          <div><strong>{t.lblAcadYear}</strong> {academic.academicYear}</div>
          <div><strong>{t.lblAparNumber}</strong> <span style={{ fontFamily: 'JetBrains Mono', color: '#6d28d9', fontWeight: 800 }}>{academic.apaarId}</span></div>
          <div><strong>{t.lblAbcId}</strong> <span style={{ fontFamily: 'JetBrains Mono', color: '#db2777', fontWeight: 800 }}>{academic.abcId}</span></div>
          <div><strong>Regulations :</strong> R-2022 (CBCS & AICTE Curriculum)</div>
        </div>

        {/* Course-by-course grade table */}
        <div className="gov-table-wrapper" style={{ marginBottom: '18px' }}>
          <table className="gov-table" style={{ fontSize: '0.82rem' }}>
            <thead>
              <tr>
                <th style={{ width: '100px' }}>{t.courseCode}</th>
                <th>{t.courseTitle}</th>
                <th style={{ width: '130px' }}>{t.category}</th>
                <th style={{ width: '70px', textAlign: 'center' }}>{t.credits}</th>
                <th style={{ width: '90px', textAlign: 'center' }}>{t.grade}</th>
                <th style={{ width: '80px', textAlign: 'center' }}>{t.gradePoint}</th>
                <th style={{ width: '80px', textAlign: 'center' }}>{t.result}</th>
              </tr>
            </thead>
            <tbody>
              {semesterCourses.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#6d28d9' }}>{c.code}</td>
                  <td style={{ fontWeight: 600, color: '#1e293b' }}>{c.title}</td>
                  <td style={{ color: '#475569' }}>{c.category}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{c.credits}</td>
                  <td style={{ textAlign: 'center', fontWeight: 800, color: c.grade === 'O' || c.grade === 'A+' ? '#059669' : '#1e1b4b' }}>
                    {c.grade}
                  </td>
                  <td style={{ textAlign: 'center' }}>{c.gradePoint}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: '#059669', fontWeight: 800 }}>PASS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Semester-wise GPA progression */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          {abc.semesters.map((s, idx) => (
            <div key={idx} style={{ background: '#faf5ff', border: '1px solid #ddd6fe', borderRadius: '6px', padding: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{s.sem}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#3b0764', margin: '2px 0' }}>{s.sgpa}</div>
              <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>{s.credits} Credits</div>
            </div>
          ))}
        </div>

        {/* Final Cumulative Calculations Box */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 18px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '0.85rem'
        }}>
          <div>
            <strong>Total Credits Earned (Cumulative) :</strong> <span style={{ color: '#6d28d9', fontWeight: 800 }}>{abc.creditsTotal} / 165</span>
          </div>
          <div>
            <strong>{t.cgpaTitle}</strong> <span style={{ color: '#059669', fontWeight: 900, fontSize: '1.05rem' }}>{academic.cgpa} / 10.0</span>
          </div>
          <div>
            <strong>Classification :</strong> <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{t.classification}</span>
          </div>
        </div>

        {/* Controller of Examinations Seal */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '36px',
          paddingTop: '16px',
          borderTop: '1px solid #cbd5e1'
        }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Date of Issue: 02-Nov-2024</div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Place: SKCET, Coimbatore</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
              ✓ Digitally Signed & Encrypted
            </div>
            <div style={{ borderTop: '1px solid #0f172a', paddingTop: '3px', fontSize: '0.8rem', fontWeight: 800, marginTop: '14px' }}>
              Controller of Examinations
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Sri Krishna College of Engineering and Technology</div>
          </div>
        </div>

      </div>

      {/* Official Downloadable Documents Repository */}
      <div className="gov-card">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <Download size={18} color="#db2777" />
            Official Educational Certificates for Download
          </div>
          <span className="badge badge-pink">DigiLocker Authentic</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ border: '1px solid #ddd6fe', borderRadius: '10px', padding: '16px', background: '#faf5ff' }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1e1b4b', marginBottom: '2px' }}>
              Official APAAR Identity Slip
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
              Color printable student slip carrying the 12-digit number <code>{academic.apaarId}</code> and verification QR code.
            </p>
            <button className="btn-primary" onClick={() => handleDownload('APAAR Identity Slip')} style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
              <Download size={13} /> Download PDF
            </button>
          </div>

          <div style={{ border: '1px solid #ddd6fe', borderRadius: '10px', padding: '16px', background: '#faf5ff' }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1e1b4b', marginBottom: '2px' }}>
              Cumulative ABC Transcript (Sem 1 to 5)
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
              Certified 138-credit record synchronized with the National Academic Depository (NAD).
            </p>
            <button className="btn-pink" onClick={() => handleDownload('ABC Cumulative Transcript')} style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
              <Download size={13} /> Download Transcript
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
