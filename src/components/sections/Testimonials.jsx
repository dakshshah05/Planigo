import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../../constants/data';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-sm ${star <= rating ? 'text-[--gold]' : 'text-white/10'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const initials = testimonial.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="shrink-0 w-[320px] md:w-[380px] glass rounded-2xl p-7 border border-white/5 hover:border-[--gold]/15 transition-all duration-300 mx-3">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--amber] to-[--gold] flex items-center justify-center text-black font-bold text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white/80">{testimonial.name}</p>
          <p className="text-xs text-white/30 mt-0.5">{testimonial.city}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 text-sm text-white/50 italic leading-[1.8]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonials({ className = '' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <section ref={sectionRef} className={`section-padding relative overflow-hidden ${className}`}>
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-5 block">Testimonials</span>
          <h2
            ref={titleRef}
            className="section-title font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Travelers{' '}
            <span className="gradient-text">Love Planigo.</span>
          </h2>
        </div>
      </div>

      {/* Row 1 — scroll left */}
      <div className="group mb-6 overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="group overflow-hidden">
        <div className="flex w-max animate-marquee2 hover:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
