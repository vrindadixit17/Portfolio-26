import flowerImg from "../assets/emojis/flower.png";
import smileyImg from "../assets/emojis/smiley.png";
import cupImg from "../assets/emojis/cup.png";
import heartImg from "../assets/emojis/heart.png";
import starImg from "../assets/emojis/star.png";
import Navbar from "../components/Navbar";
import TextType from "../components/TextType";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Antigravity from "../components/Antigravity";

const cards = [
  {
    id: "edu",
    title: "Education",
    icon: flowerImg,
    bg: "#E8184A",
    textColor: "#FDF9F5",
    items: [
      "St. Gregorios School — Class XII · 92%",
      "MSIT — B.Tech ECE · 9.34 CGPA",
    ],
  },
  {
    id: "exp",
    title: "Experience",
    icon: smileyImg,
    bg: "#D4A8F0",
    textColor: "#1C1C1C",
    items: [
      "AICTE — Student Head & Coordinator",
      "Pledge A Smile Foundation — UI/UX Intern",
      "OpenLake IIT Bhilai — Design Trainee",
      "Effred Technologies — UI/UX Developer",
    ],
  },
  {
    id: "soft",
    title: "Software Skills",
    icon: cupImg,
    bg: "#DCFA40",
    textColor: "#1C1C1C",
    items: [
      "Full Stack: MERN (MongoDB, Express, React, Node)",
      "Languages: Python, Java, C/C++, SQL",
      "Tools: Figma, Adobe, PowerBI, Excel, MySQL",
    ],
  },
  {
    id: "misc",
    title: "Activities",
    icon: heartImg,
    bg: "#ED6951",
    textColor: "#FDF9F5",
    items: [
      "President — Astitva Dance Society, MSIT",
      "Head — Google Developers Group, MSIT",
      "Debate Equity Officer — Cerebrate",
      "CBS Codefest Design Apocalypse — Won",
    ],
  },
  {
    id: "research",
    title: "Research",
    icon: starImg,
    bg: "#5862E9",
    textColor: "#FDF9F5",
    items: [
      "Published: Cotton-Substrate Patch Antenna for Bluetooth — Nov 2025",
      "Wearable antenna for body-centric communication",
      "Stable performance under bending & on-body conditions",
    ],
  },
];

const baseTransforms = [
  "rotate(9.78deg)  translateX(-100px)",
  "rotate(-4.38deg) translateX(-50px)",
  "rotate(3.88deg)  translateX(0px)",
  "rotate(-1.38deg) translateX(50px)",
  "rotate(5.2deg)   translateX(100px)",
];

const getNoRotationTransform = (t) => t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
const getPushedTransform = (t, offsetX) => {
  const match = t.match(/translateX\(([-0-9.]+)px\)/);
  if (match) {
    const newX = parseFloat(match[1]) + offsetX;
    return t.replace(/translateX\(([-0-9.]+)px\)/, `translateX(${newX}px)`);
  }
  return `${t} translateX(${offsetX}px)`;
};


export default function SkillsPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.documentElement.getAttribute('data-theme') ||
      document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card", { scale: 0 }, { scale: 1, stagger: 0.06, ease: "elastic.out(1, 0.8)", delay: 0.3 });
      gsap.fromTo(".sp-tool-tag", { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.04, ease: "power2.out", delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const pushSiblings = (hoveredIdx) => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    cards.forEach((_, i) => {
      const target = q(`.skill-card-${i}`);
      gsap.killTweensOf(target);
      const base = baseTransforms[i];
      if (i === hoveredIdx) {
        gsap.to(target, { transform: getNoRotationTransform(base) + " translateY(-10px)", duration: 0.4, ease: "back.out(1.4)", overwrite: "auto", zIndex: 10 });
      } else {
        const offsetX = i < hoveredIdx ? -60 : 60;
        gsap.to(target, { transform: getPushedTransform(base, offsetX), duration: 0.4, ease: "back.out(1.4)", delay: Math.abs(hoveredIdx - i) * 0.05, overwrite: "auto" });
      }
    });
  };

  const resetAll = () => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    cards.forEach((_, i) => {
      const target = q(`.skill-card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, { transform: baseTransforms[i], duration: 0.4, ease: "back.out(1.4)", overwrite: "auto" });
    });
  };

  return (
    
    <>
    {/* ── FIXED FULL-PAGE BACKGROUND ── */}
<div style={{
  position: 'fixed', inset: 0,
  width: '100vw', height: '100vh',
  zIndex: 0, pointerEvents: 'none'
}}>
  <Antigravity
    count={300}
    magnetRadius={6}
    ringRadius={7}
    waveSpeed={0.4}
    waveAmplitude={1}
    particleSize={1.5}
    lerpSpeed={0.05}
    color="#5862E9"
    autoAnimate
    particleVariance={1}
    rotationSpeed={0}
    depthFactor={1}
    pulseSpeed={3}
    particleShape="capsule"
    fieldStrength={10}
  />
</div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=DM+Sans:wght@400;500;600&display=swap');

        .sp-wrap {
  background: transparent;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.4s ease, color 0.4s ease;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
}

        .sp-hero { padding: 16px 48px 0; }

        .sp-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-muted);
          background: none; border: none; cursor: pointer; padding: 0;
          margin-bottom: 12px; transition: color 0.2s ease;
        }
        .sp-back:hover { color: var(--red); }
        .sp-back:hover svg { transform: translateX(-3px); }
        .sp-back svg { transition: transform 0.2s ease; }

        .sp-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          color: var(--text); line-height: 0.88;
          letter-spacing: 0.02em; margin: 0;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* TextType inherits headline styles and renders in pink */
        .sp-headline .sp-typewriter {
          color: var(--pink);
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
        }
        .sp-headline .sp-typewriter .text-type__cursor {
          color: var(--pink);
          margin-left: 0.05em;
        }

        .sp-tagline {
          font-family: 'italianno';
          font-size: 1.5rem; font-weight: 500;
          color: var(--text-muted); margin-top: 12px;
          animation: fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── CARDS ── */
        .sp-cards-section { padding: 16px 48px 0; overflow: hidden; }
        .sp-section-header {
          display: flex; align-items: baseline; gap: 14px; margin-bottom: 24px;
        }
        .sp-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          color: var(--pink); letter-spacing: 2px; margin: 0; line-height: 1;
        }
        .sp-section-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-muted);
        }

        .skills-cards-row {
  display: flex; align-items: center; justify-content: center;
  position: relative; padding-top: 50px; padding-bottom: 40px; width: 100%;
  overflow: hidden;
}

        .skill-card {
          width: 210px; min-height: 290px; border-radius: 10px;
          padding: 60px 20px 26px; position: relative; flex-shrink: 0; cursor: default;
        }
        .skill-card-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem;
          letter-spacing: 1.5px; text-align: center; margin-bottom: 14px;
        }
        .skill-card ul {
          list-style: none; display: flex; flex-direction: column;
          gap: 9px; padding: 0; margin: 0;
        }
        .skill-card ul li {
          font-family: 'DM Sans', sans-serif; font-size: 0.74rem; font-weight: 500;
          line-height: 1.4; padding-left: 14px; position: relative;
        }
        .skill-card ul li::before { content: "•"; position: absolute; left: 2px; font-size: 0.9rem; }

        /* ── FOOTER ── */
        .sp-footer {
          border-top: 1px solid var(--divider); padding: 24px 48px;
          display: flex; justify-content: space-between; align-items: center; 
        }
        .sp-footer-logo {
          font-family: 'Italianno', cursive; font-size: 1.6rem;
          color: var(--blue); cursor: pointer;
        }
        .sp-footer-copy {
  font-size: 0.65rem; color: var(--blue);  letter-spacing: 0.08em;
}

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .sp-hero, .sp-cards-section, .sp-tools-section, .sp-footer { padding-left: 24px; padding-right: 24px; }
          .sp-tools-row { flex-direction: column; gap: 10px; }
        }
      `}</style>

      <div className="sp-wrap" ref={containerRef}>
        <Navbar rightAlign />

        <div className="sp-hero">
          <button className="sp-back" onClick={() => navigate(-1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            back
          </button>

          <h1 className="sp-headline">
            what i{" "}
            <TextType
              className="sp-typewriter"
              texts={["bring.", "know.", "build.", "design."]}
              typingSpeed={75}
              deletingSpeed={50}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              cursorBlinkDuration={0.5}
            />
          </h1>

          <p className="sp-tagline">skills, tools & everything in between</p>
        </div>

        {/* CARDS */}
        <div className="sp-cards-section">
          
          <div className="skills-cards-row">
            {cards.map((card, idx) => (
              <div
                key={card.id}
                className={`skill-card skill-card-${idx}`}
                style={{
                  background: card.bg,
                  transform: baseTransforms[idx],
                  marginLeft: idx === 0 ? "0" : "-28px",
                  zIndex: idx,
                }}
                onMouseEnter={() => pushSiblings(idx)}
                onMouseLeave={resetAll}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  style={{
                    position: "absolute", top: "-30px", left: "50%",
                    transform: "translateX(-50%)", width: "62px", height: "62px",
                    objectFit: "contain", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.15))",
                  }}
                />
                <div className="skill-card-title" style={{ color: card.textColor }}>
                  {card.title}
                </div>
                <ul>
                  {card.items.map((item, i) => (
                    <li key={i} style={{ color: card.textColor }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="sp-footer">
          <span className="sp-footer-logo" onClick={() => navigate('/home')}>vrinda</span>
          <span className="sp-footer-copy">© 2026 — all rights reserved</span>
        </div>
      </div>
    </>
  );
}
