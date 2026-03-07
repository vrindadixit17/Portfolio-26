import { useState } from "react";
import w1 from "../assets/works/NoireStudio.png";
import w2 from "../assets/works/HRMS.png";
import w3 from "../assets/works/FeastMonster.png";
import w4 from "../assets/works/Zine.png";
import w5 from "../assets/works/WellnessCo.png";

const works = [
  {
    num: "1",
    title: "NOIRE STUDIO",
    tag: "UI/UX Design",
    desc: "Brand identity & mobile app design for a luxury beauty studio. End-to-end design system.",
    img: w1,
  },
  {
    num: "2",
    title: "HRMs!",
    tag: "Web Design",
    desc: "Interactive admin dashboard page with motion-driven storytelling and scroll animations.",
    img: w2,
  },
  {
    num: "3",
    title: "FEAST MONSTER",
    tag: "Branding",
    desc: "Playful food brand identity — logo, packaging, and social media design kit.",
    img: w3,
  },
  {
    num: "4",
    title: "THE WAY",
    tag: "Editorial",
    desc: "Editorial layout design for an independent fashion zine. Typography-first approach.",
    img: w4,
  },
  {
    num: "5",
    title: "WELLNESS CO.",
    tag: "App Design",
    desc: "Health & wellness mobile experience. Clean UI with habit tracking and journaling.",
    img: w5,
  },
];

export default function Works() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap');

        .works-section {
          background: #FDF9F5;
          padding: 40px 48px 48px;
          font-family: 'DM Sans', sans-serif;
        }

        .works-title-row {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 20px;
        }
        .works-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          color: #1C1C1C;
          letter-spacing: 2px;
          margin: 0;
          line-height: 1;
        }
        .works-subtitle {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #aaa;
        }

        /* ── cards row ── */
        .works-cards {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        /* ── single card column (card + text below) ── */
        .work-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ── the black card ── */
        .work-card {
          background: #1C1C1C;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          aspect-ratio: 3 / 5;
          cursor: pointer;
        }

        /* hover image covers card */
        .work-card-img {
  position: absolute;
  inset: 0;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.35s ease;
}

.work-card:hover .work-card-img {
  opacity: 1;
}
        .work-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* placeholder tint when no image */
        .work-card-img-ph {
          width: 100%;
          height: 100%;
          background: #2a2a2a;
        }

        /* number always on top */
        .work-card-num {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22vw;
          line-height: 1;
          color: #DCFA40;
          z-index: 2;
          pointer-events: none;
          width: 100%;
          text-align: center;
        }

        /* see more pill inside card, bottom right */
        .work-card-cta {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          background: #FDF9F5;
          color: #1C1C1C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 5px 12px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        /* ── text below card ── */
        .work-below {
          padding: 14px 4px 0;
        }
        .work-below-tag {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ED6951;
          margin-bottom: 4px;
        }
        .work-below-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 1.5px;
          color: #1C1C1C;
          margin-bottom: 5px;
        }
        .work-below-desc {
          font-size: 0.72rem;
          color: #5862E9;
          line-height: 1.55;
        }
      `}</style>

      <section className="works-section">
        <div className="works-title-row">
          <h2 className="works-title">WORKS</h2>
          <span className="works-subtitle">selected projects</span>
        </div>

        <div className="works-cards">
          {works.map((w, i) => (
            <div className="work-col" key={i}>
              {/* BLACK CARD */}
              <div
                className="work-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* image on hover */}
                <div className="work-card-img">
                  {w.img
                    ? <img src={w.img} alt={w.title} />
                    : <div className="work-card-img-ph" />
                  }
                </div>

                {/* big number */}
                <div className="work-card-num">{w.num}</div>

                {/* see more button */}
                <button className="work-card-cta">see more &gt;</button>
              </div>

              {/* TEXT BELOW CARD */}
              <div className="work-below">
                <div className="work-below-tag">{w.tag}</div>
                <div className="work-below-title">{w.title}</div>
                <div className="work-below-desc">{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
