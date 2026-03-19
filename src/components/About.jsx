import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/about/about1.png";
import TextPressure from "../components/TextPressure";
import CircularText from "../components/CircularText";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --orange: #ED6951;
    --pink:   #FF7EDF;
    --bg:     #FDF9F5;
    --blue:   #5862E9;
    --yellow: #DCFA40;
    --text:   #1C1C1C;
    --rose:   #E11D48;
  }

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
    border-right: 1px solid rgba(28,28,28,0.1);
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
    color: #1C1C1C;
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
    color: #1C1C1C;
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
    color: #1C1C1C;
    min-width: 52px;
  }
  .about2-contact-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: #1C1C1C;
    text-decoration: none;
    transition: color 0.2s;
  }
  a.about2-contact-val:hover { color: var(--pink); }

  .about2-divider {
    height: 1px;
    background: rgba(28,28,28,0.15);
    margin: 4px 0;
  }

  .about2-cta {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--red);
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
    border-bottom: 1px solid rgba(28,28,28,0.1);
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
    color: #1C1C1C;
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
    color: #1C1C1C;
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
  }
  .about2-img-main:hover { transform: rotate(1.5deg) scale(1.02); }

  /* bottom half */
  .about2-right-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .about2-avail-col {
    padding: 28px 28px 28px 36px;
    border-right: 1px solid rgba(28,28,28,0.1);
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
    color: #1C1C1C;
    margin: 0 0 12px 0;
  }

  /* marquee */
  .about2-marquee-wrap {
    overflow: hidden;
    border-top: 1px solid rgba(28,28,28,0.1);
    border-bottom: 1px solid rgba(28,28,28,0.1);
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
    color: #1C1C1C;
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
    color: #1C1C1C;
  }

  /* research paper card */
  .about2-paper {
    border: 1.5px solid rgba(28,28,28,0.12);
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
    color: #1C1C1C;
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
    color: #1C1C1C;
  }
  .about2-based-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: #1C1C1C;
  }

  .about2-accent-line {
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: 3px;
    background: linear-gradient(to right, #FF7EDF, #ED6951, #DCFA40, #5862E9, #E11D48, transparent);
    pointer-events: none;
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

      <span className="about2-star-deco" style={{ top: "6%",  left: "44%",  fontSize: "0.7rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "14%", left: "68%",  fontSize: "1.1rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "28%", left: "52%",  fontSize: "0.5rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "38%", left: "88%",  fontSize: "0.9rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "52%", left: "47%",  fontSize: "0.6rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "61%", left: "74%",  fontSize: "1.2rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "72%", left: "58%",  fontSize: "0.5rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "82%", left: "34%",  fontSize: "0.8rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "90%", left: "80%",  fontSize: "1rem",   color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "45%", left: "22%",  fontSize: "0.6rem", color: "#ED6951" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "78%", left: "12%",  fontSize: "0.9rem", color: "#ED6951" }}>✦</span>

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
              <span className="ticket shape-right" style={{ background: '#ED6951', color: '#1C1C1C', outline: '1.5px solid #1C1C1C' }}>React</span>
              <span className="ticket shape-wave"  style={{ background: '#E11D48', color: '#FDF9F5' }}>Branding</span>
              <span className="ticket shape-both"  style={{ background: '#1C1C1C', color: '#DCFA40' }}>Electronics</span>
            </div>
          </div>

          <div className="about2-img-col">
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

            {/* research paper */}
            <div className="about2-paper">
              <span className="about2-paper-label">✦ published research</span>
              <span className="about2-paper-title">
                Performance Analysis of a Cotton-Substrate Patch Antenna for Bluetooth Applications Under Bending & On-Body Conditions
              </span>
              <span className="about2-paper-date">Nov 2025</span>
            </div>

            {/* stats */}
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
