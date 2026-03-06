import React from "react";
import LiquidEther from "./LiquidEther";
import flowerImg from "../assets/emojis/flower.png";
import smileyImg from "../assets/emojis/smiley.png";
import cupImg from "../assets/emojis/cup.png";
import heartImg from "../assets/emojis/heart.png";


const cards = [
  { id: "edu",  title: "Education",      icon: flowerImg, bg: "#E8184A", rotate: "9.78deg",  items: ["St. Gregorios school - 94%", "Maharaja Surajmal Institute of Technology - 9.34"] },
  { id: "exp",  title: "Experience",     icon: smileyImg, bg: "#D4A8F0", rotate: "-4.38deg", items: ["Student body head & Coordinator intern at AICTE", "IOT Trainee/Intern at NSIC", "UI/UX Intern at Effred Technologies"] },
  { id: "soft", title: "Software Skills",icon: cupImg,    bg: "#CCEE22", rotate: "3.88deg",  items: ["Full Stack: MERN stack (mongoDB, express.js, react, node.js)", "Tools: Figma, Adobe Illustrator, PowerBI, Excel, MySQL", "Languages: C, C++, Java, JavaScript, Python"] },
  { id: "misc", title: "Misc. activites",icon: heartImg,  bg: "#E86820", rotate: "-1.38deg", items: ["President of ASTITVA - The Dance Society of MSIT", "Graphic and UI/UX Designer at Google Developers Group on campus", "Debater"] },
];

export default function Skills() {
  const [hovered, setHovered] = React.useState(null);

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
        justifyContent: "center",
        padding: "80px 32px 60px",
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              style={{
                width: "222px",
                minHeight: "290px",
                borderRadius: "26px",
                padding: "60px 20px 26px",
                position: "relative",
                background: card.bg,
                transform: hovered === card.id
                  ? "rotate(0deg) translateY(-10px)"
                  : `rotate(${card.rotate})`,
                transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
                flexShrink: 0,
                cursor: "default",
                zIndex: hovered === card.id ? 10 : idx,
                marginLeft: idx === 0 ? "0" : "-28px",
              }}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
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

        <div style={{ marginTop: "60px" }}>
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
