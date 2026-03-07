import { useEffect, useRef } from "react";
import img1 from "../assets/about/about1.png";
import img2 from "../assets/about/about2.png";
import TextPressure from "../components/TextPressure";

const css = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
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
    background: #FDF9F5;
    min-height: 100vh;
    padding: 0 4vw;
    display: grid;
    grid-template-columns: 38% 24% 38%;
    align-items: center;
    box-sizing: border-box;
    overflow: visible;
    overflow-x: clip;
    font-family: 'DM Sans', sans-serif;
  }

  .about-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 0;
    height: 100%;
  }

  .name-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .name-row {
    width: 100%;
    height: clamp(110px, 14vw, 180px);
  }

  /* Override TextPressure stroke color to pink for personality */
  .name-row .stroke span::after {
    -webkit-text-stroke-color: #F020A0 !important;
    -webkit-text-stroke-width: 2px !important;
  }

  .pills-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
    align-items: center;
  }

  .pill {
    background: #F020A0;
    border-radius: 999px;
    padding: 11px 0;
    width: 100%;
    max-width: 400px;
    text-align: center;
    font-size: 13.5px;
    font-weight: 400;
    color: #fff;
    cursor: default;
    transition: filter 0.2s, transform 0.2s;
    animation: pillSlide 0.5s cubic-bezier(.22,1,.36,1) both;
    font-family: 'DM Sans', sans-serif;
  }
  .pill:hover { filter: brightness(1.12); transform: scale(1.02); }

  .about-right {
    position: relative;
    height: 100vh;
    overflow: visible;
  }

  .about-heading {
    font-family: 'Italianno', Georgia, cursive;
    font-size: clamp(36px, 3.8vw, 54px);
    color: #5A63E6;
    margin: 0 0 12px 0;
    line-height: 1;
    white-space: nowrap;
    text-align: center;
  }

  .about-body {
    font-size: 12px;
    line-height: 1.5;
    color: #6b7280;
    text-align: right;
    font-family: 'DM Sans', sans-serif;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
  }

  .bottom-text {
    font-size: 12px;
    line-height: 1.5;
    color: #6b7280;
    position: absolute;
    bottom: 4%;
    right: 0%;
    width: 46%;
    font-family: 'DM Sans', sans-serif;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    z-index: 4;
  }

  .card-green {
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0;
    transform: rotate(6deg);
    width: 70%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.16);
    animation: cardTiltIn 0.7s 0.2s cubic-bezier(.22,1,.36,1) both;
    transition: transform 0.3s;
    overflow: hidden;
    position: absolute;
    top: 2%;
    right: -4%;
    z-index: 2;
  }
  .card-green:hover { transform: rotate(4deg) scale(1.02); }
  .card-green img { width: 100%; display: block; object-fit: cover; aspect-ratio: 3/4; }

  .card-red {
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0;
    transform: rotate(-8deg);
    width: 50%;
    box-shadow: 0 14px 40px rgba(0,0,0,0.16);
    animation: cardTiltIn2 0.7s 0.4s cubic-bezier(.22,1,.36,1) both;
    transition: transform 0.3s;
    overflow: hidden;
    position: absolute;
    top: 36%;
    left: -2%;
    z-index: 3;
  }
  .card-red:hover { transform: rotate(-6deg) scale(1.03); }
  .card-red img { width: 100%; display: block; object-fit: cover; aspect-ratio: 3/4; }
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
    "dixitvrinda1704@gmail.com",
    "dixitvrinda1704@gmail.com",
    "dixitvrinda1704@gmail.com",
  ];

  const bodyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur.`;

  return (
    <section className="about-section">

      {/* LEFT */}
      <div className="about-left">
        <div className="name-wrap">
          <div className="name-row">
            <TextPressure
              text="VRINDA"
              flex={true}
              alpha={false}
              stroke={true}
              scale={true}
              width={true}
              weight={true}
              italic={false}
              textColor="#5A4FDB"
              strokeColor="#5A4FDB"
              minFontSize={60}
            />
          </div>
          <div className="name-row">
            <TextPressure
              text="DIXIT"
              flex={true}
              alpha={false}
              stroke={true}
              scale={true}
              width={true}
              weight={true}
              italic={false}
              textColor="#5A4FDB"
              strokeColor="#5A4FDB"
              minFontSize={60}
            />
          </div>
        </div>

        <div className="pills-wrap">
          {pills.map((email, i) => (
            <div key={i} className="pill" style={{ animationDelay: `${0.5 + i * 0.09}s` }}>
              {email}
            </div>
          ))}
        </div>
      </div>

      {/* CENTER */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 8px", alignSelf: "center" }}>
        <h2 className="about-heading">about me</h2>
        <p className="about-body">{bodyText}</p>
      </div>

      {/* RIGHT */}
      <div className="about-right">
        <div className="card-green">
          <img src={img1} alt="Vrinda" />
        </div>
        <div className="card-red">
          <img src={img2} alt="Vrinda" />
        </div>
        <p className="bottom-text">{bodyText}</p>
      </div>

    </section>
  );
}
