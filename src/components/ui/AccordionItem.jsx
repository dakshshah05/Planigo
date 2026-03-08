import { useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function AccordionItem({ question, answer, isOpen, onClick, className = '' }) {
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  const handleClick = () => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.inOut' });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
    } else {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.4, ease: 'power3.inOut' });
      gsap.to(iconRef.current, { rotation: 45, duration: 0.3 });
    }
    onClick();
  };

  return (
    <div className={`border-b border-white/10 ${className}`}>
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium font-[family-name:var(--font-syne)] text-white/90 group-hover:text-[--gold] transition-colors pr-4">
          {question}
        </span>
        <span
          ref={iconRef}
          className="text-2xl text-[--gold] shrink-0 leading-none select-none"
        >
          +
        </span>
      </button>
      <div ref={contentRef} className="overflow-hidden h-0">
        <p className="pb-6 text-white/50 leading-relaxed max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}
