import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/about/about1.png";
import TextPressure from "../components/TextPressure";
import CircularText from "../components/CircularText";
import guava from "../assets/emojis/guava.png";
import orange from "../assets/emojis/orange.png";
import tomato from "../assets/emojis/tomato.png";
import lemon from "../assets/emojis/lemon.png";
import strawberry from "../assets/emojis/strawberry.png";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes tiltIn1 {
    from { opacity: 0; transform: rotate(3deg) translateY(20px); }
    to   { opacity: 1; transform: rotate(3deg) translateY(0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fruitPop {
    from { opacity: 0; transform: scale(0.3); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes fruitFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }

  .about2-section {
    background: var(--bg);
    min-height: 100vh;
    padding: 0;
    display: grid;
    grid-template-columns: 0.7fr 1fr;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.4s ease;
    position: relative;
  }

  .about2-star-deco {
    position: absolute;
    user-select: none;
    pointer-events: none;
    opacity: 1;
  }

  /* ═══════════════════════════════
     LEFT PANEL
  ═══════════════════════════════ */
  .about2-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 36px 36px 44px;
    position: relative;
    z-index: 2;
    border-right: 1px solid var(--divider);
  }

  .about2-top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    animation: fadeIn 0.6s 0.1s both;
    margin-bottom: -8px;
  }

  .about2-circular-wrap {
    width: 110px;
    height: 110px;
    position: relative;
    flex-shrink: 0;
  }
  .about2-circular-wrap .circular-text {
    width: 110px !important;
    height: 110px !important;
    color: #E11D48 !important;
  }
  .about2-circular-wrap .circular-text span {
    font-size: 10px !important;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
  .about2-circular-center {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #ED6951;
    pointer-events: none;
    z-index: 10;
  }

  .about2-intro-label { text-align: right; }
  .about2-intro-label span {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text);
    line-height: 1.8;
  }
  .about2-intro-label strong {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    color: var(--blue);
    letter-spacing: 0.06em;
    line-height: 1;
    margin-top: 4px;
  }

  .about2-name-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 8px 0;
    animation: fadeUp 0.7s 0.2s both;
  }
  .about2-my-name-is {
    font-family: 'Italianno', cursive;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--text);
    margin-bottom: 2px;
  }
  .about2-name-row {
    width: 100%;
    height: clamp(100px, 13vw, 168px);
  }

  .about2-contact-row {
    display: flex;
    flex-direction: column;
    gap: 9px;
    animation: fadeUp 0.7s 0.4s both;
  }
  .about2-contact-item {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .about2-contact-key {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.52rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text);
    min-width: 52px;
  }
  .about2-contact-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--text);
    text-decoration: none;
    transition: color 0.2s;
  }
  a.about2-contact-val:hover { color: var(--pink); }

  .about2-divider {
    height: 1px;
    background: var(--divider);
    margin: 4px 0;
  }

  .about2-cta {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--rose);
    color: #FDF9F5;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 10px 22px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    width: fit-content;
  }
  .about2-cta:hover {
    background: var(--blue);
    color: var(--bg);
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════
     RIGHT PANEL
  ═══════════════════════════════ */
  .about2-right {
    display: grid;
    grid-template-rows: 1fr 1fr;
    position: relative;
    overflow: visible;
  }

  .about2-right-top {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid var(--divider);
    position: relative;
    overflow: visible;
  }

  .about2-bio-col {
    flex: 1;
    padding: 40px 28px 28px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fadeUp 0.7s 0.3s both;
    overflow: visible;
  }

  .about2-section-eyebrow {
    font-family: 'Italianno', cursive;
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--text);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .about2-section-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: var(--pink);
    flex-shrink: 0;
  }

  .about2-bio-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.5rem, 2.6vw, 2.4rem);
    color: var(--blue);
    letter-spacing: 0.04em;
    line-height: 1;
    margin: 0 0 12px 0;
  }
  .about2-bio-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    line-height: 1.8;
    color: var(--text);
    margin: 0;
    font-weight: 300;
    font-style: italic;
  }

  /* ══════════════════════════
     TICKET STUB
  ══════════════════════════ */
  .ticket {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 28px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.95rem;
    letter-spacing: 0.1em;
    border-radius: 4px;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    animation: fadeUp 0.6s both;
    overflow: visible;
  }
  .ticket::before,
  .ticket::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--bg);
    z-index: 2;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }
  .ticket::before { left: -6px; }
  .ticket::after  { right: -6px; }
  .ticket.shape-left::after   { display: none; }
  .ticket.shape-right::before { display: none; }
  .ticket.shape-none::before,
  .ticket.shape-none::after   { display: none; }
  .ticket.shape-wave { border-radius: 50px 8px 50px 8px; }
  .ticket.shape-wave::before,
  .ticket.shape-wave::after { display: none; }
  .ticket.shape-tag { border-radius: 4px 20px 20px 4px; }
  .ticket.shape-tag::before { display: none; }
  .ticket.shape-slash {
    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
    border-radius: 0;
    padding: 7px 34px;
  }
  .ticket.shape-slash::before,
  .ticket.shape-slash::after { display: none; }

  .about2-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 22px;
    margin-top: 12px;
    padding: 4px 10px;
    overflow: visible;
  }
  .about2-tags .ticket {
    cursor: default;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .about2-tags .ticket:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
  .about2-tags .ticket:nth-child(1) { transform: rotate(-2deg);   animation-delay: 0.50s; }
  .about2-tags .ticket:nth-child(2) { transform: rotate(1.5deg);  animation-delay: 0.58s; }
  .about2-tags .ticket:nth-child(3) { transform: rotate(-1deg);   animation-delay: 0.66s; }
  .about2-tags .ticket:nth-child(4) { transform: rotate(2deg);    animation-delay: 0.74s; }
  .about2-tags .ticket:nth-child(5) { transform: rotate(-2.5deg); animation-delay: 0.82s; }
  .about2-tags .ticket:nth-child(6) { transform: rotate(1deg);    animation-delay: 0.90s; }
  .about2-tags .ticket:nth-child(7) { transform: rotate(-1.5deg); animation-delay: 0.98s; }
  .about2-tags .ticket:nth-child(1):hover { transform: rotate(-1deg)   scale(1.04); }
  .about2-tags .ticket:nth-child(2):hover { transform: rotate(0.5deg)  scale(1.04); }
  .about2-tags .ticket:nth-child(3):hover { transform: rotate(0deg)    scale(1.04); }
  .about2-tags .ticket:nth-child(4):hover { transform: rotate(1deg)    scale(1.04); }
  .about2-tags .ticket:nth-child(5):hover { transform: rotate(-1deg)   scale(1.04); }
  .about2-tags .ticket:nth-child(6):hover { transform: rotate(0.5deg)  scale(1.04); }
  .about2-tags .ticket:nth-child(7):hover { transform: rotate(0deg)    scale(1.04); }

  /* ══════════════════════════
     IMAGE + FRUIT STICKERS
  ══════════════════════════ */
  .about2-img-col {
    width: 34%;
    position: relative;
    overflow: visible;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 16px 20px 0;
  }
  .about2-img-main {
    width: 100%;
    height: 85%;
    object-fit: cover;
    object-position: top center;
    border-radius: 14px;
    transform: rotate(3deg);
    box-shadow: 0 16px 40px rgba(0,0,0,0.14);
    animation: tiltIn1 0.8s 0.5s cubic-bezier(.22,1,.36,1) both;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
  }
  .about2-img-main:hover { transform: rotate(1.5deg) scale(1.02); }

  .about2-fruit {
    position: absolute;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
    animation: fruitPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    z-index: 10;
  }

  .about2-fruit-1 {
    width: 56px; top: -20px; left: -10px;
    transform: rotate(-20deg);
    animation-delay: 0.55s;
    animation: fruitPop 0.5s 0.55s cubic-bezier(0.34,1.56,0.64,1) both,
               fruitFloat 3.2s 1.1s ease-in-out infinite;
  }
  .about2-fruit-2 {
    width: 50px; top: 8%; right: -22px;
    transform: rotate(14deg);
    animation-delay: 0.7s;
    animation: fruitPop 0.5s 0.7s cubic-bezier(0.34,1.56,0.64,1) both,
               fruitFloat 2.8s 1.2s ease-in-out infinite;
  }
  .about2-fruit-3 {
    width: 44px; bottom: 22%; left: -20px;
    transform: rotate(-10deg);
    animation-delay: 0.85s;
    animation: fruitPop 0.5s 0.85s cubic-bezier(0.34,1.56,0.64,1) both,
               fruitFloat 3.6s 1.3s ease-in-out infinite;
  }
  .about2-fruit-4 {
    width: 52px; bottom: -16px; right: 10%;
    transform: rotate(18deg);
    animation-delay: 1s;
    animation: fruitPop 0.5s 1s cubic-bezier(0.34,1.56,0.64,1) both,
               fruitFloat 3s 1.4s ease-in-out infinite;
  }
  .about2-fruit-5 {
    width: 48px; bottom: -14px; left: 14%;
    transform: rotate(-6deg);
    animation-delay: 1.15s;
    animation: fruitPop 0.5s 1.15s cubic-bezier(0.34,1.56,0.64,1) both,
               fruitFloat 3.4s 1.5s ease-in-out infinite;
  }

  /* bottom half */
  .about2-right-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .about2-avail-col {
    padding: 28px 28px 28px 36px;
    border-right: 1px solid var(--divider);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fadeUp 0.7s 0.5s both;
    position: relative;
    overflow: hidden;
  }
  .about2-avail-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.3rem, 2vw, 1.9rem);
    color: var(--blue);
    letter-spacing: 0.04em;
    line-height: 1;
    margin: 0 0 10px 0;
  }
  .about2-avail-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.73rem;
    font-weight: 300;
    font-style: italic;
    line-height: 1.7;
    color: var(--text);
    margin: 0 0 12px 0;
  }

  /* marquee */
  .about2-marquee-wrap {
    overflow: hidden;
    border-top: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
    padding: 9px 0;
  }
  .about2-marquee {
    display: flex;
    animation: marquee 14s linear infinite;
    white-space: nowrap;
    width: max-content;
  }
  .about2-marquee span {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.14em;
    color: var(--text);
    padding: 0 14px;
  }
  .about2-marquee span.accent { color: #ED6951; padding: 0 6px; }

  /* stats */
  .about2-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .about2-stat-item {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .about2-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: var(--blue);
    line-height: 1;
  }
  .about2-stat-num.pink   { color: var(--pink); }
  .about2-stat-num.orange { color: var(--orange); }
  .about2-stat-num.rose   { color: var(--rose); }
  .about2-stat-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 300;
    font-style: italic;
    color: var(--text);
  }

  /* research paper card */
  .about2-paper {
    border: 1.5px solid var(--divider);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .about2-paper:hover { border-color: var(--orange); }
  .about2-paper::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: linear-gradient(to bottom, var(--orange), var(--rose));
  }
  .about2-paper-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--orange);
  }
  .about2-paper-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text);
    line-height: 1.5;
  }
  .about2-paper-date {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: var(--rose);
  }

  .about2-quote-col {
    padding: 24px 32px 24px 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 14px;
    animation: fadeUp 0.7s 0.6s both;
  }
  .about2-quote {
    font-family: 'Italianno', cursive;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    color: #E11D48;
    line-height: 1.2;
    margin: 0;
  }
  .about2-quote em { color: #ED6951; font-style: normal; }

  .about2-based { display: flex; flex-direction: column; gap: 2px; }
  .about2-based-label {
    font-family: 'Italianno', cursive;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--text);
  }
  .about2-based-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text);
  }

  .about2-accent-line {
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: 3px;
    background: linear-gradient(to right, #FF7EDF, #ED6951, #DCFA40, #5862E9, #E11D48, transparent);
    pointer-events: none;
  }

  /* ═══════════════════════════════
     MOBILE
  ═══════════════════════════════ */
  @media (max-width: 768px) {
    .about2-section {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .about2-left {
      border-right: none;
      border-bottom: 1px solid var(--divider);
      padding: 32px 24px 28px;
    }
    .about2-name-row {
      height: clamp(70px, 18vw, 110px);
    }
    .about2-right {
      grid-template-rows: auto auto;
    }
    .about2-right-top {
      flex-direction: column-reverse;
      border-bottom: 1px solid var(--divider);
    }
    .about2-img-col {
      width: 100%;
      padding: 24px 24px 0;
      height: 260px;
      justify-content: center;
    }
    .about2-img-main {
      width: 160px;
      height: 100%;
      transform: rotate(3deg);
    }
    .about2-bio-col {
      padding: 24px 24px 28px;
    }
    .about2-right-bottom {
      grid-template-columns: 1fr;
    }
    .about2-avail-col {
      border-right: none;
      border-bottom: 1px solid var(--divider);
      padding: 24px;
    }
    .about2-quote-col {
      padding: 24px;
    }
    .about2-tags {
      gap: 8px 14px;
    }
    .about2-stat-num {
      font-size: 1.6rem;
    }
    .about2-circular-wrap {
      width: 90px;
      height: 90px;
    }
    .about2-circular-wrap .circular-text {
      width: 90px !important;
      height: 90px !important;
    }
    .about2-star-deco {
      display: none;
    }
    .about2-fruit {
      display: none;
    }
  }
`;

export default function About() {
  const injected = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  const marqueeItems = [
    "UI/UX Design", "MERN Stack", "Electronics", "Figma",
    "React", "Branding", "Node.js", "Antenna Research", "Python", "Full Stack Dev"
  ];

  return (
    <section className="about2-section">

      <span className="about2-star-deco" style={{ top: "6%",  left: "44%",  fontSize: "0.7rem", color: "#FF7EDF" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "14%", left: "68%",  fontSize: "1.1rem", color: "#DCFA40" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "28%", left: "52%",  fontSize: "0.5rem", color: "#5862E9" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "38%", left: "88%",  fontSize: "0.9rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "52%", left: "47%",  fontSize: "0.6rem", color: "#FF7EDF" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "61%", left: "74%",  fontSize: "1.2rem", color: "#DCFA40" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "72%", left: "58%",  fontSize: "0.5rem", color: "#E11D48" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "82%", left: "34%",  fontSize: "0.8rem", color: "#5862E9" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "90%", left: "80%",  fontSize: "1rem",   color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "45%", left: "22%",  fontSize: "0.6rem", color: "#FF7EDF" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "78%", left: "12%",  fontSize: "0.9rem", color: "#DCFA40" }}>✦</span>

      {/* ══ LEFT PANEL ══ */}
      <div className="about2-left">

        <div className="about2-top-row">
          <div className="about2-circular-wrap">
            <CircularText
              text="VRINDA DIXIT ✦ PORTFOLIO 2026 ✦ "
              spinDuration={18}
              onHover="speedUp"
            />
            <div className="about2-circular-center">✦</div>
          </div>
          <div className="about2-intro-label">
            <span>ui/ux designer</span>
            <span>full stack dev</span>
            <strong>New Delhi, IN</strong>
          </div>
        </div>

        <div className="about2-name-block">
          <p className="about2-my-name-is">my name is</p>
          <div className="about2-name-row">
            <TextPressure
              text="vrinda"
              flex={true} alpha={false} stroke={true}
              scale={true} width={true} weight={true} italic={false}
              textColor="var(--blue)" strokeColor="var(--blue)" minFontSize={50}
            />
          </div>
          <div className="about2-name-row">
            <TextPressure
              text="dixit"
              flex={true} alpha={false} stroke={true}
              scale={true} width={true} weight={true} italic={false}
              textColor="var(--pink)" strokeColor="var(--pink)" minFontSize={50}
            />
          </div>
        </div>

        <div className="about2-contact-row">
          <div className="about2-divider" />
          <div className="about2-contact-item">
            <span className="about2-contact-key">Email</span>
            <a className="about2-contact-val" href="mailto:dixitvrinda1704@gmail.com">
              dixitvrinda1704@gmail.com
            </a>
          </div>
          <div className="about2-contact-item">
            <span className="about2-contact-key">Stack</span>
            <span className="about2-contact-val">React · Node · Figma · Python · MongoDB</span>
          </div>
          <div className="about2-contact-item">
            <span className="about2-contact-key">Open to</span>
            <span className="about2-contact-val">Freelance & Full-time ✦</span>
          </div>
          <div className="about2-divider" />
          <button className="about2-cta" onClick={() => navigate('/skills')}>
            see more →
          </button>
        </div>

      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="about2-right">

        <div className="about2-right-top">
          <div className="about2-bio-col">
            <div>
              <p className="about2-section-eyebrow">about me</p>
              <h2 className="about2-bio-heading">design that's felt,<br />not just seen.</h2>
              <p className="about2-bio-text">
                b.tech ece student at msit · ui/ux designer · full stack developer · published researcher. i build pixel-perfect figma prototypes, production-ready mern stack apps, and have published work on antenna engineering for bluetooth applications.
              </p>
            </div>

            <div className="about2-tags">
              <span className="ticket shape-both"  style={{ background: '#5862E9', color: '#FDF9F5' }}>UI/UX Design</span>
              <span className="ticket shape-left"  style={{ background: '#FF7EDF', color: '#1C1C1C' }}>Full Stack</span>
              <span className="ticket shape-slash" style={{ background: '#DCFA40', color: '#1C1C1C' }}>Figma</span>
              <span className="ticket shape-right" style={{ background: '#ED6951', color: '#FDF9F5' }}>React</span>
              <span className="ticket shape-wave"  style={{ background: '#E11D48', color: '#FDF9F5' }}>Branding</span>
              <span className="ticket shape-both"  style={{ background: '#1C1C1C', color: '#DCFA40' }}>Electronics</span>
            </div>
          </div>

          {/* ══ PHOTO + FRUIT STICKERS ══ */}
          <div className="about2-img-col">

            <img src={strawberry} alt="" aria-hidden="true"
              className="about2-fruit about2-fruit-1" />

            <img src={orange} alt="" aria-hidden="true"
              className="about2-fruit about2-fruit-2" />

            <img src={lemon} alt="" aria-hidden="true"
              className="about2-fruit about2-fruit-3" />

            <img src={tomato} alt="" aria-hidden="true"
              className="about2-fruit about2-fruit-4" />

            <img src={guava} alt="" aria-hidden="true"
              className="about2-fruit about2-fruit-5" />

            <img className="about2-img-main" src={img1} alt="Vrinda Dixit" />
          </div>
        </div>

        <div className="about2-right-bottom">

          <div className="about2-avail-col">
            <div>
              <p className="about2-section-eyebrow">availability</p>
              <h3 className="about2-avail-heading">open to<br />opportunities</h3>
              <p className="about2-avail-text">
                b.tech ece @ msit · 9.34 cgpa · currently based in delhi — available for freelance, full-time & research collaborations.
              </p>
            </div>

            <div className="about2-marquee-wrap">
              <div className="about2-marquee">
                {[...Array(2)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    {marqueeItems.map((item, j) => (
                      <span key={`${i}-${j}`}>
                        {item === marqueeItems[j] && j > 0
                          ? <><span className="accent">✦</span>{item}</>
                          : item
                        }
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about2-quote-col">
            <p className="about2-quote">
              "the best products are both beautiful <em>and</em> purposeful."
            </p>

            <div className="about2-paper">
              <span className="about2-paper-label">✦ published research</span>
              <span className="about2-paper-title">
                Performance Analysis of a Cotton-Substrate Patch Antenna for Bluetooth Applications Under Bending & On-Body Conditions
              </span>
              <span className="about2-paper-date">Nov 2025</span>
            </div>

            <div className="about2-stats">
              <div className="about2-stat-item">
                <span className="about2-stat-num">4+</span>
                <span className="about2-stat-label">internships completed</span>
              </div>
              <div className="about2-stat-item">
                <span className="about2-stat-num pink">9.34</span>
                <span className="about2-stat-label">cgpa · b.tech ece</span>
              </div>
              <div className="about2-stat-item">
                <span className="about2-stat-num orange">1</span>
                <span className="about2-stat-label">published research paper</span>
              </div>
              <div className="about2-stat-item">
                <span className="about2-stat-num rose">∞</span>
                <span className="about2-stat-label">curiosity & drive</span>
              </div>
            </div>

          </div>

        </div>

        <div className="about2-accent-line" />
      </div>

    </section>
  );
}