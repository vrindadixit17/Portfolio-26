import { useEffect, useRef } from "react";
import img1 from "../assets/about/about1.png";
import img2 from "../assets/about/about2.png";
import TextPressure from "../components/TextPressure";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Italianno&family=DM+Sans:wght@400;500&display=swap');

  @keyframes pillSlide {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes cardTiltIn {
    from { opacity: 0; transform: rotate(6deg) scale(0.9); }
    to   { opacity: 1; transform: rotate(6deg) scale(1); }
  }
  @keyframes cardTiltIn2 {
    from { opacity: 0; transform: rotate(-8deg) scale(0.9); }
    to   { opacity: 1; transform: rotate(-8deg) scale(1); }
  }

  .about-section {
    background: var(--bg);
    height: 100vh;
    padding: 0 4vw;
    display: grid;
    grid-template-columns: 38% 24% 38%;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── LEFT ── */
  .about-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 0;
    z-index: 2;
  }

  .name-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .name-row {
    width: 100%;
    height: clamp(80px, 11vw, 145px);
  }

  .pills-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
    align-items: center;
  }

  .pill {
    background: #FF7EDF;
    border-radius: 999px;
    padding: 11px 0;
    width: 100%;
    max-width: 360px;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #1C1C1C;
    cursor: default;
    transition: filter 0.2s, transform 0.2s;
    animation: pillSlide 0.5s cubic-bezier(.22,1,.36,1) both;
  }
  .pill:hover { filter: brightness(1.08); transform: scale(1.02); }

  /* ── CENTER — just heading ── */
  .about-center {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 12px;
    align-self: center;
    z-index: 2;
  }

  .about-heading {
    font-family: 'Italianno', cursive;
    font-size: clamp(2.4rem, 3.6vw, 3.4rem);
    color: #5862E9;
    margin: 0;
    line-height: 1;
  }

  /* ── RIGHT ── */
  .about-right {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  /* para top-left of right col, beside/above the photos */
  .about-intro {
    position: absolute;
    left: 0;
    top: 8%;
    width: 38%;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    line-height: 1.75;
    color: #555;
    margin: 0 0 10px 0;
    text-align: left;
    z-index: 4;
  }
  .about-intro.second {
    top: auto;
    bottom: 8%;
    left: 0;
    width: 38%;
  }

  .card-green {
    background: transparent !important;
    padding: 0 !important;
    border-radius: 14px;
    transform: rotate(6deg);
    width: 62%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.14);
    animation: cardTiltIn 0.7s 0.2s cubic-bezier(.22,1,.36,1) both;
    transition: transform 0.3s;
    overflow: hidden;
    position: absolute;
    top: 5%;
    right: 2%;
    z-index: 2;
  }
  .card-green:hover { transform: rotate(4deg) scale(1.02); }
  .card-green img { width: 100%; display: block; object-fit: cover; aspect-ratio: 3/4; }

  .card-red {
    background: transparent !important;
    padding: 0 !important;
    border-radius: 14px;
    transform: rotate(-8deg);
    width: 46%;
    box-shadow: 0 14px 40px rgba(0,0,0,0.14);
    animation: cardTiltIn2 0.7s 0.4s cubic-bezier(.22,1,.36,1) both;
    transition: transform 0.3s;
    overflow: hidden;
    position: absolute;
    top: 38%;
    left: 0%;
    z-index: 3;
  }
  .card-red:hover { transform: rotate(-6deg) scale(1.03); }
  .card-red img { width: 100%; display: block; object-fit: cover; aspect-ratio: 3/4; }

  .between-card {
    position: absolute;
    top: 42%;
    right: 2%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .between-tag {
    background: #5862E9;
    color: #FDF9F5;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .between-tag.lime { background: #DCFA40; color: #1C1C1C; }
  .between-tag.pink { background: #FF7EDF; color: #1C1C1C; }
`;

export default function About() {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  const pills = [
    "dixitvrinda1704@gmail.com",
    "UI/UX Designer · Full Stack Dev",
    "Based in Delhi, India",
    "Open to opportunities ✦",
  ];

  return (
    <section className="about-section">

      {/* LEFT — name + pills */}
      <div className="about-left">
        <div className="name-wrap">
          <div className="name-row">
            <TextPressure
              text="VRINDA"
              flex={true} alpha={false} stroke={true}
              scale={true} width={true} weight={true} italic={false}
              textColor="#5862E9" strokeColor="#5862E9" minFontSize={60}
            />
          </div>
          <div className="name-row">
            <TextPressure
              text="DIXIT"
              flex={true} alpha={false} stroke={true}
              scale={true} width={true} weight={true} italic={false}
              textColor="#5862E9" strokeColor="#5862E9" minFontSize={60}
            />
          </div>
        </div>
        <div className="pills-wrap">
          {pills.map((text, i) => (
            <div key={i} className="pill" style={{ animationDelay: `${0.5 + i * 0.09}s` }}>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* CENTER — just heading */}
      <div className="about-center">
        <h2 className="about-heading">about me</h2>
      </div>

      {/* RIGHT — photos + paras filling the empty sides */}
      <div className="about-right">
        <p className="about-intro">
          I'm Vrinda Dixit — a UI/UX Designer and Full Stack Developer who believes great design isn't just seen, it's <em>felt</em>. Based in Delhi, I craft experiences that balance visual personality with purposeful structure.
        </p>
        <div className="card-green"><img src={img1} alt="Vrinda" /></div>
        <div className="card-red"><img src={img2} alt="Vrinda" /></div>
        
        <p className="about-intro second">
          From pixel-perfect Figma prototypes to production-ready MERN stack builds, I bridge the gap between how things look and how they work — because the best products are both.
        </p>
      </div>

    </section>
  );
}
