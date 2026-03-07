import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';

// ── palette ──────────────────────────────────────────────
const COLORS = {
  cream:     '#FDF9F5',
  coral:     '#ED6951',
  orange:    '#E11D48',
  lavender:  '#E7BEF8',
  pink:      '#FF7EDF',
  indigo:    '#5862E9',
  lime:      '#DCFA40',
  dark:      '#1C1C1C',
};

const GLOW_COLOR = '88, 98, 233'; // indigo as rgb
const PARTICLE_COUNT = 10;
const SPOTLIGHT_RADIUS = 320;

// ── heading letter colors ────────────────────────────────
const headingColors = [
  COLORS.coral, COLORS.dark, COLORS.pink, COLORS.indigo,
  COLORS.lime, COLORS.dark, COLORS.orange, COLORS.lavender,
  COLORS.periwinkle, COLORS.dark, COLORS.pink, COLORS.coral,
  COLORS.indigo, COLORS.lime,
];

// ── card data — swap img for real imports ────────────────
const cardData = [
  { title: 'Noire Studio',  tag: 'UI/UX Design',  desc: 'End-to-end brand identity & app design for a luxury beauty studio.',   color: COLORS.dark, img: null },
  { title: 'Hey There!',    tag: 'Web Design',     desc: 'Motion-driven landing page with scroll storytelling.',                  color: COLORS.dark, img: null },
  { title: 'Feast Monster', tag: 'Branding',       desc: 'Playful food brand — logo, packaging, social media design system.',    color: COLORS.dark, img: null },
  { title: 'The Way',       tag: 'Editorial',      desc: 'Typography-first layout design for an independent fashion zine.',      color: COLORS.dark, img: null },
  { title: 'Wellness Co.',  tag: 'App Design',     desc: 'Habit tracking & journaling mobile experience. Clean, minimal UI.',    color: COLORS.dark, img: null },
  { title: 'Codeflow',      tag: 'Dev',            desc: 'Full-stack productivity tool built with the MERN stack.',              color: COLORS.dark, img: null },
];

// ── particle helper ──────────────────────────────────────
const makeParticle = (x, y) => {
  const el = document.createElement('div');
  // random palette color for each particle
  const palette = [COLORS.pink, COLORS.lime, COLORS.indigo, COLORS.coral, COLORS.periwinkle, COLORS.orange];
  const col = palette[Math.floor(Math.random() * palette.length)];
  el.style.cssText = `
    position:absolute; width:5px; height:5px;
    border-radius:50%; background:${col};
    box-shadow:0 0 8px ${col};
    pointer-events:none; z-index:100;
    left:${x}px; top:${y}px;
  `;
  return el;
};

// ── ParticleCard ─────────────────────────────────────────
const ParticleCard = ({ children, className = '', style, onClick }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const hoveredRef = useRef(false);
  const particlePool = useRef(null);

  const clear = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p =>
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.25, ease: 'back.in(1.7)',
        onComplete: () => p.parentNode?.removeChild(p) })
    );
    particlesRef.current = [];
  }, []);

  const spawn = useCallback(() => {
    if (!cardRef.current || !hoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    if (!particlePool.current) {
      particlePool.current = Array.from({ length: PARTICLE_COUNT }, () =>
        makeParticle(Math.random() * width, Math.random() * height)
      );
    }

    particlePool.current.forEach((src, i) => {
      const id = setTimeout(() => {
        if (!hoveredRef.current || !cardRef.current) return;
        const clone = src.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random()-.5)*90, y: (Math.random()-.5)*90,
          rotation: Math.random()*360, duration: 2+Math.random()*2, ease:'none', repeat:-1, yoyo:true });
        gsap.to(clone, { opacity: 0.25, duration: 1.5, ease:'power2.inOut', repeat:-1, yoyo:true });
      }, i * 80);
      timeoutsRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onEnter = () => { hoveredRef.current = true; spawn();
      gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease:'power2.out', transformPerspective: 1000 }); };
    const onLeave = () => { hoveredRef.current = false; clear();
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease:'power2.out' }); };
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const rx = (((e.clientY - r.top) / r.height) - 0.5) * -12;
      const ry = (((e.clientX - r.left) / r.width) - 0.5) * 12;
      gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.1, ease:'power2.out', transformPerspective: 1000 });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    return () => {
      hoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      clear();
    };
  }, [spawn, clear]);

  return (
    <div ref={cardRef} className={className} style={{ ...style, position:'relative', overflow:'hidden', cursor:'pointer' }} onClick={onClick}>
      {children}
    </div>
  );
};

// ── GlobalSpotlight ──────────────────────────────────────
const GlobalSpotlight = ({ gridRef }) => {
  useEffect(() => {
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position:fixed; width:700px; height:700px; border-radius:50%;
      pointer-events:none;
      background:radial-gradient(circle,
        rgba(${GLOW_COLOR},0.14) 0%, rgba(${GLOW_COLOR},0.07) 20%,
        rgba(${GLOW_COLOR},0.03) 40%, transparent 70%);
      z-index:200; opacity:0; transform:translate(-50%,-50%);
      mix-blend-mode:screen; transition:opacity 0.3s;
    `;
    document.body.appendChild(spotlight);

    const proximity = SPOTLIGHT_RADIUS * 0.5;
    const fadeDistance = SPOTLIGHT_RADIUS * 0.75;

    const onMove = e => {
      if (!gridRef.current) return;
      const section = gridRef.current.closest('.proj-bento-section');
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right
        && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!inside) { spotlight.style.opacity = '0'; return; }

      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top  = e.clientY + 'px';

      const cards = gridRef.current.querySelectorAll('.proj-bento-card');
      let minDist = Infinity;
      cards.forEach(card => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
        minDist = Math.min(minDist, dist);
        const rx = ((e.clientX - cr.left) / cr.width) * 100;
        const ry = ((e.clientY - cr.top) / cr.height) * 100;
        let intensity = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        card.style.setProperty('--glow-x', `${rx}%`);
        card.style.setProperty('--glow-y', `${ry}%`);
        card.style.setProperty('--glow-i', intensity.toString());
      });

      const op = minDist <= proximity ? 0.9
        : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.9 : 0;
      spotlight.style.opacity = op;
    };
    const onLeave = () => { spotlight.style.opacity = '0'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }, [gridRef]);
  return null;
};

// ── Projects ─────────────────────────────────────────────
export default function Projects() {
  const gridRef = useRef(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=Poppins:wght@800&family=DM+Sans:wght@400;500&display=swap');

        .proj-section {
          background: ${COLORS.cream};
          padding: 48px 40px 64px;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .proj-bento-wrapper {
          width: 100%;
          max-width: 1100px;
        }

        /* heading */
        .proj-head {
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .proj-title-wrap {
          position: relative;
          display: inline-block;
          line-height: 1;
        }
        .proj-title-svg {
          display: block;
          width: clamp(400px, 70vw, 900px);
          height: auto;
          overflow: visible;
        }
        .proj-subtitle {
          font-family: 'Italianno', cursive;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          color: ${COLORS.dark};
          margin: 0;
          text-align: center;
          margin-top: -4px;
          display: block;
        }

        /* bento grid */
        .proj-bento-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 240px 220px;
          gap: 10px;
        }

        /* layout — mirrors reference exactly */
        .proj-bento-card:nth-child(1) { grid-column: 1 / 3; grid-row: 1; }
        .proj-bento-card:nth-child(2) { grid-column: 3;     grid-row: 1; }
        .proj-bento-card:nth-child(3) { grid-column: 4;     grid-row: 1 / 3; }
        .proj-bento-card:nth-child(4) { grid-column: 1;     grid-row: 2; }
        .proj-bento-card:nth-child(5) { grid-column: 2 / 4; grid-row: 2; }
        .proj-bento-card:nth-child(6) { display: none; }

        /* card base */
        .proj-bento-card {
          background: ${COLORS.dark};
          border-radius: 18px;
          border: 1px solid #2a2a2a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          --glow-x: 50%;
          --glow-y: 50%;
          --glow-i: 0;
        }

        /* border glow */
        .proj-bento-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(
            ${SPOTLIGHT_RADIUS}px circle at var(--glow-x) var(--glow-y),
            rgba(${GLOW_COLOR}, calc(var(--glow-i) * 0.9)) 0%,
            rgba(${GLOW_COLOR}, calc(var(--glow-i) * 0.4)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        /* hover image */
        .proj-card-img {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .proj-bento-card:hover .proj-card-img { opacity: 1; }
        .proj-card-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .proj-card-img-ph { width:100%; height:100%; background:#222; }

        /* overlay */
        .proj-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .proj-bento-card:hover .proj-card-overlay { opacity: 1; }

        /* text content */
        .proj-card-top { position: relative; z-index: 2; }
        .proj-card-bottom { position: relative; z-index: 2; }

        .proj-card-tag {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${COLORS.lime};
          margin-bottom: 4px;
        }
        .proj-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.3rem);
          letter-spacing: 1.5px;
          color: ${COLORS.cream};
          margin: 0 0 4px;
        }
        .proj-card-desc {
          font-size: 0.68rem;
          color: #888;
          line-height: 1.5;
        }

        .proj-card-cta {
          display: inline-block;
          margin-top: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${COLORS.dark};
          background: ${COLORS.lime};
          border: none;
          padding: 5px 12px;
          border-radius: 999px;
          cursor: pointer;
        }
      `}</style>

      <section className="proj-section">
        {/* heading — SVG circles clipped to text + dark text overlay */}
        <div className="proj-head">
          <div className="proj-title-wrap">
            <svg className="proj-title-svg" viewBox="0 0 900 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* clip path = the text shape */}
                <clipPath id="textClip">
                  <text
                    x="50%" y="105"
                    textAnchor="middle"
                    fontFamily="'Poppins', sans-serif"
                    fontWeight="800"
                    fontSize="120"
                    letterSpacing="-2"
                  >i build things</text>
                </clipPath>
              </defs>

              {/* dark base text — sits BELOW circles */}
              <text
                x="50%" y="105"
                textAnchor="middle"
                fontFamily="'Poppins', sans-serif"
                fontSize="120"
                fontWeight="800"
                letterSpacing="-2"
                fill="#1C1C1C"
              >i build things</text>

              {/* colorful circles clipped to text — sit ON TOP of dark layer */}
              <g clipPath="url(#textClip)">
                {/* i */}
                <circle cx="28"  cy="45"  r="22"  fill="#ED6951" />
                <circle cx="18"  cy="85"  r="30"  fill="#FF7EDF" />

                {/* b */}
                <circle cx="105" cy="30"  r="45"  fill="#5862E9" />
                <circle cx="80"  cy="80"  r="38"  fill="#E11D48" />
                <circle cx="125" cy="95"  r="30"  fill="#DCFA40" />

                {/* u */}
                <circle cx="195" cy="95"  r="42"  fill="#FF7EDF" />

                {/* i */}
                <circle cx="265" cy="30"  r="25"  fill="#DCFA40" />
                <circle cx="258" cy="75"  r="28"  fill="#ED6951" />

                {/* l */}
                <circle cx="300" cy="50"  r="38"  fill="#FF7EDF" />
                <circle cx="308" cy="100" r="28"  fill="#5862E9" />

                {/* d */}
                <circle cx="375" cy="28"  r="42"  fill="#E11D48" />
                <circle cx="355" cy="90"  r="25"  fill="#DCFA40" />

                {/* gap / t */}
                <circle cx="460" cy="20"  r="30"  fill="#ED6951" />
                <circle cx="450" cy="70"  r="45"  fill="#FF7EDF" />
                <circle cx="475" cy="100" r="28"  fill="#5862E9" />

                {/* h */}
                <circle cx="540" cy="40"  r="40"  fill="#DCFA40" />
                <circle cx="555" cy="95"  r="35"  fill="#E11D48" />

                {/* i */}
                <circle cx="598" cy="30"  r="22"  fill="#FF7EDF" />
                <circle cx="592" cy="80"  r="28"  fill="#ED6951" />

                {/* n */}
                <circle cx="650" cy="50"  r="42"  fill="#5862E9" />
                <circle cx="680" cy="90"  r="35"  fill="#FF7EDF" />
                <circle cx="665" cy="20"  r="28"  fill="#DCFA40" />

                {/* g */}
                <circle cx="740" cy="30"  r="45"  fill="#E11D48" />
                <circle cx="720" cy="90"  r="28"  fill="#ED6951" />

                {/* s */}
                <circle cx="820" cy="30"  r="38"  fill="#FF7EDF" />
                <circle cx="808" cy="80"  r="35"  fill="#DCFA40" />
                <circle cx="840" cy="95"  r="30"  fill="#5862E9" />
              </g>
            </svg>
            <span className="proj-subtitle">sometimes</span>
          </div>
        </div>

        <div className="proj-bento-wrapper">
          <GlobalSpotlight gridRef={gridRef} />
          <div className="proj-bento-section" ref={gridRef}>
          {cardData.map((card, i) => (
            <ParticleCard key={i} className="proj-bento-card">
              {/* hover image */}
              <div className="proj-card-img">
                {card.img ? <img src={card.img} alt={card.title} /> : <div className="proj-card-img-ph" />}
              </div>
              <div className="proj-card-overlay" />

              <div className="proj-card-top">
                <div className="proj-card-tag">{card.tag}</div>
              </div>
              <div className="proj-card-bottom">
                <h3 className="proj-card-title">{card.title}</h3>
                <p className="proj-card-desc">{card.desc}</p>
                <button className="proj-card-cta">see more &gt;</button>
              </div>
            </ParticleCard>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
