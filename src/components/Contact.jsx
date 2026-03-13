import { useState, useRef } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    cardRef.current.style.transform = `rotate(-6deg) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotate(-6deg)';
  };

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Poppins:wght@300;400;500;600&family=Bebas+Neue&display=swap');

        .c-section {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 48px 60px;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        /* ── BIG RED HEADLINE ── */
        .c-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(7rem, 20vw, 18rem);
          color: #CC1F3A;
          line-height: 0.88;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
          user-select: none;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── TILTED CARD ── */
        .c-card-wrap {
          position: relative;
          z-index: 2;
          margin-top: -3.5vw;
          perspective: 1000px;
        }

        .c-card {
          background: #5862E9;
          border-radius: 10px;
          padding: 44px 48px;
          transform: rotate(-6deg);
          transform-origin: left center;
          transition: transform 0.25s ease;
          will-change: transform;
          max-width: 680px;
          animation: slideIn 0.8s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── FORM ── */
        .c-row {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }

        .c-field {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 6px;
        }

        .c-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(253,249,245,0.55);
        }

        .c-input {
          background: rgba(253,249,245,0.1);
          border: 1.5px solid rgba(253,249,245,0.2);
          border-radius: 10px;
          padding: 11px 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.84rem;
          color: #FDF9F5;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          resize: none;
          width: 100%;
        }
        .c-input::placeholder { color: rgba(253,249,245,0.3); }
        .c-input:focus {
          border-color: #FF7EDF;
          background: rgba(253,249,245,0.14);
        }

        textarea.c-input { height: 86px; line-height: 1.6; }

        .c-submit {
          margin-top: 18px;
          padding: 13px 36px;
          background: #FDF9F5;
          color: #5862E9;
          border: none;
          border-radius: 100vw;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.18s ease;
        }
        .c-submit:hover {
          background: #CC1F3A;
          color: #FDF9F5;
          transform: translateY(-2px);
        }
        .c-submit:active { transform: translateY(0); }

        /* sent state */
        .c-sent {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          gap: 10px;
          text-align: center;
        }
        .c-sent-mark {
          font-size: 2.4rem;
          color: #FF7EDF;
        }
        .c-sent-title {
          font-family: 'Italianno', cursive;
          font-size: 2.8rem;
          color: #FDF9F5;
        }
        .c-sent-sub {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(253,249,245,0.55);
        }

        /* ── FOOTER ROW ── */
        .c-footer {
          position: absolute;
          bottom: 10px;
          left: 48px;
          right: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 3;
        }

        .c-footer-logo {
          font-family: 'Italianno', cursive;
          font-size: 1.8rem;
          color: #FF7EDF;
          text-decoration: none;
        }

        .c-footer-links {
          display: flex;
          gap: 28px;
        }

        .c-footer-link {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #999;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .c-footer-link:hover { color: #CC1F3A; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: rotate(-6deg) translateX(-40px); }
          to   { opacity: 1; transform: rotate(-6deg) translateX(0); }
        }

        @media (max-width: 600px) {
          .c-section { padding: 60px 24px 80px; }
          .c-card { padding: 32px 28px; transform: rotate(-3deg); }
          .c-row { flex-direction: column; gap: 14px; }
          .c-footer { left: 24px; right: 24px; }
        }
      `}</style>

      <section className="c-section" id="contact">

        <h2 className="c-headline">CONTACT</h2>

        <div className="c-card-wrap">
          <div
            className="c-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {sent ? (
              <div className="c-sent">
                <div className="c-sent-mark">✦</div>
                <div className="c-sent-title">message sent!</div>
                <div className="c-sent-sub">I'll get back to you soon</div>
              </div>
            ) : (
              <>
                <div className="c-row">
                  <div className="c-field">
                    <label className="c-label">name</label>
                    <input className="c-input" type="text" placeholder="your name"
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="c-field">
                    <label className="c-label">email</label>
                    <input className="c-input" type="email" placeholder="your email"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div className="c-field">
                  <label className="c-label">message</label>
                  <textarea className="c-input" placeholder="tell me about your project..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button className="c-submit" onClick={handleSubmit}>send message →</button>
              </>
            )}
          </div>
        </div>

        <footer className="c-footer">
          <a className="c-footer-logo" href="#home">vrinda</a>
          <nav className="c-footer-links">
            <a className="c-footer-link" href="#">instagram</a>
            <a className="c-footer-link" href="#">linkedin</a>
            <a className="c-footer-link" href="mailto:hello@vrinda.design">email</a>
          </nav>
        </footer>

      </section>
    </>
  );
}
