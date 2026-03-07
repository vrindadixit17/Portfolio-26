
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
  { id: "misc", title: "Misc. activites", icon: heartImg,  bg: "#E86820", items: ["President of ASTITVA - The Dance Society of MSIT", "Graphic and UI/UX Designer at Google Developers Group on campus", "Debater"] },
];

// Base transforms: exact rotations + overlap offset per card
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

  // Bounce-in on mount
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
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
          zIndex: 10,
        });
      } else {
        const offsetX = i < hoveredIdx ? -60 : 60;
        gsap.to(target, {
          transform: getPushedTransform(base, offsetX),
          duration: 0.4,
          ease: "back.out(1.4)",
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: "auto",
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
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');
      `}</style>

      <section style={{
        background: "#FDF9F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 60px 60px",
        fontFamily: "'Poppins', sans-serif",
      }}>

        {/* Cards row */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            paddingTop: "50px",
            paddingBottom: "30px",
            width: "100%",
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`skill-card skill-card-${idx}`}
              style={{
                width: "222px",
                minHeight: "290px",
                borderRadius: "26px",
                padding: "60px 20px 26px",
                position: "relative",
                background: card.bg,
                transform: baseTransforms[idx],
                flexShrink: 0,
                cursor: "default",
                // overlap via negative margin
                marginLeft: idx === 0 ? "0" : "-28px",
                // stacking: later cards on top by default
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
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                fontWeight: 800,
                color: "#1C1C1C",
                textAlign: "center",
                marginBottom: "16px",
              }}>
                {card.title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", padding: 0, margin: 0 }}>
                {card.items.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#1C1C1C",
                    lineHeight: 1.4,
                    paddingLeft: "16px",
                    position: "relative",
                  }}>
                    <span style={{ position: "absolute", left: "2px", fontSize: "1rem", lineHeight: 1.3 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px" }}>
          <button style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "#FDF9F5",
            background: "#1C1C1C",
            padding: "12px 30px",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer",
          }}>
            see more &gt;
          </button>
        </div>

      </section>
    </>
  );
}
