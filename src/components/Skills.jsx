import flowerImg from "../assets/emojis/flower.png";
import smileyImg from "../assets/emojis/smiley.png";
import cupImg from "../assets/emojis/cup.png";
import heartImg from "../assets/emojis/heart.png";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const cards = [
  { id: "edu",  title: "Education",       icon: flowerImg, bg: "#E8184A", items: ["St. Gregorios school - 94%", "Maharaja Surajmal Institute of Technology - 9.34"] },
  { id: "exp",  title: "Experience",      icon: smileyImg, bg: "#D4A8F0", items: ["Student body head & Coordinator intern at AICTE", "IOT Trainee/Intern at NSIC", "UI/UX Intern at Effred Technologies"] },
  { id: "soft", title: "Software Skills", icon: cupImg,    bg: "#CCEE22", items: ["Full Stack: MERN stack (mongoDB, express.js, react, node.js)", "Tools: Figma, Adobe Illustrator, PowerBI, Excel, MySQL", "Languages: C, C++, Java, JavaScript, Python"] },
  { id: "misc", title: "Misc. Activities",icon: heartImg,  bg: "#E86820", items: ["President of ASTITVA - The Dance Society of MSIT", "Graphic and UI/UX Designer at Google Developers Group on campus", "Debater"] },
];

const baseTransforms = [
  "rotate(9.78deg)  translateX(-80px)",
  "rotate(-4.38deg) translateX(-26px)",
  "rotate(3.88deg)  translateX(26px)",
  "rotate(-1.38deg) translateX(80px)",
];

const getNoRotationTransform = (t) =>
  t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");

const getPushedTransform = (t, offsetX) => {
  const match = t.match(/translateX\(([-0-9.]+)px\)/);
  if (match) {
    const newX = parseFloat(match[1]) + offsetX;
    return t.replace(/translateX\(([-0-9.]+)px\)/, `translateX(${newX}px)`);
  }
  return `${t} translateX(${offsetX}px)`;
};

export default function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { scale: 0 },
        { scale: 1, stagger: 0.06, ease: "elastic.out(1, 0.8)", delay: 0.4 }
      );
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
        gsap.to(target, {
          transform: getNoRotationTransform(base) + " translateY(-10px)",
          duration: 0.4, ease: "back.out(1.4)", overwrite: "auto", zIndex: 10,
        });
      } else {
        const offsetX = i < hoveredIdx ? -60 : 60;
        gsap.to(target, {
          transform: getPushedTransform(base, offsetX),
          duration: 0.4, ease: "back.out(1.4)",
          delay: Math.abs(hoveredIdx - i) * 0.05, overwrite: "auto",
        });
      }
    });
  };

  const resetAll = () => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    cards.forEach((_, i) => {
      const target = q(`.skill-card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: baseTransforms[i],
        duration: 0.4, ease: "back.out(1.4)", overwrite: "auto",
      });
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=Poppins:wght@800&family=DM+Sans:wght@400;500&display=swap');

        .skills-section {
          background: var(--bg);
          padding: 40px 48px 48px;
          font-family: 'DM Sans', sans-serif;
        }

        .skills-title-row {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 20px;
        }
        .skills-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          color: #1C1C1C;
          letter-spacing: 2px;
          margin: 0;
          line-height: 1;
        }
        .skills-subtitle {
        font-family: 'Italianno', cursive;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          color: #FF7EDF;
          font-weight: 500;
          text-transform: lowercase;
        }

        .skills-cards-row {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-top: 50px;
          padding-bottom: 30px;
          width: 100%;
        }

        .skill-card {
          width: 222px;
          min-height: 290px;
          border-radius: 10px;
          padding: 60px 20px 26px;
          position: relative;
          flex-shrink: 0;
          cursor: default;
        }

        .skill-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 1.5px;
          color: #1C1C1C;
          text-align: center;
          margin-bottom: 14px;
        }

        .skill-card ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding: 0;
          margin: 0;
        }

        .skill-card ul li {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 500;
          color: #1C1C1C;
          line-height: 1.4;
          padding-left: 14px;
          position: relative;
        }

        .skill-card ul li::before {
          content: "•";
          position: absolute;
          left: 2px;
          font-size: 0.9rem;
        }

        .skills-footer {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        .skills-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: #1C1C1C;
          background: #FDF9F5;
          padding: 7px 20px;
          border-radius: 100px;
          border: 1.5px solid #1C1C1C;
          cursor: pointer;
        }
      `}</style>

      <section className="skills-section">

        {/* header — same as Works */}
        <div className="skills-title-row">
          <h2 className="skills-title">SKILLS</h2>
          <span className="skills-subtitle">what i bring to the table</span>
        </div>

        {/* animated cards */}
        <div className="skills-cards-row" ref={containerRef}>
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
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "62px",
                  height: "62px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.15))",
                }}
              />
              <div className="skill-card-title">{card.title}</div>
              <ul>
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* footer button */}
        <div className="skills-footer">
          <button className="skills-cta">see more &gt;</button>
        </div>

      </section>
    </>
  );
}
