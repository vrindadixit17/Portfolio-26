import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { works } from '../components/Works';
import Antigravity from '../components/Antigravity';
import { gsap } from 'gsap';

const GLOW_COLOR = '88, 98, 233';
const PARTICLE_COUNT = 10;
const SPOTLIGHT_RADIUS = 320;

const cardData = [
  { title: 'Noire Studio',  tag: 'UI/UX Design',  desc: 'End-to-end brand identity & app design for a luxury beauty studio.',  slug: 'noire-studio',  img: null },
  { title: 'Hey There!',    tag: 'Web Design',     desc: 'Motion-driven landing page with scroll storytelling.',                 slug: 'hrms',          img: null },
  { title: 'Feast Monster', tag: 'Branding',       desc: 'Playful food brand — logo, packaging, social media design system.',   slug: 'feast-monster', img: null },
  { title: 'The Way',       tag: 'Editorial',      desc: 'Typography-first layout design for an independent fashion zine.',     slug: 'the-way',       img: null },
  { title: 'Wellness Co.',  tag: 'App Design',     desc: 'Habit tracking & journaling mobile experience. Clean, minimal UI.',   slug: 'wellness-co',   img: null },
  { title: 'Codeflow',      tag: 'Dev',            desc: 'Full-stack productivity tool built with the MERN stack.',             slug: null,            img: null },
];

const makeParticle = (x, y) => {
  const el = document.createElement('div');
  const palette = ['#FF7EDF', '#DCFA40', '#5862E9', '#ED6951', '#E11D48'];
  const col = palette[Math.floor(Math.random() * palette.length)];
  el.style.cssText = `position:absolute;width:5px;height:5px;border-radius:50%;background:${col};box-shadow:0 0 8px ${col};pointer-events:none;z-index:100;left:${x}px;top:${y}px;`;
  return el;
};

const ParticleCard = ({ children, className = '', onClick }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const hoveredRef = useRef(false);
  const particlePool = useRef(null);

  const clear = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p =>
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.25, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) })
    );
    particlesRef.current = [];
  }, []);

  const spawn = useCallback(() => {
    if (!cardRef.current || !hoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    if (!particlePool.current) {
      particlePool.current = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(Math.random() * width, Math.random() * height));
    }
    particlePool.current.forEach((src, i) => {
      const id = setTimeout(() => {
        if (!hoveredRef.current || !cardRef.current) return;
        const clone = src.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random()-.5)*90, y: (Math.random()-.5)*90, rotation: Math.random()*360, duration: 2+Math.random()*2, ease:'none', repeat:-1, yoyo:true });
        gsap.to(clone, { opacity: 0.25, duration: 1.5, ease:'power2.inOut', repeat:-1, yoyo:true });
      }, i * 80);
      timeoutsRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => { hoveredRef.current = true; spawn(); gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease:'power2.out', transformPerspective: 1000 }); };
    const onLeave = () => { hoveredRef.current = false; clear(); gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease:'power2.out' }); };
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
    <div ref={cardRef} className={className} style={{ position:'relative', overflow:'hidden', cursor:'pointer' }} onClick={onClick}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef }) => {
  useEffect(() => {
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `position:fixed;width:700px;height:700px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${GLOW_COLOR},0.14) 0%,rgba(${GLOW_COLOR},0.07) 20%,rgba(${GLOW_COLOR},0.03) 40%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:opacity 0.3s;`;
    document.body.appendChild(spotlight);
    const proximity = SPOTLIGHT_RADIUS * 0.5;
    const fadeDistance = SPOTLIGHT_RADIUS * 0.75;
    const onMove = e => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
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
        const intensity = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        card.style.setProperty('--glow-x', `${rx}%`);
        card.style.setProperty('--glow-y', `${ry}%`);
        card.style.setProperty('--glow-i', intensity.toString());
      });
      const op = minDist <= proximity ? 0.9 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.9 : 0;
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

export default function WorksPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italianno&family=Poppins:wght@800&family=DM+Sans:wght@400;500&display=swap');

        /* ── FULL-PAGE ANTIGRAVITY BACKGROUND ── */
        .wp-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }
        .wp-bg canvas {
          width: 100% !important;
          height: 100% !important;
        }

        /* all page content sits above the canvas */
        .wp-wrap {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.4s ease;
          /* semi-transparent bg so particles show through */
          background: transparent;
        }

        .wp-hero { padding: 16px 48px 0; }

        .wp-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-muted);
          background: none; border: none; cursor: pointer; padding: 0;
          margin-bottom: 12px; transition: color 0.2s ease;
        }
        .wp-back:hover { color: var(--red); }
        .wp-back:hover svg { transform: translateX(-3px); }
        .wp-back svg { transition: transform 0.2s ease; }

        .wp-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          color: var(--text); line-height: 0.88;
          letter-spacing: 0.02em; margin: 0;
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .wp-headline span { color: var(--pink); }

        .wp-tagline {
          font-family: 'italianno';
          font-size: 1.5rem; font-weight: 500;
          color: var(--text-muted); margin-top: 12px;
          animation: fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .wp-section-header {
          display: flex; align-items: baseline; gap: 14px; margin-bottom: 24px;
        }
        .wp-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          color: var(--pink); letter-spacing: 2px; margin: 0; line-height: 1;
          transition: color 0.4s ease;
        }

        /* ══ WORKS ══ */
        .wp-works { padding: 48px 48px; }

        .works-cards { display: flex; gap: 12px; align-items: flex-start; }
        .work-col { flex: 1; display: flex; flex-direction: column; gap: 0; }

        .work-card {
          background: var(--bg-card); border-radius: 5px;
          position: relative; overflow: hidden;
          aspect-ratio: 3 / 5; cursor: pointer;
          transition: background 0.4s ease;
        }
        .work-card-img { position: absolute; inset: 0; opacity: 0; z-index: 1; transition: opacity 0.35s ease; }
        .work-card:hover .work-card-img { opacity: 1; }
        .work-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .work-card-img-ph { width: 100%; height: 100%; background: #2a2a2a; }

        .work-card-num {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22vw; line-height: 1;
          color: var(--yellow); z-index: 2;
          pointer-events: none; width: 100%; text-align: center;
        }
        .work-card-cta {
          position: absolute; bottom: 14px; left: 50%;
          transform: translateX(-50%); z-index: 3;
          background: #FDF9F5; color: #1C1C1C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; font-weight: 500; letter-spacing: 0.5px;
          padding: 5px 12px; border-radius: 100px;
          border: none; cursor: pointer; white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .work-card-cta:hover { background: var(--red); color: #FDF9F5; }

        .work-below { padding: 14px 4px 0; }
        .work-below-tag {
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--orange); margin-bottom: 4px;
        }
        .work-below-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; letter-spacing: 1.5px;
          color: var(--text); margin-bottom: 5px;
          transition: color 0.4s ease;
        }
        .work-below-desc { font-size: 0.72rem; color: var(--blue); line-height: 1.55; }

        /* ══ I BUILD THINGS ══ */
        .wp-build-head {
          display: flex; flex-direction: column; align-items: center;
          padding: 48px 40px 32px;
        }
        .wp-build-svg { display: block; width: clamp(400px, 70vw, 900px); height: auto; overflow: visible; }
        .wp-build-sometimes {
          font-family: 'Italianno', cursive; font-size: 1.8rem;
          color: var(--text-muted); margin-top: -10px; text-align: center;
        }

        /* ══ PROJECTS ══ */
        .wp-projects { padding: 0 40px 64px; display: flex; flex-direction: column; align-items: center; }
        .proj-bento-wrapper { width: 100%; max-width: 1100px; }

        .proj-bento-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 240px 220px;
          gap: 10px;
        }
        .proj-bento-card:nth-child(1) { grid-column: 1 / 3; grid-row: 1; }
        .proj-bento-card:nth-child(2) { grid-column: 3;     grid-row: 1; }
        .proj-bento-card:nth-child(3) { grid-column: 4;     grid-row: 1 / 3; }
        .proj-bento-card:nth-child(4) { grid-column: 1;     grid-row: 2; }
        .proj-bento-card:nth-child(5) { grid-column: 2 / 4; grid-row: 2; }
        .proj-bento-card:nth-child(6) { display: none; }

        .proj-bento-card {
          background: var(--bg-card); border-radius: 10px;
          border: 1px solid var(--divider);
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 20px; position: relative; overflow: hidden;
          transition: transform 0.3s ease, background 0.4s ease, border-color 0.4s ease;
          --glow-x: 50%; --glow-y: 50%; --glow-i: 0;
        }
        .proj-bento-card::after {
          content: ''; position: absolute; inset: 0; padding: 6px;
          background: radial-gradient(${SPOTLIGHT_RADIUS}px circle at var(--glow-x) var(--glow-y), rgba(${GLOW_COLOR}, calc(var(--glow-i) * 0.9)) 0%, rgba(${GLOW_COLOR}, calc(var(--glow-i) * 0.4)) 30%, transparent 60%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none; z-index: 1;
        }
        .proj-card-img { position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s ease; z-index: 0; }
        .proj-bento-card:hover .proj-card-img { opacity: 1; }
        .proj-card-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .proj-card-img-ph { width:100%; height:100%; background: var(--bg-card); }
        .proj-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s ease; z-index: 0;
        }
        .proj-bento-card:hover .proj-card-overlay { opacity: 1; }
        .proj-card-top { position: relative; z-index: 2; }
        .proj-card-bottom { position: relative; z-index: 2; }
        .proj-card-tag { font-size: 0.6rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--yellow); margin-bottom: 4px; }
        .proj-card-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1rem, 1.6vw, 1.3rem); letter-spacing: 1.5px; color: var(--bg); margin: 0 0 4px; }
        .proj-card-desc { font-size: 0.68rem; color: var(--text-muted); line-height: 1.5; }
        .proj-card-cta {
          display: inline-block; margin-top: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.5px; text-transform: lowercase;
          color: #1C1C1C; background: var(--yellow);
          border: none; padding: 5px 12px; border-radius: 999px; cursor: pointer;
        }

        /* ── FOOTER ── */
        .wp-footer {
          border-top: 1px solid var(--divider); padding: 24px 48px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .wp-footer-logo { font-family: 'Italianno', cursive; font-size: 1.6rem; color: var(--pink); cursor: pointer; }
        .wp-footer-copy { font-size: 0.65rem; color: var(--text-muted); letter-spacing: 0.08em; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .wp-hero, .wp-works, .wp-projects, .wp-footer { padding-left: 24px; padding-right: 24px; }
          .wp-build-head { padding-left: 24px; padding-right: 24px; }
        }
      `}</style>

      {/* ── FIXED FULL-PAGE BACKGROUND ── */}
      <div className="wp-bg">
        <Antigravity
          interactive={false}
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

      {/* ── PAGE CONTENT ── */}
      <div className="wp-wrap">
        <Navbar rightAlign />

        {/* HERO */}
        <div className="wp-hero">
          <button className="wp-back" onClick={() => navigate(-1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            back
          </button>
          <h1 className="wp-headline">works & <span>projects</span>.</h1>
          <p className="wp-tagline">design, code & everything in between</p>
        </div>

        {/* WORKS */}
        <div className="wp-works">
          <div className="wp-section-header">
            <h2 className="wp-section-title">Works</h2>
          </div>
          <div className="works-cards">
            {works.map((w, i) => (
              <div className="work-col" key={i}>
                <div
                  className="work-card"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate(`/works/${w.slug}`)}
                >
                  <div className="work-card-img">
                    {w.img ? <img src={w.img} alt={w.title} /> : <div className="work-card-img-ph" />}
                  </div>
                  <div className="work-card-num">{w.num}</div>
                  <button className="work-card-cta" onClick={e => { e.stopPropagation(); navigate(`/works/${w.slug}`); }}>
                    see more &gt;
                  </button>
                </div>
                <div className="work-below">
                  <div className="work-below-tag">{w.tag}</div>
                  <div className="work-below-title">{w.title}</div>
                  <div className="work-below-desc">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* I BUILD THINGS */}
        <div className="wp-build-head">
          
          <svg className="wp-build-svg" viewBox="0 0 900 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="textClip">
                <text x="50%" y="105" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight="800" fontSize="120" letterSpacing="-2">i build things</text>
              </clipPath>
            </defs>
            <text x="50%" y="105" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontSize="120" fontWeight="800" letterSpacing="-2" fill="currentColor">i build things</text>
            <g clipPath="url(#textClip)">
              <circle cx="28"  cy="45"  r="22"  fill="#ED6951" /><circle cx="18"  cy="85"  r="30"  fill="#FF7EDF" />
              <circle cx="105" cy="30"  r="45"  fill="#5862E9" /><circle cx="80"  cy="80"  r="38"  fill="#E11D48" />
              <circle cx="125" cy="95"  r="30"  fill="#DCFA40" /><circle cx="195" cy="95"  r="42"  fill="#FF7EDF" />
              <circle cx="265" cy="30"  r="25"  fill="#DCFA40" /><circle cx="258" cy="75"  r="28"  fill="#ED6951" />
              <circle cx="300" cy="50"  r="38"  fill="#FF7EDF" /><circle cx="308" cy="100" r="28"  fill="#5862E9" />
              <circle cx="375" cy="28"  r="42"  fill="#E11D48" /><circle cx="355" cy="90"  r="25"  fill="#DCFA40" />
              <circle cx="460" cy="20"  r="30"  fill="#ED6951" /><circle cx="450" cy="70"  r="45"  fill="#FF7EDF" />
              <circle cx="475" cy="100" r="28"  fill="#5862E9" /><circle cx="540" cy="40"  r="40"  fill="#DCFA40" />
              <circle cx="555" cy="95"  r="35"  fill="#E11D48" /><circle cx="598" cy="30"  r="22"  fill="#FF7EDF" />
              <circle cx="592" cy="80"  r="28"  fill="#ED6951" /><circle cx="650" cy="50"  r="42"  fill="#5862E9" />
              <circle cx="680" cy="90"  r="35"  fill="#FF7EDF" /><circle cx="665" cy="20"  r="28"  fill="#DCFA40" />
              <circle cx="740" cy="30"  r="45"  fill="#E11D48" /><circle cx="720" cy="90"  r="28"  fill="#ED6951" />
              <circle cx="820" cy="30"  r="38"  fill="#FF7EDF" /><circle cx="808" cy="80"  r="35"  fill="#DCFA40" />
              <circle cx="840" cy="95"  r="30"  fill="#5862E9" />
            </g>
          </svg>
          <span className="wp-build-sometimes">sometimes</span>
        </div>

        {/* PROJECTS */}
        <div className="wp-projects">
          <div className="proj-bento-wrapper">
            <GlobalSpotlight gridRef={gridRef} />
            <div className="proj-bento-section" ref={gridRef}>
              {cardData.map((card, i) => (
                <ParticleCard key={i} className="proj-bento-card" onClick={() => card.slug && navigate(`/works/${card.slug}`)}>
                  <div className="proj-card-img">
                    {card.img ? <img src={card.img} alt={card.title} /> : <div className="proj-card-img-ph" />}
                  </div>
                  <div className="proj-card-overlay" />
                  <div className="proj-card-top"><div className="proj-card-tag">{card.tag}</div></div>
                  <div className="proj-card-bottom">
                    <h3 className="proj-card-title">{card.title}</h3>
                    <p className="proj-card-desc">{card.desc}</p>
                    <button className="proj-card-cta">see more &gt;</button>
                  </div>
                </ParticleCard>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="wp-footer">
          <span className="wp-footer-logo" onClick={() => navigate('/home')}>vrinda</span>
          <span className="wp-footer-copy">© 2025 — all rights reserved</span>
        </div>
      </div>
    </>
  );
}
