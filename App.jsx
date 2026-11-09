import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentProfile from './components/StudentProfile';
import StudentUpload from './components/StudentUpload';
import AicteNotification from './components/AicteNotification';
import VerificationStatus from './components/VerificationStatus';
import Reports from './components/Reports';
import HelpSupport from './components/HelpSupport';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import { initialStudentDocuments, aicteNotificationsList, studentProfileData } from './data/mockData';
import { translations } from './data/translations';

export default function App() {
  // Authentication state: starts at false so user sees the login page first
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student');
  const [currentStudent, setCurrentStudent] = useState(studentProfileData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState(initialStudentDocuments);
  const [notifications, setNotifications] = useState(aicteNotificationsList);

  // Language state — drives the 3-language selector in Header
  const [currentLang, setCurrentLang] = useState('en');
  // Resolve translation dictionary (fall back to English if key missing)
  const t = (translations[currentLang] || translations['en']);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const pendingDocsCount = documents.filter(d => d.status === 'Action Required').length;

  const handleLoginSuccess = (role, student) => {
    setUserRole(role);
    if (student) {
      setCurrentStudent(student);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // If not logged in, display the dark blue & white login page
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Official Government Header */}
      <Header
        studentData={currentStudent}
        onLogout={handleLogout}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        t={t}
      />

      {/* Main Body with Vertical Sidebar Navigation */}
      <div className="portal-main-wrapper">
        {/* Left Vertical Sidebar Menu */}
        <Navbar
          studentData={currentStudent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadNotificationsCount={unreadNotificationsCount}
          pendingDocsCount={pendingDocsCount}
          onLogout={handleLogout}
          t={t}
        />

        {/* Right Main Content Area */}
        <main className="portal-content-area">
          {activeTab === 'dashboard' && (
            <Dashboard
              studentData={currentStudent}
              setActiveTab={setActiveTab}
              documents={documents}
              notifications={notifications}
              t={t}
            />
          )}

          {activeTab === 'profile' && (
            <StudentProfile 
              studentData={currentStudent}
              t={t} 
            />
          )}

          {activeTab === 'upload' && (
            <StudentUpload
              studentData={currentStudent}
              documents={documents}
              setDocuments={setDocuments}
              t={t}
            />
          )}

          {activeTab === 'notifications' && (
            <AicteNotification
              notifications={notifications}
              setNotifications={setNotifications}
              setActiveTab={setActiveTab}
              t={t}
            />
          )}

          {activeTab === 'verification' && (
            <VerificationStatus
              studentData={currentStudent}
              setActiveTab={setActiveTab}
              t={t}
            />
          )}

          {activeTab === 'reports' && (
            <Reports 
              studentData={currentStudent}
              t={t} 
            />
          )}

          {activeTab === 'help' && (
            <HelpSupport t={t} />
          )}
        </main>
      </div>

      {/* Official Government Footer */}
      <Footer setActiveTab={setActiveTab} t={t} />
    </div>
  );
}
