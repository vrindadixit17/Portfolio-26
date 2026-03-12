import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { works } from "../components/Works";

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = works.find(w => w.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) {
    return (
      <div style={{ background: "#FDF9F5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        Project not found. <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=DM+Sans:wght@400;500&display=swap');

        .pp-wrap {
          background: #FDF9F5;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HERO ── */
        .pp-hero {
          padding: 48px 48px 0;
        }

        .pp-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #999;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 36px;
          transition: color 0.2s ease;
        }
        .pp-back:hover { color: #CC1F3A; }
        .pp-back:hover svg { transform: translateX(-3px); }
        .pp-back svg { transition: transform 0.2s ease; }

        .pp-meta {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .pp-tag {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ED6951;
          margin-bottom: 8px;
        }

        .pp-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 10vw, 8rem);
          color: #1C1C1C;
          line-height: 0.9;
          letter-spacing: 0.02em;
          margin: 0;
        }

        .pp-desc {
          max-width: 320px;
          font-size: 0.82rem;
          color: #666;
          line-height: 1.7;
          text-align: right;
          padding-bottom: 8px;
        }

        /* ── DIVIDER ── */
        .pp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0dbd5 20%, #e0dbd5 80%, transparent);
          margin: 32px 48px;
        }

        /* ── GALLERY ── */
        .pp-gallery {
          padding: 0 48px 80px;
          columns: 2;
          column-gap: 12px;
        }

        .pp-gallery-item {
          break-inside: avoid;
          margin-bottom: 12px;
          border-radius: 12px;
          overflow: hidden;
          background: #1C1C1C;
          animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .pp-gallery-item:nth-child(1) { animation-delay: 0s; }
        .pp-gallery-item:nth-child(2) { animation-delay: 0.06s; }
        .pp-gallery-item:nth-child(3) { animation-delay: 0.12s; }
        .pp-gallery-item:nth-child(4) { animation-delay: 0.18s; }
        .pp-gallery-item:nth-child(5) { animation-delay: 0.24s; }
        .pp-gallery-item:nth-child(6) { animation-delay: 0.30s; }

        .pp-gallery-item.full {
          column-span: all;
          margin-bottom: 12px;
        }

        .pp-gallery-item img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        /* empty state */
        .pp-empty {
          column-span: all;
          text-align: center;
          padding: 80px 0;
          font-size: 0.8rem;
          color: #bbb;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── FOOTER ── */
        .pp-footer {
          border-top: 1px solid #e8e3dc;
          padding: 28px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pp-footer-logo {
          font-family: 'Italianno', cursive;
          font-size: 1.6rem;
          color: #FF7EDF;
          text-decoration: none;
          cursor: pointer;
        }

        .pp-footer-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.1em;
          color: #ddd;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .pp-hero { padding: 32px 24px 0; }
          .pp-divider { margin: 24px 24px; }
          .pp-gallery { padding: 0 24px 60px; columns: 1; }
          .pp-footer { padding: 24px; }
          .pp-meta { flex-direction: column; align-items: flex-start; }
          .pp-desc { text-align: left; }
        }
      `}</style>

      <div className="pp-wrap">
        <div className="pp-hero">
          <button className="pp-back" onClick={() => navigate(-1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            back to works
          </button>

          <div className="pp-meta">
            <div>
              <div className="pp-tag">{project.tag}</div>
              <h1 className="pp-title">{project.title}</h1>
            </div>
            <p className="pp-desc">{project.desc}</p>
          </div>
        </div>

        <div className="pp-divider" />

        <div className="pp-gallery">
          {project.images && project.images.length > 0 ? (
            project.images.map((src, i) => (
              <div key={i} className={`pp-gallery-item${i === 0 ? ' full' : ''}`}>
                <img src={src} alt={`${project.title} ${i + 1}`} />
              </div>
            ))
          ) : (
            <div className="pp-empty">images coming soon</div>
          )}
        </div>

        <div className="pp-footer">
          <span className="pp-footer-logo" onClick={() => navigate("/")}>vrinda</span>
          <span className="pp-footer-num">0{project.num} / 05</span>
        </div>
      </div>
    </>
  );
}
