import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksSteps } from '../../constants/data';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks({ className = '' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.step-card');
      if (cards) {
        gsap.from(cards, {
          y: 70,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-padding relative ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-4 block">How It Works</span>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Three Steps to Your{' '}
            <span className="gradient-text">Perfect Trip</span>
          </h2>
        </div>

        {/* Step Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.num}
              className="step-card group relative glass rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Large faded step number */}
              <span className="absolute top-4 right-4 text-[64px] font-extrabold font-[family-name:var(--font-syne)] text-white/[0.04] group-hover:text-white/[0.08] transition-colors leading-none select-none">
                {step.num}
              </span>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[--gold]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[--amber]/20 to-[--gold]/10 flex items-center justify-center text-2xl mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold font-[family-name:var(--font-syne)] text-white mb-3">
                {step.title}
              </h3>
              <p className="relative text-sm text-white/40 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting line (desktop) */}
        <div className="hidden md:flex items-center justify-center mt-8">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[--amber] to-[--gold]" />
                {i < 2 && <div className="w-24 h-px bg-gradient-to-r from-[--gold]/40 to-[--gold]/10" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
