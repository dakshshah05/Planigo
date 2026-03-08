import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../../constants/data';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
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
    <div className="shrink-0 w-[300px] md:w-[340px] glass rounded-2xl p-6 border border-white/5 hover:border-[--gold]/15 transition-all duration-300 mx-2">
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--amber] to-[--gold] flex items-center justify-center text-black font-bold text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white/80">{testimonial.name}</p>
          <p className="text-xs text-white/30">{testimonial.city}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
      <p className="mt-3 text-sm text-white/50 italic leading-relaxed">
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
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-4 block">Testimonials</span>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Travelers{' '}
            <span className="gradient-text">Love Planigo.</span>
          </h2>
        </div>
      </div>

      {/* Row 1 — scroll left */}
      <div className="group mb-4">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="group">
        <div className="flex animate-marquee2 hover:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
