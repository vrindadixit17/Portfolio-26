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

  const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) return;

  try {
    const res = await fetch("https://formspree.io/f/meenjkjk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    if (res.ok) {
      setSent(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    alert("Network error. Please try again.");
  }
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
          padding: 80px 48px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          transition: background 0.4s ease;
        }

        /* ── BIG RED HEADLINE ── */
        .c-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(7rem, 20vw, 18rem);
          color: var(--red);
          line-height: 0.88;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
          user-select: none;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── BODY ROW ── */
        .c-body {
          display: flex;
          align-items: center;
          gap: 80px;
          position: relative;
          z-index: 2;
          margin-top: -3.5vw;
        }

        /* ── TILTED CARD ── */
        .c-card-wrap {
          flex: 1.2;
          perspective: 1000px;
        }

        .c-card {
          background: var(--blue);
          border-radius: 10px;
          padding: 44px 48px;
          transform: rotate(-6deg);
          transform-origin: left center;
          transition: transform 0.25s ease;
          will-change: transform;
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
          border-color: var(--pink);
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
          background: var(--red);
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
        .c-sent-mark { font-size: 2.4rem; color: var(--pink); }
        .c-sent-title { font-family: 'Italianno', cursive; font-size: 1.6rem; color: #FDF9F5; }
        .c-sent-sub { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(253,249,245,0.55); }

        /* ── RIGHT INFO PANEL ── */
        .c-info {
          flex: 0.8;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .c-info-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 14px 0;
          border-bottom: 1px solid var(--divider);
          justify-content: center;
        }
        .c-info-item:first-child { padding-top: 0; }
        .c-info-item:last-child { border-bottom: none; }

        .c-info-icon {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .c-info-label {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .c-info-value {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s ease;
          font-family: 'Poppins', sans-serif;
        }
        a.c-info-value:hover { color: var(--red); }

        /* ── FOOTER ROW ── */
        .c-footer {
          position: absolute;
          bottom: 28px;
          left: 48px;
          right: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 3;
          border-top: 1px solid var(--divider);
          padding-top: 16px;
        }

        .c-footer-logo {
          font-family: 'Italianno', cursive;
          font-size: 1.6rem;
          color: var(--pink);
          text-decoration: none;
        }

        .c-footer-copy {
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .c-footer-links { display: flex; gap: 28px; }

        .c-footer-link {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .c-footer-link:hover { color: var(--red); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: rotate(-6deg) translateX(-40px); }
          to   { opacity: 1; transform: rotate(-6deg) translateX(0); }
        }

        @media (max-width: 768px) {
          .c-body { flex-direction: column; gap: 40px; margin-top: 20px; }
          .c-card-wrap { width: 100%; }
          .c-card { transform: rotate(-3deg); padding: 32px 28px; }
          .c-info { width: 100%; }
          .c-section { padding: 60px 24px 100px; }
          .c-footer { left: 24px; right: 24px; }
        }
      `}</style>

      <section className="c-section" id="contact">

        <h2 className="c-headline">CONTACT</h2>

        <div className="c-body">

          {/* LEFT: tilted form card */}
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

          {/* RIGHT: contact info */}
          <div className="c-info">
            <div className="c-info-item">
              <span className="c-info-icon">📍</span>
              <span className="c-info-label">Find me</span>
              <span className="c-info-value">New Delhi, India</span>
            </div>
            <div className="c-info-item">
              <span className="c-info-icon">✉️</span>
              <span className="c-info-label">Mail me</span>
              <a className="c-info-value" href="mailto:dixitvrinda1704@gmail.com">dixitvrinda1704@gmail.com</a>
            </div>
            <div className="c-info-item">
              <span className="c-info-icon">📸</span>
              <span className="c-info-label">Follow</span>
              <a className="c-info-value" href="#">@vrinda.design</a>
            </div>
            <div className="c-info-item">
              <span className="c-info-icon">💼</span>
              <span className="c-info-label">LinkedIn</span>
              <a className="c-info-value" href="#">vrinda dixit</a>
            </div>
          </div>

        </div>

        <footer className="c-footer">
          <a className="c-footer-logo" href="#home">vrinda</a>
          <span className="c-footer-copy">© 2026 — all rights reserved</span>
          <nav className="c-footer-links">
            <a className="c-footer-link" href="#">instagram</a>
            <a className="c-footer-link" href="#">linkedin</a>
            <a className="c-footer-link" href="mailto:dixitvrinda1704@gmail.com">email</a>
          </nav>
        </footer>

      </section>
    </>
  );
}