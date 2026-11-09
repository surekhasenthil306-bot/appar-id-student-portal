import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle,
  Building2,
  UserCheck,
  Key
} from 'lucide-react';
import { allStudentAccounts, demoAccountsList, findStudentAccount } from '../data/mockData';

export default function LoginPage({ onLoginSuccess }) {
  const [loginRole, setLoginRole] = useState('student'); // 'student' | 'admin' | 'register'
  
  // Student form state
  const [studentIdentifier, setStudentIdentifier] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentCaptcha, setStudentCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaRotate, setCaptchaRotate] = useState(false);

  // Admin form state
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminCaptcha, setAdminCaptcha] = useState('');

  // New Registration form state
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regRollNo, setRegRollNo] = useState('');
  const [regCollege, setRegCollege] = useState('Sri Krishna College of Engineering and Technology, Coimbatore');
  const [regSuccess, setRegSuccess] = useState('');

  // Function to generate a completely new random captcha (Requirement 6)
  const generateNewCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(code);
    setStudentCaptcha('');
    setAdminCaptcha('');
    setCaptchaRotate(prev => !prev);
  };

  // Generate a new captcha on initial mount
  useEffect(() => {
    generateNewCaptcha();
  }, []);

  // Regenerate captcha whenever switching tabs
  const handleTabChange = (role) => {
    setLoginRole(role);
    setErrorMessage('');
    generateNewCaptcha();
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentIdentifier.trim()) {
      setErrorMessage('Please enter your Registered Email or Mobile Number.');
      generateNewCaptcha();
      return;
    }
    if (!studentPassword.trim()) {
      setErrorMessage('Please enter your Password.');
      generateNewCaptcha();
      return;
    }
    if (!studentCaptcha.trim()) {
      setErrorMessage('Please enter the security captcha shown.');
      return;
    }
    if (studentCaptcha.trim().toUpperCase() !== generatedCaptcha) {
      setErrorMessage('Invalid Captcha. Please enter the fresh characters shown in the security box.');
      generateNewCaptcha();
      return;
    }

    // Authenticate student against the 4 available accounts (Requirement 1)
    const matchedStudent = findStudentAccount(studentIdentifier, studentPassword);
    
    if (matchedStudent) {
      setErrorMessage('');
      generateNewCaptcha();
      onLoginSuccess('student', matchedStudent);
    } else {
      const cleanId = studentIdentifier.trim().toLowerCase();
      const studentFound = allStudentAccounts.find(s =>
        s.login.email.toLowerCase() === cleanId ||
        s.login.collegeEmail.toLowerCase() === cleanId ||
        (s.login.alternateEmails || []).some(e => e.toLowerCase() === cleanId) ||
        (s.personal.email || '').toLowerCase() === cleanId ||
        (s.personal.alternateEmail || '').toLowerCase() === cleanId ||
        s.login.mobile === cleanId
      );

      if (studentFound) {
        setErrorMessage(`Invalid Password for ${studentFound.personal.fullName}. Please check your credentials.`);
      } else {
        setErrorMessage('No account found with this email or mobile number. Please check and try again.');
      }
      generateNewCaptcha();
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminId.trim() || !adminPassword.trim()) {
      setErrorMessage('Please enter Admin Nodal ID and Password.');
      generateNewCaptcha();
      return;
    }
    if (adminCaptcha.trim().toUpperCase() !== generatedCaptcha) {
      setErrorMessage('Invalid Captcha. Please enter the characters shown in the security box.');
      generateNewCaptcha();
      return;
    }

    setErrorMessage('');
    generateNewCaptcha();
    onLoginSuccess('admin', allStudentAccounts[0]);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regAadhaar.length < 12) {
      setErrorMessage('Please enter a valid 12-digit Aadhaar / Provisional ID.');
      return;
    }
    setRegSuccess('Aadhaar OTP sent to mobile registered with UIDAI. Provisional APAAR generated!');
    setTimeout(() => {
      setRegSuccess('');
      handleTabChange('student');
    }, 2500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      {/* Top Government Tri-color Strip */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #f97316 0%, #ffffff 50%, #16a34a 100%)' }}></div>

      {/* Top Gov Header Bar */}
      <div style={{ background: '#0f2b5c', color: '#e2e8f0', padding: '9px 24px', fontSize: '0.8rem', borderBottom: '1px solid #1e3a8a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>भारत सरकार | Government of India</span>
            <span>•</span>
            <span style={{ color: '#93c5fd' }}>Ministry of Education & AICTE</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
            <span>NEP 2020 INITIATIVE</span>
            <span>•</span>
            <span>National Academic Depository (NAD)</span>
            <span>•</span>
            <span style={{ color: '#86efac', fontWeight: 600 }}>Official Portal</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 20px'
      }}>
        <div style={{
          maxWidth: '1080px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #cbd5e1',
          background: '#ffffff'
        }}>
          
          {/* Left Column: Official Institutional Brand Information */}
          <div style={{
            background: '#0f2b5c',
            color: '#ffffff',
            padding: '38px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#93c5fd'
                }}>
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
                    APAAR PORTAL
                  </h1>
                  <p style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: '2px 0 0 0' }}>
                    Government of India • AICTE
                  </p>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.06)',
                borderLeft: '4px solid #3b82f6',
                padding: '16px',
                borderRadius: '6px',
                marginBottom: '20px'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff', marginBottom: '4px' }}>
                  One Nation, One Student ID (APAAR)
                </div>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                  Automated Permanent Academic Account Registry. Secure digital access to your 12-digit APAAR ID, Academic Bank of Credits (ABC), verified certificates, and institutional mark sheets.
                </p>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6 }}>
                <div>✓ Verified with DigiLocker and National Academic Depository</div>
                <div>✓ UIDAI Aadhaar e-KYC secure authentication</div>
                <div>✓ Recognized by AICTE, UGC & State Technical Universities</div>
              </div>
            </div>

            {/* Note on security */}
            <div style={{
              marginTop: '30px',
              padding: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '0.76rem',
              color: '#cbd5e1',
              lineHeight: 1.5
            }}>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px' }}>Security Advisory:</strong>
              Please ensure you are accessing the official portal. Never share your password or Aadhaar OTP with anyone.
            </div>

          </div>

          {/* Right Column: Clean White Authentication Form */}
          <div style={{ padding: '36px 36px', background: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Role Switcher Tabs */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              borderRadius: '8px',
              padding: '3px',
              marginBottom: '22px'
            }}>
              <button
                type="button"
                onClick={() => handleTabChange('student')}
                style={{
                  flex: 1,
                  padding: '9px 10px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: loginRole === 'student' ? '#1e3a8a' : 'transparent',
                  color: loginRole === 'student' ? '#ffffff' : '#64748b',
                  transition: 'all 0.15s'
                }}
              >
                Student Sign In
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('admin')}
                style={{
                  flex: 1,
                  padding: '9px 10px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: loginRole === 'admin' ? '#1e3a8a' : 'transparent',
                  color: loginRole === 'admin' ? '#ffffff' : '#64748b',
                  transition: 'all 0.15s'
                }}
              >
                Admin / Nodal Sign In
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('register')}
                style={{
                  flex: 1,
                  padding: '9px 10px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: loginRole === 'register' ? '#1e3a8a' : 'transparent',
                  color: loginRole === 'register' ? '#ffffff' : '#64748b',
                  transition: 'all 0.15s'
                }}
              >
                New Registration
              </button>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <AlertCircle size={16} /> {errorMessage}
              </div>
            )}

            {/* Success Message Alert */}
            {regSuccess && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#166534',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={16} /> {regSuccess}
              </div>
            )}

            {/* TAB 1: Student Login Form */}
            {loginRole === 'student' && (
              <form onSubmit={handleStudentSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Registered Email ID or Mobile Number:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. karthik001cs@gmail.com, pavithra.cit@gmail.com"
                      value={studentIdentifier}
                      onChange={(e) => setStudentIdentifier(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 38px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      Password:
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset verification token sent to your registered contact.'); }} style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600, textDecoration: 'none' }}>
                      Forgot Password?
                    </a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter password"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 42px 10px 38px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: showPassword ? '#1e40af' : '#64748b',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Dynamic Captcha Box (Requirement 6: Changes everytime) */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Enter Security Captcha:
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{
                      background: '#f1f5f9',
                      border: '1px solid #94a3b8',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontFamily: "'Courier New', Courier, monospace",
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      letterSpacing: '0.22em',
                      color: '#1e3a8a',
                      userSelect: 'none',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)'
                    }}>
                      {generatedCaptcha}
                    </div>

                    <button
                      type="button"
                      onClick={generateNewCaptcha}
                      style={{
                        padding: '9px',
                        background: '#f8fafc',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        cursor: 'pointer',
                        color: '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                      }}
                      title="Generate New Captcha"
                    >
                      <RefreshCw size={18} style={{ transform: captchaRotate ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </button>

                    <input 
                      type="text"
                      required
                      placeholder="Enter security code"
                      value={studentCaptcha}
                      onChange={(e) => setStudentCaptcha(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        color: '#0f172a',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                    Captcha regenerates automatically on every action for security.
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '6px',
                    background: '#1e3a8a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 4px rgba(30, 58, 138, 0.2)'
                  }}
                >
                  Sign In to APAAR Student Portal <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* TAB 2: Admin & Nodal Officer Login */}
            {loginRole === 'admin' && (
              <form onSubmit={handleAdminSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Admin / College Nodal ID:
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. admin@aicte.gov.in or SKCET-NODAL-7135"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Admin Password:
                  </label>
                  <input 
                    type="password"
                    required
                    placeholder="Enter Admin Password (e.g. admin123)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Security Captcha:
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{
                      background: '#f1f5f9',
                      border: '1px solid #94a3b8',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      letterSpacing: '0.2em',
                      color: '#1e3a8a'
                    }}>
                      {generatedCaptcha}
                    </div>
                    <button
                      type="button"
                      onClick={generateNewCaptcha}
                      style={{ padding: '8px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', color: '#475569' }}
                    >
                      <RefreshCw size={18} />
                    </button>
                    <input 
                      type="text"
                      required
                      placeholder="Enter code"
                      value={adminCaptcha}
                      onChange={(e) => setAdminCaptcha(e.target.value)}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', textTransform: 'uppercase', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '6px',
                    background: '#0f2b5c',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  Sign In as College / AICTE Admin
                </button>
              </form>
            )}

            {/* TAB 3: New Register Form */}
            {loginRole === 'register' && (
              <form onSubmit={handleRegisterSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    College / Technical Institute:
                  </label>
                  <input 
                    type="text"
                    disabled
                    value={regCollege}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '0.82rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Aadhaar Number (12 Digits):
                  </label>
                  <input 
                    type="text"
                    required
                    maxLength={12}
                    placeholder="Enter 12-digit Aadhaar number"
                    value={regAadhaar}
                    onChange={(e) => setRegAadhaar(e.target.value.replace(/\D/g, ''))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    College Register / Roll Number:
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 713522104084"
                    value={regRollNo}
                    onChange={(e) => setRegRollNo(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '6px',
                    background: '#1e3a8a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  Verify Aadhaar & Generate APAAR ID
                </button>
              </form>
            )}

            {/* Support footer */}
            <div style={{ marginTop: '22px', paddingTop: '14px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#64748b' }}>
              <span>Need Help? Call National Desk <strong>1800-111-928</strong></span>
              <span>AICTE Nodal Depository</span>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Footer bar */}
      <div style={{ background: '#0f2b5c', color: '#94a3b8', textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', borderTop: '1px solid #1e3a8a' }}>
        © 2024–2025 Automated Permanent Academic Account Registry (APAAR) • Ministry of Education & AICTE, Government of India.
      </div>
    </div>
  );
}
