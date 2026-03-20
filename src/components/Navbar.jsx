import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GooeyNav from './GooeyNav';

const NAV_ITEMS = [
  { label: 'HOME',    href: '/home',           sectionId: 'home'    },
  { label: 'SKILLS',  href: '/skills',         sectionId: 'skills'  },
  { label: 'WORKS',   href: '/works-projects', sectionId: 'works'   },
  { label: 'CONTACT', href: '/contact',        sectionId: 'contact' },
];

export default function Navbar({ rightAlign = false }) {
  const [scrolled, setScrolled]       = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dark, setDark]               = useState(false);
  const location                      = useLocation();

  const getPathIndex = () => {
    if (location.pathname.startsWith('/home'))    return 0;
    if (location.pathname.startsWith('/skills'))  return 1;
    if (location.pathname.startsWith('/works'))   return 2;
    if (location.pathname.startsWith('/contact')) return 3;
    return -1; // -1 means we're on a page with scroll-spy (e.g. single-page home)
  };

  const pathIndex = getPathIndex();

  // ✅ Use path-based index when on a named route, otherwise use scroll-spy index
  const activeNavIndex = pathIndex !== -1 ? pathIndex : activeIndex;

  const toggle = () => {
    setDark(d => {
      const next = !d;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const hero = document.querySelector('#home')
               || document.querySelector('#hero');

    if (!hero) {
      setScrolled(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // ✅ Fixed: uses pathIndex (not the deleted pathIndex variable reference)
  useEffect(() => {
    if (pathIndex !== -1) return; // skip scroll detection on named route pages
    const observers = [];
    const visible = new Map();
    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.querySelector(`#${sectionId}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
          let bestIdx = 0, bestRatio = -1;
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
  }, [pathIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Poppins:wght@400;500;600&display=swap');

        :root {
          --color-1: #FF7EDF;
          --color-2: #5862E9;
          --color-3: #ED6951;
          --color-4: #DCFA40;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .navbar-outer {
          position: sticky;
          top: 0;
          z-index: 100;
          background: transparent;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 32px;
          pointer-events: none;
        }
        .navbar-outer > * { pointer-events: all; }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .theme-toggle {
          background: none;
          border: 1.5px solid var(--pink, #FF7EDF);
          cursor: pointer;
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: transform 0.3s ease, background 0.2s ease;
          line-height: 1; padding: 0;
        }
        .theme-toggle:hover {
          background: var(--pink, #FF7EDF);
          transform: rotate(20deg);
        }

        .navbar-center {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(253, 249, 245, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 8px 20px;
          box-shadow: none;
          transition: all 0.45s cubic-bezier(0.22,1,0.36,1);
        }

        .scrolled-state .navbar-center {
          position: static;
          transform: none;
          margin-left: auto;
          background: var(--nav-pill, rgba(253, 249, 245, 0.95));
          box-shadow: var(--nav-pill-shadow, 0 4px 24px rgba(0,0,0,0.08));
        }

        .right-align .navbar-center {
          position: static;
          transform: none;
          margin-left: auto;
          background: var(--nav-pill, rgba(253, 249, 245, 0.95));
          box-shadow: var(--nav-pill-shadow, 0 4px 24px rgba(0,0,0,0.08));
        }

        .navbar-logo {
          font-family: 'Italianno', cursive;
          font-size: 2rem;
          color: var(--pink, #FF7EDF);
          font-weight: 400; line-height: 1;
          text-decoration: none; white-space: nowrap;
          flex-shrink: 0; overflow: hidden;
          max-width: 120px; opacity: 1;
          margin-right: 16px;
          transition: opacity 0.3s ease, max-width 0.4s cubic-bezier(0.22,1,0.36,1), margin-right 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .scrolled-state .navbar-logo,
        .right-align .navbar-logo {
          opacity: 0; max-width: 0; margin-right: 0; pointer-events: none;
        }

        .navbar-portfolio-wrap {
          overflow: hidden; max-width: 160px; opacity: 1; margin-left: 16px;
          transition: opacity 0.3s ease, max-width 0.4s cubic-bezier(0.22,1,0.36,1), margin-left 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .scrolled-state .navbar-portfolio-wrap,
        .right-align .navbar-portfolio-wrap {
          opacity: 0; max-width: 0; margin-left: 0; pointer-events: none;
        }

        .navbar-portfolio {
          font-family: 'Italianno', cursive;
          font-size: 2rem; color: var(--pink, #FF7EDF);
          font-weight: 400; line-height: 1;
          text-decoration: none; white-space: nowrap;
        }

        .gooey-nav-container { position: relative; }
        .gooey-nav-container nav { display: flex; position: relative; transform: translate3d(0,0,0.01px); }
        .gooey-nav-container nav ul {
          display: flex; gap: 1.6em; list-style: none;
          padding: 0 0.5em; margin: 0; position: relative; z-index: 3;
          color: var(--text, #1C1C1C); font-family: 'Poppins', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          transition: gap 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .scrolled-state .gooey-nav-container nav ul { gap: 0.2em; }

        .gooey-nav-container nav ul li {
          border-radius: 100vw; position: relative; cursor: pointer;
          transition: color 0.3s ease; color: var(--text, #1C1C1C);
        }
        .gooey-nav-container nav ul li a {
          display: inline-block; padding: 0.35em 0.9em;
          text-decoration: none; color: inherit;
        }
        .gooey-nav-container nav ul li::after { content: none; }

        .gooey-nav-container .effect {
          position: absolute; left: 0; top: 0;
          width: 0; height: 0; opacity: 1;
          pointer-events: none; display: grid; place-items: center; z-index: 1;
        }
        .gooey-nav-container .effect.text {
          color: transparent; transition: color 0.3s ease;
          font-family: 'Poppins', sans-serif; font-size: 0.82rem;
          font-weight: 500; white-space: nowrap; overflow: hidden;
        }
        .gooey-nav-container .effect.text.active { color: #1C1C1C; }
        .gooey-nav-container .effect.filter { filter: none; mix-blend-mode: normal; }
        .gooey-nav-container .effect.filter::before { content: none; }
        .gooey-nav-container .effect.filter::after {
          content: ''; position: absolute; inset: 0;
          background: var(--pink, #FF7EDF); transform: scale(0);
          opacity: 0; z-index: -1; border-radius: 12px;
        }
        .gooey-nav-container .effect.active::after { animation: pill 0.3s ease both; }
        @keyframes pill { to { transform: scale(1); opacity: 1; } }

        .particle, .point {
          display: block; opacity: 0; width: 20px; height: 20px;
          border-radius: 100%; transform-origin: center;
        }
        .particle {
          --time: 5s; position: absolute;
          top: calc(50% - 8px); left: calc(50% - 8px);
          animation: particle calc(var(--time)) ease 1 -350ms;
        }
        .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease 1 -350ms; }
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

      <div className={`navbar-outer ${scrolled ? 'scrolled-state' : ''} ${rightAlign ? 'right-align' : ''}`}>

        <div className="navbar-left">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="navbar-center">
          <a className="navbar-logo" href="#home">vrinda</a>
          <GooeyNav
  key={activeNavIndex}
  items={NAV_ITEMS}
  initialActiveIndex={activeNavIndex}
  activeIndex={activeNavIndex}
  animationTime={600}
  particleCount={15}
  particleDistances={[90, 10]}
  particleR={100}
  timeVariance={300}
  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
/>
          <div className="navbar-portfolio-wrap">
            <a className="navbar-portfolio" href="#portfolio">portfolio</a>
          </div>
        </div>

      </div>
    </>
  );
}
