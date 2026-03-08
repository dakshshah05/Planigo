import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AccordionItem from '../ui/AccordionItem';
import { faqs } from '../../constants/data';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ({ className = '' }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

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

      const items = listRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-padding relative ${className}`}>
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-[--gold]/60 mb-5 block">FAQ</span>
          <h2
            ref={titleRef}
            className="section-title font-extrabold font-[family-name:var(--font-syne)] text-white"
          >
            Got Questions?{' '}
            <span className="gradient-text">We&apos;ve Got Answers.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div ref={listRef} className="glass rounded-3xl p-8 md:p-12 border border-white/5">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <AccordionItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
