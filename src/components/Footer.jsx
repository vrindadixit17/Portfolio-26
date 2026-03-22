import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=DM+Sans:wght@400;500&display=swap');

        .footer {
          background: var(--blue);
          padding: 28px 48px 0;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
          display: flex;
          flex-direction: column;
          max-height: 70vh;
          box-sizing: border-box;
        }

        /* big bg logo */
        .footer-bg-logo {
          position: absolute;
          right: -40px;
          bottom: 30px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(7rem, 16vw, 14rem);
          color: rgba(253,249,245,0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.02em;
        }

        /* ── TOP ROW: headline + cta ── */
        .footer-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 3.2vw, 3rem);
          color: #FDF9F5;
          line-height: 0.9;
          letter-spacing: 0.02em;
          margin: 0;
        }
        .footer-headline span { color: #DCFA40; }

        .footer-top-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .footer-subhead {
          font-family: 'Italianno', cursive;
          font-size: 1rem;
          color: rgba(253,249,245,0.5);
          text-align: right;
        }

        .footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #DCFA40;
          color: #1C1C1C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 9px 20px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(220,250,64,0.3);
        }
        .footer-cta:hover {
          background: #FDF9F5;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220,250,64,0.4);
        }

        /* ── DIVIDER ── */
        .footer-divider {
          height: 1px;
          background: rgba(253,249,245,0.1);
          margin-bottom: 20px;
        }

        /* ── GRID ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 24px;
          flex: 1;
        }

        .footer-col-label {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(253,249,245,0.35);
          margin-bottom: 10px;
          display: block;
        }

        /* ── NAV ── */
        .footer-nav { display: flex; flex-direction: column; gap: 7px; }

        .footer-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(253,249,245,0.75);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .footer-nav-link:hover { color: #DCFA40; transform: translateX(5px); }

        /* ── SOCIALS ── */
        .footer-socials { display: flex; flex-direction: column; gap: 7px; }

        .footer-social-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(253,249,245,0.75);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
        }
        .footer-social-arrow {
          font-size: 0.65rem;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          transform: translateX(-4px);
        }
        .footer-social-link:hover { color: #FF7EDF; transform: translateX(5px); }
        .footer-social-link:hover .footer-social-arrow { opacity: 1; transform: translateX(0); }

        /* ── CONTACT ── */
        .footer-contact { display: flex; flex-direction: column; gap: 10px; }
        .footer-contact-item { display: flex; flex-direction: column; gap: 2px; }

        .footer-contact-label {
          font-size: 0.48rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FDF9F5;
        }
        .footer-contact-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: rgba(253,249,245,0.8);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        a.footer-contact-value:hover { color: #DCFA40; }

        /* ── BRAND ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .footer-logo {
          font-family: 'Italianno', cursive;
          font-size: 2.2rem;
          color: #FDF9F5;
          cursor: pointer;
          transition: color 0.2s ease;
          line-height: 1;
        }
        .footer-logo:hover { color: #DCFA40; }

        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(220,250,64,0.12);
          border: 1px solid rgba(220,250,64,0.25);
          border-radius: 100px;
          padding: 4px 10px;
        }
        .footer-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DCFA40;
          animation: blink 2s ease infinite;
        }
        .footer-status-text {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #DCFA40;
          font-family: 'DM Sans', sans-serif;
        }

        .footer-tagline {
          font-family: 'Italianno', cursive;
          font-size: 1rem;
          color: rgba(253,249,245,0.35);
          text-align: right;
          line-height: 1.4;
          margin-top: auto;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }

        /* ── BOTTOM ── */
        .footer-bottom {
          border-top: 1px solid rgba(253,249,245,0.1);
          padding: 12px 0 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .footer-copy {
          font-size: 0.65rem;
          color: rgba(253,249,245,0.25);
          letter-spacing: 0.08em;
          font-family: 'DM Sans', sans-serif;
        }

        .footer-made {
          font-family: 'Italianno', cursive;
          font-size: 0.9rem;
          color: rgba(253,249,245,0.25);
        }

        @media (max-width: 768px) {
          .footer { padding: 24px 20px 0; max-height: none; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-top { flex-direction: column; align-items: flex-start; }
          .footer-top-right { align-items: flex-start; }
          .footer-subhead { text-align: left; }
          .footer-brand { align-items: flex-start; }
          .footer-tagline { text-align: left; }
        }

        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="footer">
        <span className="footer-bg-logo">vrinda</span>

        {/* TOP ROW */}
        <div className="footer-top">
          <h2 className="footer-headline">
            let's make<br /><span>something</span> great.
          </h2>
          <div className="footer-top-right">
            <p className="footer-subhead">open for freelance & collaborations</p>
            <button className="footer-cta" onClick={() => navigate('/contact')}>
              get in touch →
            </button>
          </div>
        </div>

        <div className="footer-divider" />

        {/* GRID */}
        <div className="footer-grid">

          <div>
            <span className="footer-col-label">Navigate</span>
            <div className="footer-nav">
              <button className="footer-nav-link" onClick={() => navigate('/home')}>Home</button>
              <button className="footer-nav-link" onClick={() => navigate('/skills')}>Skills</button>
              <button className="footer-nav-link" onClick={() => navigate('/works-projects')}>Works</button>
              <button className="footer-nav-link" onClick={() => navigate('/contact')}>Contact</button>
            </div>
          </div>

          <div>
            <span className="footer-col-label">Find me</span>
            <div className="footer-socials">
              
              <a className="footer-social-link" href="https://www.linkedin.com/in/vrinda-dixit-30a591307/" target="_blank" rel="noreferrer">
                <span className="footer-social-arrow">↗</span> LinkedIn
              </a>
              <a className="footer-social-link" href="https://www.behance.net/vrindadixit" target="_blank" rel="noreferrer">
                <span className="footer-social-arrow">↗</span> Behance
              </a>
              <a className="footer-social-link" href="https://github.com/vrindadixit17" target="_blank" rel="noreferrer">
                <span className="footer-social-arrow">↗</span> GitHub
              </a>
            </div>
          </div>

          <div>
            <span className="footer-col-label">Contact</span>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Email</span>
                <a className="footer-contact-value" href="mailto:dixitvrinda1704@gmail.com">dixitvrinda1704@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Based in</span>
                <span className="footer-contact-value">New Delhi, India</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Available for</span>
                <span className="footer-contact-value">Freelance & Full-time</span>
              </div>
            </div>
          </div>

          <div className="footer-brand">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <span className="footer-logo" onClick={() => navigate('/home')}>vrinda</span>
              <div className="footer-status">
                <div className="footer-status-dot" />
                <span className="footer-status-text">available</span>
              </div>
            </div>
            <p className="footer-tagline">
              design that's felt,<br />not just seen.
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Vrinda Dixit — All rights reserved</span>
          <span className="footer-made">made with ✦ in delhi</span>
        </div>
      </footer>
    </>
  );
}
