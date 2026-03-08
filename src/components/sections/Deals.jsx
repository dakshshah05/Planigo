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
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-5 block">Deals</span>
          <h2
            ref={titleRef}
            className="section-title font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Exclusive Deals.{' '}
            <span className="gradient-text">Only on Planigo.</span>
          </h2>
        </div>

        {/* Deal Cards — 3D Flip */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.name}
              className="deal-card"
              style={{ perspective: '1000px' }}
            >
              <div className="deal-flip-inner relative w-full h-72 md:h-80">
                {/* Front Face */}
                <div className="deal-face absolute inset-0 glass rounded-2xl p-8 flex flex-col border border-white/5">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl">{deal.emoji}</span>
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[--amber] to-[--gold] text-black text-xs font-bold">
                      {deal.discount}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-syne)] text-white mb-3">{deal.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mt-auto">{deal.description}</p>
                  <div className="mt-5 text-[10px] text-[--gold]/50 uppercase tracking-wider">Hover to see details →</div>
                </div>

                {/* Back Face */}
                <div className="deal-face deal-face-back absolute inset-0 rounded-2xl p-8 flex flex-col justify-center bg-gradient-to-br from-[--amber] via-[--gold] to-[--orange]">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-syne)] text-black mb-4">{deal.name}</h3>
                  <p className="text-sm text-black/70 leading-[1.8] mb-6">{deal.detail}</p>
                  <button className="mt-auto self-start px-6 py-2.5 rounded-full bg-black text-[--gold] text-sm font-semibold hover:bg-black/80 transition-colors">
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
