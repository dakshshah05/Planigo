import { useRef, useEffect, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const budgetData = [
  { label: 'Hotel', percent: 35, amount: '₹4,200' },
  { label: 'Transport', percent: 25, amount: '₹3,000' },
  { label: 'Food', percent: 20, amount: '₹2,400' },
  { label: 'Activities', percent: 20, amount: '₹2,400' },
];

const itineraryDays = [
  { day: 'Day 1', items: [
    { icon: '🏨', label: 'Check-in Hotel', time: '2:00 PM' },
    { icon: '🍽️', label: 'Lunch at Vidyarthi Bhavan', time: '3:30 PM' },
    { icon: '🎯', label: 'Cubbon Park Walk', time: '5:00 PM' },
  ]},
  { day: 'Day 2', items: [
    { icon: '☕', label: 'Breakfast', time: '8:00 AM' },
    { icon: '🎟️', label: 'Lalbagh Gardens', time: '10:00 AM' },
  ]},
  { day: 'Day 3', items: [
    { icon: '🚆', label: 'Train to Mysore', time: '7:00 AM' },
    { icon: '🏛️', label: 'Mysore Palace', time: '11:00 AM' },
  ]},
];

const bookingIcons = [
  { emoji: '✈️', label: 'Flights' },
  { emoji: '🏨', label: 'Hotels' },
  { emoji: '🚆', label: 'Trains' },
  { emoji: '🚌', label: 'Buses' },
  { emoji: '🍽️', label: 'Restaurants' },
  { emoji: '🎟️', label: 'Activities' },
];

function Features({ className = '' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(0);
    const my = ((e.clientY - rect.top) / rect.height * 100).toFixed(0);
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  }, []);

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

      const cards = gridRef.current?.querySelectorAll('.feat-grid-card');
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        });
      }

      // Budget bars animation
      const bars = gridRef.current?.querySelectorAll('.budget-bar-fill');
      if (bars) {
        bars.forEach(bar => {
          const w = bar.dataset.width;
          gsap.from(bar, {
            width: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 85%' },
          });
        });
      }

      // Itinerary items stagger
      const itinItems = gridRef.current?.querySelectorAll('.itin-item');
      if (itinItems) {
        gsap.from(itinItems, {
          x: -20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: itinItems[0], start: 'top 85%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-padding relative ${className}`} id="features">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-4 block">Features</span>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Everything You Need.{' '}
            <span className="gradient-text">Nothing You Don&apos;t.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Smart Budget Planner — Large, col-span-2 */}
          <div
            className="feat-grid-card feat-card rounded-2xl p-6 md:p-8 border border-white/5 md:col-span-2 hover:border-[--gold]/20 transition-all duration-500"
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--amber]/20 to-[--gold]/10 flex items-center justify-center text-lg">
                💰
              </div>
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white">Smart Budget Planner</h3>
                <p className="text-xs text-white/30">AI-powered allocation</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {budgetData.map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/40 w-16 shrink-0">{item.label}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="budget-bar-fill h-full rounded-full bg-gradient-to-r from-[--amber] to-[--gold]"
                      style={{ width: `${item.percent}%` }}
                      data-width={`${item.percent}%`}
                    />
                  </div>
                  <span className="text-xs text-white/50 w-14 text-right">{item.amount}</span>
                  <span className="text-xs text-white/20">{item.percent}%</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-sm text-white/40">Total Budget</span>
              <span className="text-lg font-bold gradient-text font-[family-name:var(--font-syne)]">₹12,000</span>
            </div>
          </div>

          {/* One-Click Itinerary — Tall, row-span-2 */}
          <div
            className="feat-grid-card feat-card rounded-2xl p-6 border border-white/5 md:row-span-2 hover:border-[--gold]/20 transition-all duration-500 overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--cyan]/20 to-[--cyan]/5 flex items-center justify-center text-lg">
                📋
              </div>
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white">One-Click Itinerary</h3>
                <p className="text-xs text-white/30">Generated in 3 seconds</p>
              </div>
            </div>
            <div className="space-y-4">
              {itineraryDays.map((day, di) => (
                <div key={day.day}>
                  <div className="text-xs font-semibold text-[--gold] uppercase tracking-wider mb-2">{day.day}</div>
                  <div className="space-y-2">
                    {day.items.map((item, ii) => (
                      <div key={ii} className="itin-item flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                        <span className="text-base">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/70 truncate">{item.label}</p>
                        </div>
                        <span className="text-[10px] text-white/30 shrink-0">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unified Booking Engine */}
          <div
            className="feat-grid-card feat-card rounded-2xl p-6 border border-white/5 hover:border-[--gold]/20 transition-all duration-500"
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--purple]/20 to-[--purple]/5 flex items-center justify-center text-lg">
                🔗
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white">Unified Booking</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {bookingIcons.map(item => (
                <div key={item.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] hover:scale-110 transition-all cursor-default">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-[10px] text-white/40">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Modal Transit */}
          <div
            className="feat-grid-card feat-card rounded-2xl p-6 border border-white/5 hover:border-[--gold]/20 transition-all duration-500"
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--cyan]/20 to-[--cyan]/5 flex items-center justify-center text-lg">
                🚄
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white">Multi-Modal Transit</h3>
            </div>
            {/* Animated route diagram */}
            <div className="flex items-center justify-between gap-1 px-2 py-3">
              {[
                { icon: '🏙️', label: 'City' },
                { icon: '🚆', label: 'Train' },
                { icon: '🚇', label: 'Metro' },
                { icon: '🚕', label: 'Cab' },
                { icon: '🏨', label: 'Hotel' },
              ].map((stop, i, arr) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <span className="text-base">{stop.icon}</span>
                    <span className="text-[9px] text-white/30 mt-0.5">{stop.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-4 md:w-6 h-px border-t border-dashed border-[--gold]/30" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SPOTON Deals — col-span-2 */}
          <div
            className="feat-grid-card feat-card rounded-2xl p-6 md:p-8 border border-white/5 md:col-span-2 hover:border-[--gold]/20 transition-all duration-500"
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--amber]/20 to-[--gold]/10 flex items-center justify-center text-lg">
                  🔥
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white">SPOTON Deals</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[--amber] to-[--gold] text-black text-sm font-bold">
                Up to 50% OFF
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Indian', 'Chinese', 'Italian', 'Cafe'].map(pill => (
                <button
                  key={pill}
                  className="px-4 py-1.5 rounded-full text-xs border border-white/10 text-white/50 hover:border-[--gold]/40 hover:text-[--gold] transition-all duration-300 active:scale-95"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Flexible Editor */}
          <div
            className="feat-grid-card feat-card rounded-2xl p-6 border border-white/5 hover:border-[--gold]/20 transition-all duration-500"
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--purple]/20 to-[--purple]/5 flex items-center justify-center text-lg">
                ✏️
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white">Flex Editor</h3>
            </div>
            <div className="space-y-2">
              {['Day 1: Bangalore', 'Day 2: Mysore', 'Day 3: Coorg'].map((day, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] group">
                  <span className="text-white/20 cursor-grab group-hover:text-[--gold]/40 transition-colors">⠿</span>
                  <span className="text-xs text-white/60">{day}</span>
                  <span className="ml-auto text-white/10 group-hover:text-white/30 text-xs transition-colors">⇅</span>
                </div>
              ))}
              <p className="text-[10px] text-white/20 text-center mt-2">Drag to reorder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Features);
