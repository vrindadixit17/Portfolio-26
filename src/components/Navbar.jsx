import { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#home') || document.querySelector('#hero');
    if (!hero) {
      const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
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
          background: #FDF9F5;
          width: 100%;
        }

        .navbar-wrapper {
          display: flex;
          align-items: center;
          padding: 12px 32px;
          width: 100%;
        }

        /* vrinda — always far left */
        .navbar-logo {
          font-family: 'Italianno', cursive;
          font-size: 2rem;
          color: #FF7EDF;
          font-weight: 400;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: font-size 0.35s ease;
        }
        .scrolled-state .navbar-logo {
          font-size: 1.6rem;
        }

        /* spacer — takes all available space, pushing nav+portfolio right */
        /* hero: spacer is 1 unit, nav is centered visually via equal spacers */
        .navbar-spacer-left {
          flex: 1;
          transition: flex 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        /* when scrolled, collapse left spacer so nav+portfolio hug the right */
        .scrolled-state .navbar-spacer-left {
          flex: 1;
        }

        /* nav wrapper — centered in hero by equal spacers on both sides */
        .navbar-nav-wrap {
          flex-shrink: 0;
        }

        /* right spacer — mirrors left in hero, collapses on scroll */
        .navbar-spacer-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          transition: flex 0.45s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.3s ease;
        }
        .scrolled-state .navbar-spacer-right {
          flex: 0;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          width: 0;
        }

        /* portfolio word */
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
        .scrolled-state .gooey-nav-container nav ul {
          gap: 0.2em;
        }
        .gooey-nav-container nav ul li {
          border-radius: 100vw;
          position: relative;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 0 0.5px 1.5px transparent;
          color: #1C1C1C;
        }
        .gooey-nav-container nav ul li a {
          display: inline-block;
          padding: 0.35em 0.9em;
          text-decoration: none;
          color: inherit;
        }
        .gooey-nav-container nav ul li:focus-within:has(:focus-visible) {
          box-shadow: 0 0 0.5px 1.5px white;
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
        .gooey-nav-container .effect.text { display: none; }
        .gooey-nav-container .effect.text.active { display: none; }
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
        .gooey-nav-container .effect.active::after {
          animation: pill 0.3s ease both;
        }
        @keyframes pill { to { transform: scale(1); opacity: 1; } }

        .particle, .point {
          display: block;
          opacity: 0;
          width: 20px; height: 20px;
          border-radius: 100%;
          transform-origin: center;
        }
        .particle {
          --time: 5s;
          position: absolute;
          top: calc(50% - 8px);
          left: calc(50% - 8px);
          animation: particle calc(var(--time)) ease 1 -350ms;
        }
        .point {
          background: var(--color);
          opacity: 1;
          animation: point calc(var(--time)) ease 1 -350ms;
        }
        @keyframes particle {
          0%   { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          70%  { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; animation-timing-function: ease; }
          85%  { transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y)); opacity: 1; }
          100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; }
        }
        @keyframes point {
          0%   { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          25%  { transform: scale(calc(var(--scale) * 0.25)); }
          38%  { opacity: 1; }
          65%  { transform: scale(var(--scale)); opacity: 1; animation-timing-function: ease; }
          85%  { transform: scale(var(--scale)); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>

      <div className={`navbar-outer ${scrolled ? 'scrolled-state' : ''}`}>
        <header className="navbar-wrapper">

          {/* always far left */}
          <a className="navbar-logo" href="#home">vrinda</a>

          {/* left spacer — pushes nav to center in hero */}
          <div className="navbar-spacer-left" />

          {/* nav links — centered in hero, right-aligned when scrolled */}
          <div className="navbar-nav-wrap">
            <GooeyNav
              items={[
                { label: 'HOME',     href: '#home'      },
                { label: 'ABOUT',    href: '#about'     },
                { label: 'WORKS',    href: '#works'     },
                { label: 'SERVICES', href: '#services'  },
                { label: 'WORKS',    href: '#portfolio' },
              ]}
              initialActiveIndex={0}
              animationTime={600}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* right spacer with portfolio — mirrors left spacer, collapses on scroll */}
          <div className="navbar-spacer-right">
            <a className="navbar-portfolio" href="#portfolio">portfolio</a>
          </div>

        </header>
      </div>
    </>
  );
}
