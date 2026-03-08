import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: 'Hotels', amount: 3200, total: 4000, icon: '🏨', status: '✓' },
  { label: 'Transport', amount: 1800, total: 3000, icon: '🚌', status: '✓' },
  { label: 'Food', amount: 1500, total: 2000, icon: '🍽️', status: '⏳' },
  { label: 'Activities', amount: 2000, total: 2500, icon: '🎯', status: '✓' },
];

const totalSpent = 8500;
const totalBudget = 10000;

export default function Dashboard({ className = '' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const donutRef = useRef(null);
  const barsRef = useRef([]);
  const remainingRef = useRef(null);
  const statusRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title clip-path reveal
      gsap.fromTo(titleRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      // Left content slide in
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
      });

      // Right mockup scale up
      gsap.from(rightRef.current, {
        scale: 0.88,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 75%' },
      });

      // Donut SVG stroke animation
      if (donutRef.current) {
        const circumference = 2 * Math.PI * 70;
        const spent = (totalSpent / totalBudget) * circumference;
        gsap.fromTo(donutRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference - spent,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: donutRef.current, start: 'top 85%' },
          }
        );
      }

      // Progress bars
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          const pct = (categories[i].amount / categories[i].total) * 100;
          gsap.from(bar, {
            width: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 85%' },
          });
        }
      });

      // Status pills pop in
      statusRefs.current.forEach((pill, i) => {
        if (pill) {
          gsap.from(pill, {
            scale: 0,
            duration: 0.4,
            delay: 0.5 + i * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: pill, start: 'top 85%' },
          });
        }
      });

      // Counter animation for remaining
      if (remainingRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: totalBudget - totalSpent,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: remainingRef.current, start: 'top 85%' },
          onUpdate: () => {
            if (remainingRef.current) {
              remainingRef.current.textContent = '₹' + Math.floor(obj.val).toLocaleString('en-IN');
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const circumference = 2 * Math.PI * 70;

  return (
    <section ref={sectionRef} className={`section-padding relative ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-4 block">Dashboard</span>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Your Money.{' '}
            <span className="gradient-text">Fully In Control.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left — Description */}
          <div ref={leftRef} className="w-full lg:w-[40%]">
            <h3 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white mb-4">
              Real-Time Budget Tracking
            </h3>
            <p className="text-white/40 leading-relaxed mb-6">
              Watch your spending in real-time. Every booking updates your dashboard instantly — so you always
              know exactly where your money is going and how much you have left.
            </p>
            <div className="space-y-3">
              {['Live expense tracking', 'Per-category breakdown', 'Smart alerts on overspend', 'Group split view'].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[--gold]/10 flex items-center justify-center">
                    <span className="text-[10px] text-[--gold]">✓</span>
                  </div>
                  <span className="text-sm text-white/50">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard Mockup */}
          <div ref={rightRef} className="w-full lg:w-[60%]">
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Trip: Bangalore Weekend</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    ✓ Active
                  </span>
                </div>
              </div>

              {/* Donut + Total */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-36 h-36 shrink-0">
                  <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                    {/* Progress arc */}
                    <circle
                      ref={donutRef}
                      cx="80" cy="80" r="70"
                      fill="none"
                      stroke="url(#dashGrad)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference}
                    />
                    <defs>
                      <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF6B00" />
                        <stop offset="100%" stopColor="#FFB300" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold gradient-text font-[family-name:var(--font-syne)]">85%</span>
                    <span className="text-[10px] text-white/30">spent</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-white font-[family-name:var(--font-syne)]">₹8,500</p>
                  <p className="text-xs text-white/20 mt-1">Budget: ₹10,000</p>
                </div>
              </div>

              {/* Category Bars */}
              <div className="space-y-3 mb-6">
                {categories.map((cat, i) => {
                  const pct = (cat.amount / cat.total) * 100;
                  return (
                    <div key={cat.label} className="flex items-center gap-3">
                      <span className="text-base w-6">{cat.icon}</span>
                      <span className="text-xs text-white/40 w-20">{cat.label}</span>
                      <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                        <div
                          ref={el => barsRef.current[i] = el}
                          className="h-full rounded-full bg-gradient-to-r from-[--amber] to-[--gold]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/50 w-14 text-right">₹{cat.amount.toLocaleString('en-IN')}</span>
                      <span
                        ref={el => statusRefs.current[i] = el}
                        className={`text-xs w-5 h-5 rounded-full flex items-center justify-center ${
                          cat.status === '✓' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {cat.status}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Remaining */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-sm text-white/40">Remaining</span>
                <div className="flex items-center gap-3">
                  <span ref={remainingRef} className="text-lg font-bold gradient-text font-[family-name:var(--font-syne)]">₹0</span>
                  <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[--amber] to-[--gold] text-black text-xs font-semibold hover:shadow-lg transition-all">
                    Pay Remaining
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
