import { marqueeItems } from '../../constants/data';

export default function MarqueeStrip({ className = '' }) {
  const row = marqueeItems.map((item, i) => (
    <span key={i} className="flex items-center gap-4 whitespace-nowrap">
      <span className="text-[--gold] text-sm">✦</span>
      <span className="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">
        {item}
      </span>
    </span>
  ));

  return (
    <section className={`relative py-6 overflow-hidden border-y border-white/5 bg-white/[0.02] ${className}`}>
      {/* Row 1 — left scroll */}
      <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused] mb-3">
        {row}
        {row}
      </div>
      {/* Row 2 — right scroll */}
      <div className="flex gap-8 animate-marquee2 hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </section>
  );
}
