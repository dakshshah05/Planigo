import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function AppDownload({ className = '' }) {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-padding relative overflow-hidden ${className}`}>
      {/* Amber radial glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[--amber]/5 via-transparent to-[--gold]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[--gold]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left — Text */}
        <div ref={leftRef} className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-white mb-4">
            Plan On The Go.{' '}
            <span className="gradient-text">Download Free.</span>
          </h2>
          <p className="text-lg text-white/40 mb-8 max-w-md mx-auto lg:mx-0">
            Available on iOS and Android. Offline access included.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[--gold]/30 transition-all group">
              <FaApple size={24} className="text-white/80 group-hover:text-white" />
              <div className="text-left">
                <span className="text-[10px] text-white/40 block leading-tight">Download on the</span>
                <span className="text-sm font-semibold text-white">App Store</span>
              </div>
            </button>
            <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[--gold]/30 transition-all group">
              <FaGooglePlay size={20} className="text-white/80 group-hover:text-white" />
              <div className="text-left">
                <span className="text-[10px] text-white/40 block leading-tight">Get it on</span>
                <span className="text-sm font-semibold text-white">Google Play</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right — Phone Mockup */}
        <div ref={rightRef} className="w-full lg:w-1/2 flex justify-center">
          <div className="animate-float">
            <div className="relative w-[260px] h-[520px] rounded-[36px] border-[3px] border-white/10 bg-gradient-to-b from-[#111118] to-[#0A0A0F] p-2 shadow-[0_0_60px_rgba(255,179,0,0.08)]">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full" />

              {/* Screen Content */}
              <div className="w-full h-full rounded-[30px] bg-[#0A0A0F] overflow-hidden pt-8 px-4 pb-4">
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-white/30">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-3 h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-4 h-1.5 bg-[--gold]/50 rounded-sm" />
                  </div>
                </div>

                {/* Mini App UI */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[--amber] to-[--gold]" />
                  <span className="text-xs font-bold gradient-text font-[family-name:var(--font-syne)]">planigo</span>
                </div>

                <div className="bg-white/[0.03] rounded-xl p-3 mb-3">
                  <span className="text-[10px] text-white/30 block mb-1">Next Trip</span>
                  <span className="text-sm font-semibold text-white">Goa Weekend</span>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full text-[8px] bg-[--gold]/10 text-[--gold]">3 Days</span>
                    <span className="px-2 py-0.5 rounded-full text-[8px] bg-green-500/10 text-green-400">On Budget</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] rounded-xl p-3 mb-3">
                  <span className="text-[10px] text-white/30 block mb-1">Budget</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold gradient-text">₹6,200</span>
                    <span className="text-[10px] text-white/20">/ ₹8,000</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[77%] rounded-full bg-gradient-to-r from-[--amber] to-[--gold]" />
                  </div>
                </div>

                <div className="bg-white/[0.03] rounded-xl p-3">
                  <span className="text-[10px] text-white/30 block mb-2">Today</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🏖️</span>
                      <span className="text-[10px] text-white/50">Baga Beach</span>
                      <span className="text-[8px] text-white/20 ml-auto">10 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🍽️</span>
                      <span className="text-[10px] text-white/50">Lunch at Britto's</span>
                      <span className="text-[8px] text-white/20 ml-auto">1 PM</span>
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-around py-2 bg-white/[0.03] rounded-full">
                  {['🏠', '🗺️', '💰', '👤'].map((icon, i) => (
                    <span key={i} className={`text-sm ${i === 0 ? 'opacity-100' : 'opacity-30'}`}>{icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
