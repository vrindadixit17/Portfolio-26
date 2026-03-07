import { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';

// Map each nav item to the section id it corresponds to
const NAV_ITEMS = [
  { label: 'HOME',     href: '#home',      sectionId: 'home'      },
  { label: 'ABOUT',    href: '#about',     sectionId: 'about'     },
  { label: 'SKILLS',    href: '#skills',     sectionId: 'skills'     },
  { label: 'WORKS',    href: '#works',     sectionId: 'works'     },
  { label: 'PROJECTS',    href: '#projects', sectionId: 'projects' },
  { label: 'SERVICES', href: '#services',  sectionId: 'services'  },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeIndex, setActiveIndex]   = useState(0);

  // ── 1. scrolled state (hero leaves viewport) ──────────────────────────────
  useEffect(() => {
    const hero = document.querySelector('#home') || document.querySelector('#hero');
    if (!hero) {
      const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // ── 2. active nav index based on which section is in view ─────────────────
  useEffect(() => {
    const observers = [];

    // Track which sections are currently intersecting
    const visible = new Map(); // sectionId → intersectionRatio

    NAV_ITEMS.forEach(({ sectionId }, idx) => {
      const el = document.querySelector(`#${sectionId}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);

          // Pick the section with the highest visible ratio
          let bestIdx = 0;
          let bestRatio = -1;
          NAV_ITEMS.forEach(({ sectionId: sid }, i) => {
            const ratio = visible.get(sid) || 0;
            if (ratio > bestRatio) { bestRatio = ratio; bestIdx = i; }
          });
          setActiveIndex(bestIdx);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Poppins:wght@400;500;600&display=swap');

        :root {
          --color-1: #FF7EDF;
          --color-2: #5862E9;
          --color-3: #ED6951;
          --color-4: #DCFA40;
          --linear-ease: linear(
            0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245,
            1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949,
            0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013,
            1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1
          );
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .navbar-outer {
          position: sticky;
          top: 0;
          z-index: 100;
          background: transparent;
          width: 100%;
        }

        .navbar-wrapper {
          display: flex;
          align-items: center;
          padding: 12px 32px;
          width: 100%;
        }

        .navbar-logo {
          font-family: 'Italianno', cursive;
          font-size: 2rem;
          color: #FF7EDF;
          font-weight: 400;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          overflow: hidden;
          max-width: 120px;
          opacity: 1;
          transition:
            font-size 0.35s ease,
            opacity 0.3s ease,
            max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            margin-right 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .scrolled-state .navbar-logo {
          font-size: 1.6rem;
          opacity: 0;
          max-width: 0;
          margin-right: 0;
          pointer-events: none;
        }

        .navbar-spacer-left { flex: 1; }

        .navbar-nav-wrap { flex-shrink: 0; }

        .navbar-spacer-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          transition: flex 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
          overflow: hidden;
        }
        .scrolled-state .navbar-spacer-right {
          flex: 0;
          opacity: 0;
          pointer-events: none;
          width: 0;
        }

        .navbar-portfolio {
          font-family: 'Italianno', cursive;
          font-size: 2rem;
          color: #FF7EDF;
          font-weight: 400;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
        }

        /* ── GooeyNav ── */
        .gooey-nav-container { position: relative; }
        .gooey-nav-container nav {
          display: flex;
          position: relative;
          transform: translate3d(0, 0, 0.01px);
        }
        .gooey-nav-container nav ul {
          display: flex;
          gap: 1.6em;
          list-style: none;
          padding: 0 0.5em;
          margin: 0;
          position: relative;
          z-index: 3;
          color: #1C1C1C;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          transition: gap 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .scrolled-state .gooey-nav-container nav ul { gap: 0.2em; }

        .gooey-nav-container nav ul li {
          border-radius: 100vw;
          position: relative;
          cursor: pointer;
          transition: color 0.3s ease;
          color: #1C1C1C;
        }
        .gooey-nav-container nav ul li a {
          display: inline-block;
          padding: 0.35em 0.9em;
          text-decoration: none;
          color: inherit;
        }
        .gooey-nav-container nav ul li::after { content: none; }

        .gooey-nav-container .effect {
          position: absolute;
          left: 0; top: 0;
          width: 0; height: 0;
          opacity: 1;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 1;
        }

        /* ── text layer: transparent normally, dark on active (shows inside pill) ── */
        .gooey-nav-container .effect.text {
          color: transparent;
          transition: color 0.3s ease;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
        }
        .gooey-nav-container .effect.text.active { color: #1C1C1C; }

        .gooey-nav-container .effect.filter { filter: none; mix-blend-mode: normal; }
        .gooey-nav-container .effect.filter::before { content: none; }
        .gooey-nav-container .effect.filter::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #FF7EDF;
          transform: scale(0);
          opacity: 0;
          z-index: -1;
          border-radius: 12px;
        }
        .gooey-nav-container .effect.active::after { animation: pill 0.3s ease both; }
        @keyframes pill { to { transform: scale(1); opacity: 1; } }

        .particle, .point {
          display: block; opacity: 0;
          width: 20px; height: 20px;
          border-radius: 100%; transform-origin: center;
        }
        .particle {
          --time: 5s;
          position: absolute;
          top: calc(50% - 8px); left: calc(50% - 8px);
          animation: particle calc(var(--time)) ease 1 -350ms;
        }
        .point {
          background: var(--color); opacity: 1;
          animation: point calc(var(--time)) ease 1 -350ms;
        }
        @keyframes particle {
          0%   { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); opacity: 1; animation-timing-function: cubic-bezier(0.55,0,1,0.45); }
          70%  { transform: rotate(calc(var(--rotate)*0.5)) translate(calc(var(--end-x)*1.2),calc(var(--end-y)*1.2)); opacity:1; animation-timing-function:ease; }
          85%  { transform: rotate(calc(var(--rotate)*0.66)) translate(var(--end-x),var(--end-y)); opacity:1; }
          100% { transform: rotate(calc(var(--rotate)*1.2)) translate(calc(var(--end-x)*0.5),calc(var(--end-y)*0.5)); opacity:1; }
        }
        @keyframes point {
          0%   { transform:scale(0); opacity:0; animation-timing-function:cubic-bezier(0.55,0,1,0.45); }
          25%  { transform:scale(calc(var(--scale)*0.25)); }
          38%  { opacity:1; }
          65%  { transform:scale(var(--scale)); opacity:1; animation-timing-function:ease; }
          85%  { transform:scale(var(--scale)); opacity:1; }
          100% { transform:scale(0); opacity:0; }
        }
      `}</style>

      <div className={`navbar-outer ${scrolled ? 'scrolled-state' : ''}`}>
        <header className="navbar-wrapper">
          <a className="navbar-logo" href="#home">vrinda</a>
          <div className="navbar-spacer-left" />
          <div className="navbar-nav-wrap">
            <GooeyNav
              items={NAV_ITEMS}
              initialActiveIndex={activeIndex}
              activeIndex={activeIndex}
              animationTime={600}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
          <div className="navbar-spacer-right">
            <a className="navbar-portfolio" href="#portfolio">portfolio</a>
          </div>
        </header>
      </div>
    </>
  );
}
