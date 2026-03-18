import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/about/about1.png";
import img2 from "../assets/about/about2.png";
import TextPressure from "../components/TextPressure";
import CircularText from "../components/CircularText";

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
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tiltIn2 {
    from { opacity: 0; transform: rotate(-4deg) translateY(20px); }
    to   { opacity: 1; transform: rotate(-4deg) translateY(0); }
  }

  .about2-section {
    background: var(--bg, #FDF9F5);
    min-height: 100vh;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.4s ease;
    position: relative;
  }

  .about2-star-deco {
    position: absolute;
    color: var(--pink, #FF7EDF);
    user-select: none;
    pointer-events: none;
    opacity: 0.5;
  }

  /* ═══════════════════════════════
     LEFT PANEL
  ═══════════════════════════════ */
  .about2-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 48px 40px 56px;
    position: relative;
    z-index: 2;
    border-right: 1px solid rgba(28,28,28,0.08);
  }

  .about2-top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    animation: fadeIn 0.6s 0.1s both;
  }

  /* Scale down the 200×200 CircularText to 110×110 */
  .about2-circular-wrap {
    width: 110px;
    height: 110px;
    position: relative;
    flex-shrink: 0;
  }
  .about2-circular-wrap .circular-text {
    width: 110px !important;
    height: 110px !important;
    color: var(--blue, #2B2D8E) !important;
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
    color: var(--pink, #FF7EDF);
    pointer-events: none;
    z-index: 10;
  }

  .about2-intro-label { text-align: right; }
  .about2-intro-label span {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.35);
    line-height: 1.8;
  }
  .about2-intro-label strong {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    color: var(--blue, #2B2D8E);
    letter-spacing: 0.06em;
    line-height: 1;
    margin-top: 4px;
  }

  .about2-name-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 0;
    animation: fadeUp 0.7s 0.2s both;
  }
  .about2-my-name-is {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    margin-bottom: 4px;
  }
  .about2-name-italianno {
    font-family: 'Italianno', cursive;
    font-size: clamp(3.2rem, 5.5vw, 5rem);
    color: var(--blue, #2B2D8E);
    line-height: 0.9;
    margin: 0 0 6px 0;
  }
  .about2-name-bebas {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3.5rem, 6vw, 5.5rem);
    color: var(--pink, #FF7EDF);
    letter-spacing: 0.04em;
    line-height: 1;
    margin: 0;
  }
  .about2-role-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    background: var(--blue, #2B2D8E);
    color: var(--bg, #FDF9F5);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 100px;
    width: fit-content;
  }
  .about2-role-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--pink, #FF7EDF);
  }

  .about2-contact-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeUp 0.7s 0.4s both;
  }
  .about2-contact-item {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .about2-contact-key {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.35);
    min-width: 54px;
  }
  .about2-contact-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 400;
    color: var(--text, #1C1C1C);
    text-decoration: none;
    transition: color 0.2s;
  }
  a.about2-contact-val:hover { color: var(--pink, #FF7EDF); }

  .about2-divider {
    height: 1px;
    background: rgba(28,28,28,0.1);
    margin: 6px 0;
  }

  .about2-cta {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--pink, #FF7EDF);
    color: #1C1C1C;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 11px 24px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    width: fit-content;
  }
  .about2-cta:hover {
    background: var(--blue, #2B2D8E);
    color: #FDF9F5;
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════
     RIGHT PANEL
  ═══════════════════════════════ */
  .about2-right {
    display: grid;
    grid-template-rows: 1fr 1fr;
    position: relative;
    overflow: hidden;
  }

  .about2-right-top {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid rgba(28,28,28,0.08);
    position: relative;
  }

  .about2-bio-col {
    flex: 1;
    padding: 48px 32px 32px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fadeUp 0.7s 0.3s both;
  }

  .about2-section-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.3);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .about2-section-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: var(--pink, #FF7EDF);
  }

  .about2-bio-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.6rem, 2.8vw, 2.6rem);
    color: var(--blue, #2B2D8E);
    letter-spacing: 0.04em;
    line-height: 1;
    margin: 0 0 14px 0;
  }
  .about2-bio-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    line-height: 1.8;
    color: rgba(28,28,28,0.6);
    margin: 0;
    font-weight: 300;
    font-style: italic;
  }

  .about2-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
  }
  .about2-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 100px;
    border: 1.5px solid;
    transition: background 0.2s, color 0.2s;
    cursor: default;
  }
  .about2-tag.blue { border-color: var(--blue, #2B2D8E); color: var(--blue, #2B2D8E); }
  .about2-tag.blue:hover { background: var(--blue, #2B2D8E); color: #FDF9F5; }
  .about2-tag.pink { border-color: var(--pink, #FF7EDF); color: var(--pink, #FF7EDF); }
  .about2-tag.pink:hover { background: var(--pink, #FF7EDF); color: #1C1C1C; }
  .about2-tag.yellow { border-color: var(--yellow, #DCFA40); color: #1C1C1C; background: var(--yellow, #DCFA40); }

  .about2-img-col {
    width: 42%;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .about2-img-main {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    animation: tiltIn1 0.8s 0.5s cubic-bezier(.22,1,.36,1) both;
  }
  .about2-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(253,249,245,0.15) 100%);
    pointer-events: none;
  }

  .about2-right-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .about2-avail-col {
    padding: 32px 32px 32px 40px;
    border-right: 1px solid rgba(28,28,28,0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fadeUp 0.7s 0.5s both;
    position: relative;
  }
  .about2-avail-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.4rem, 2.2vw, 2rem);
    color: var(--blue, #2B2D8E);
    letter-spacing: 0.04em;
    line-height: 1;
    margin: 0 0 10px 0;
  }
  .about2-avail-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 300;
    font-style: italic;
    line-height: 1.7;
    color: rgba(28,28,28,0.55);
    margin: 0 0 18px 0;
  }
  .about2-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(220,250,64,0.25);
    border: 1.5px solid var(--yellow, #DCFA40);
    border-radius: 100px;
    padding: 6px 14px;
    width: fit-content;
  }
  .about2-status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #7abf00;
  }
  .about2-status-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a7a00;
  }

  .about2-img2-wrap {
    position: absolute;
    bottom: 16px;
    right: 12px;
    width: 80px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    transform: rotate(-4deg);
    animation: tiltIn2 0.8s 0.7s cubic-bezier(.22,1,.36,1) both;
    transition: transform 0.3s;
    z-index: 5;
  }
  .about2-img2-wrap:hover { transform: rotate(-2deg) scale(1.04); }
  .about2-img2-wrap img { width: 100%; height: 100%; object-fit: cover; }

  .about2-quote-col {
    padding: 32px 40px 32px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fadeUp 0.7s 0.6s both;
  }
  .about2-quote {
    font-family: 'Italianno', cursive;
    font-size: clamp(1.6rem, 2.4vw, 2.2rem);
    color: var(--blue, #2B2D8E);
    line-height: 1.2;
    margin: 0 0 16px 0;
  }
  .about2-quote em { color: var(--pink, #FF7EDF); font-style: normal; }

  .about2-based { display: flex; flex-direction: column; gap: 4px; }
  .about2-based-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.3);
  }
  .about2-based-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text, #1C1C1C);
  }

  .about2-accent-line {
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: 3px;
    background: linear-gradient(to right, var(--pink, #FF7EDF), var(--yellow, #DCFA40), transparent);
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

  return (
    <section className="about2-section">

      <span className="about2-star-deco" style={{ top: "18%", left: "47%", fontSize: "0.8rem" }}>✦</span>
      <span className="about2-star-deco" style={{ top: "72%", left: "49%", fontSize: "0.5rem" }}>✦</span>
      <span className="about2-star-deco" style={{ bottom: "12%", left: "52%", fontSize: "1rem" }}>✦</span>

      {/* ══ LEFT PANEL ══ */}
      <div className="about2-left">

        <div className="about2-top-row">
          {/* Real react-bits CircularText with "VRINDA DIXIT" text */}
          <div className="about2-circular-wrap">
            <CircularText
              text="VRINDA DIXIT ✦ PORTFOLIO 2025 ✦ "
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
          <p className="about2-my-name-is">My name is</p>
          <h1 className="about2-name-italianno">Vrinda</h1>
          <h1 className="about2-name-bebas">Dixit</h1>
          <div className="about2-role-tag">
            <span className="about2-role-dot" />
            UI/UX Designer · Full Stack Developer
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
            <span className="about2-contact-val">React · Node · Figma · MongoDB</span>
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
              <p className="about2-section-eyebrow">About me</p>
              <h2 className="about2-bio-heading">Design that's felt,<br />not just seen.</h2>
              <p className="about2-bio-text">
                I'm a UI/UX Designer and Full Stack Developer who believes great design isn't just seen — it's <em>felt</em>. From pixel-perfect Figma prototypes to production-ready MERN stack builds, I bridge the gap between how things look and how they work.
              </p>
            </div>
            <div className="about2-tags">
              <span className="about2-tag blue">UI/UX Design</span>
              <span className="about2-tag pink">Full Stack</span>
              <span className="about2-tag blue">Figma</span>
              <span className="about2-tag yellow">MERN Stack</span>
              <span className="about2-tag pink">Branding</span>
              <span className="about2-tag blue">React</span>
            </div>
          </div>

          <div className="about2-img-col">
            <img className="about2-img-main" src={img1} alt="Vrinda Dixit" />
            <div className="about2-img-overlay" />
          </div>
        </div>

        <div className="about2-right-bottom">

          <div className="about2-avail-col">
            <div>
              <p className="about2-section-eyebrow">Availability</p>
              <h3 className="about2-avail-heading">Open to<br />Opportunities</h3>
              <p className="about2-avail-text">
                Currently based in Delhi, India — available for freelance projects and full-time roles worldwide.
              </p>
            </div>
            <div className="about2-status-pill">
              <span className="about2-status-dot" />
              <span className="about2-status-text">Available now</span>
            </div>
            <div className="about2-img2-wrap">
              <img src={img2} alt="Vrinda" />
            </div>
          </div>

          <div className="about2-quote-col">
            <p className="about2-quote">
              "The best products are both beautiful <em>and</em> purposeful."
            </p>
            <div className="about2-based">
              <span className="about2-based-label">Based in</span>
              <span className="about2-based-val">New Delhi, India</span>
            </div>
          </div>

        </div>

        <div className="about2-accent-line" />
      </div>

    </section>
  );
}
