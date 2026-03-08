import { useRef, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { destinations } from '../../constants/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

function Destinations({ className = '' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  return (
    <section ref={sectionRef} className={`section-padding relative overflow-hidden ${className}`} id="destinations">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-5 block">Destinations</span>
            <h2
              ref={titleRef}
              className="section-title font-extrabold font-[family-name:var(--font-syne)] text-white"
            >
              Explore India on{' '}
              <span className="gradient-text">Any Budget.</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              ref={prevRef}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[--gold] hover:border-[--gold]/40 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[--gold] hover:border-[--gold]/40 transition-all"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[FreeMode, Navigation]}
          spaceBetween={20}
          slidesPerView={1.1}
          freeMode={{ enabled: true, sticky: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            480: { slidesPerView: 1.4, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest.city}>
              <div
                className="group relative rounded-2xl border border-white/5 overflow-hidden hover:border-[--gold]/20 hover:scale-[1.03] transition-all duration-500 cursor-pointer"
                style={{ background: dest.gradient }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="relative p-7 pt-40">
                  {/* Tag */}
                  <span className="inline-block px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider border border-white/10 text-white/50 mb-4">
                    {dest.tag}
                  </span>

                  {/* City Name */}
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white mb-3">
                    {dest.city}
                  </h3>

                  {/* Budget */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-white/30">from</span>
                    <span className="text-xl font-bold gradient-text">{dest.budget}</span>
                  </div>

                  {/* Season */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs text-white/30">Best:</span>
                    <span className="text-sm text-white/50">{dest.season}</span>
                  </div>

                  {/* CTA */}
                  <button className="text-sm font-medium text-[--gold] hover:text-[--orange] transition-colors group-hover:translate-x-1 duration-300">
                    Explore →
                  </button>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 60px rgba(255,179,0,0.08)' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default memo(Destinations);
