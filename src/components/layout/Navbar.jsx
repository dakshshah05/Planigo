import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { navLinks } from '../../constants/data';

function PlanigLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="50%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" stroke="url(#logoGrad)" strokeWidth="3" fill="none"/>
      <path d="M24 18 L42 32 L24 46 Z" fill="url(#logoGrad)"/>
    </svg>
  );
}

export default function Navbar({ className = '' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const hamburgerLines = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
      gsap.from(linksRef.current, {
        y: 30, opacity: 0, stagger: 0.07, duration: 0.4, delay: 0.1, ease: 'power3.out'
      });
      // Morph hamburger to X
      gsap.to(hamburgerLines.current[0], { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(hamburgerLines.current[1], { opacity: 0, duration: 0.2 });
      gsap.to(hamburgerLines.current[2], { rotation: -45, y: -8, duration: 0.3 });
    } else {
      gsap.to(menuRef.current, { y: '-100%', opacity: 0, duration: 0.3 });
      gsap.to(hamburgerLines.current[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(hamburgerLines.current[1], { opacity: 1, duration: 0.2 });
      gsap.to(hamburgerLines.current[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0F]/80 backdrop-blur-[20px] border-b border-white/5'
            : 'bg-transparent'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Planigo Home">
            <PlanigLogo />
            <span className="text-xl font-bold font-[family-name:var(--font-syne)] gradient-text">
              planigo
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm text-white/60 hover:text-[--gold] transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[--gold] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-white/70 hover:text-white border border-white/10 rounded-full transition-all hover:border-white/30">
              Log In
            </button>
            <button className="px-5 py-2 text-sm font-medium text-black rounded-full bg-gradient-to-r from-[--amber] via-[--gold] to-[--orange] hover:shadow-[0_0_20px_rgba(255,179,0,0.4)] transition-all">
              Plan My Trip →
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                ref={el => hamburgerLines.current[i] = el}
                className="block w-6 h-[2px] bg-white/80 origin-center"
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
        style={{ transform: 'translateY(-100%)', opacity: 0 }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.name}
            ref={el => linksRef.current[i] = el}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white/80 hover:text-[--gold] transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="flex flex-col gap-3 mt-4">
          <button className="px-6 py-3 text-white/70 border border-white/10 rounded-full">
            Log In
          </button>
          <button className="px-6 py-3 font-medium text-black rounded-full bg-gradient-to-r from-[--amber] via-[--gold] to-[--orange]">
            Plan My Trip →
          </button>
        </div>
      </div>
    </>
  );
}
