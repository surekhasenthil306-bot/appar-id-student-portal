import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="portal-footer no-print">
      <div className="footer-inner">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '8px', color: '#fbcfe8' }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>APAAR PORTAL</h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '12px' }}>
              Automated Permanent Academic Account Registry for Sri Krishna College of Engineering and Technology, Coimbatore (Autonomous, affiliated to Anna University).
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="brand-tag-pink" style={{ fontSize: '0.62rem' }}>AICTE Approved</span>
              <span className="brand-tag-pink" style={{ fontSize: '0.62rem', background: '#3b0764', border: '1px solid #7c3aed' }}>Anna Univ Code 7135</span>
              <span className="brand-tag-pink" style={{ fontSize: '0.62rem', background: '#059669', border: '1px solid #10b981' }}>ABC Depository</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.86rem', fontWeight: 700, marginBottom: '10px', borderBottom: '2px solid #ec4899', display: 'inline-block', paddingBottom: '2px' }}>
              College & University Portals
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.78rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><a href="https://www.skcet.ac.in" target="_blank" rel="noreferrer" style={{ color: '#c4b5fd', textDecoration: 'none' }}>SKCET Official Portal <ExternalLink size={10} style={{ display: 'inline' }} /></a></li>
              <li><a href="https://www.annauniv.edu" target="_blank" rel="noreferrer" style={{ color: '#c4b5fd', textDecoration: 'none' }}>Anna University, Chennai <ExternalLink size={10} style={{ display: 'inline' }} /></a></li>
              <li><a href="https://www.aicte-india.org" target="_blank" rel="noreferrer" style={{ color: '#c4b5fd', textDecoration: 'none' }}>AICTE New Delhi <ExternalLink size={10} style={{ display: 'inline' }} /></a></li>
              <li><a href="https://www.abc.gov.in" target="_blank" rel="noreferrer" style={{ color: '#c4b5fd', textDecoration: 'none' }}>Academic Bank of Credits (ABC) <ExternalLink size={10} style={{ display: 'inline' }} /></a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.86rem', fontWeight: 700, marginBottom: '10px', borderBottom: '2px solid #ec4899', display: 'inline-block', paddingBottom: '2px' }}>
              Institutional Nodal Cell
            </h4>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
              <div>Office: <strong>Admin Block Room 104, SKCET</strong></div>
              <div>Telephone: <strong>0422-2678001 Ext. 214</strong></div>
              <div>National Toll Free: <strong>1800-111-928</strong></div>
              <div>Email: <strong>apaar.nodal@skcet.ac.in</strong></div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div>
            © 2024–2025 APAAR Portal. National Informatics Centre (NIC) & AICTE Nodal Desk, Sri Krishna College of Engineering and Technology, Coimbatore.
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Hyperlink Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
