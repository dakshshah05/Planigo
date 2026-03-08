import { footerLinks } from '../../constants/data';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useState } from 'react';

export default function Footer({ className = '' }) {
  const [email, setEmail] = useState('');

  const socialLinks = [
    { Icon: FaInstagram, label: 'Instagram' },
    { Icon: FaTwitter, label: 'Twitter' },
    { Icon: FaLinkedinIn, label: 'LinkedIn' },
    { Icon: FaYoutube, label: 'YouTube' },
  ];

  return (
    <footer className={`relative border-t border-white/5 ${className}`} id="about">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #FFB300 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--gold]/30 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="28" stroke="url(#footerGrad)" strokeWidth="3" fill="none"/>
                <path d="M24 18 L42 32 L24 46 Z" fill="url(#footerGrad)"/>
              </svg>
              <span className="text-lg font-bold font-[family-name:var(--font-syne)] gradient-text">
                planigo
              </span>
            </div>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">
              AI travel planning for every Indian budget.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[--gold] hover:border-[--gold]/40 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-[family-name:var(--font-syne)]">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-[--gold] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-[family-name:var(--font-syne)]">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-[--gold] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-[family-name:var(--font-syne)]">
              Newsletter
            </h4>
            <p className="text-sm text-white/40 mb-4">Get weekly travel deals</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none focus:border-[--gold]/40 transition-colors"
              />
              <button className="px-4 py-2 text-sm font-medium text-black rounded-lg bg-gradient-to-r from-[--amber] to-[--gold] hover:shadow-[0_0_15px_rgba(255,179,0,0.3)] transition-all shrink-0">
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center md:text-left">
            © 2025 Planigo, a SpotOn Company · Privacy Policy · Terms of Service
          </p>
          <p className="text-xs text-white/30">
            Made with ❤️ in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
