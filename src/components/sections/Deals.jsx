import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { deals } from '../../constants/data';

gsap.registerPlugin(ScrollTrigger);

export default function Deals({ className = '' }) {
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

      const cards = cardsRef.current?.querySelectorAll('.deal-card');
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-padding relative ${className}`} id="deals">
      <style>{`
        .deal-flip-inner {
          transform-style: preserve-3d;
          transition: transform 0.7s ease-out;
        }
        .deal-card:hover .deal-flip-inner {
          transform: rotateY(180deg);
        }
        .deal-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .deal-face-back {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-4 block">Deals</span>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Exclusive Deals.{' '}
            <span className="gradient-text">Only on Planigo.</span>
          </h2>
        </div>

        {/* Deal Cards — 3D Flip */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.name}
              className="deal-card"
              style={{ perspective: '1000px' }}
            >
              <div className="deal-flip-inner relative w-full h-64">
                {/* Front Face */}
                <div className="deal-face absolute inset-0 glass rounded-2xl p-6 flex flex-col border border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{deal.emoji}</span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[--amber] to-[--gold] text-black text-xs font-bold">
                      {deal.discount}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white mb-2">{deal.name}</h3>
                  <p className="text-sm text-white/40 mt-auto">{deal.description}</p>
                  <div className="mt-4 text-[10px] text-[--gold]/50 uppercase tracking-wider">Hover to see details →</div>
                </div>

                {/* Back Face */}
                <div className="deal-face deal-face-back absolute inset-0 rounded-2xl p-6 flex flex-col justify-center bg-gradient-to-br from-[--amber] via-[--gold] to-[--orange]">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-black mb-3">{deal.name}</h3>
                  <p className="text-sm text-black/70 leading-relaxed mb-4">{deal.detail}</p>
                  <button className="mt-auto self-start px-5 py-2 rounded-full bg-black text-[--gold] text-sm font-semibold hover:bg-black/80 transition-colors">
                    Claim Deal →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
