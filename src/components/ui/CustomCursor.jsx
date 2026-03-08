import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const raf = useRef(null);

  const handleMouseMove = useCallback((e) => {
    pos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    // Check if pointer is coarse (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', handleMouseMove);

    const hoverTargets = () => document.querySelectorAll('a, button, [data-cursor="hover"]');

    const onEnter = () => {
      isHovering.current = true;
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: 2.2, backgroundColor: 'rgba(255,140,0,0.1)', duration: 0.3 });
      }
      if (dotRef.current) {
        gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
      }
    };

    const onLeave = () => {
      isHovering.current = false;
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      }
      if (dotRef.current) {
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    const onClick = () => {
      gsap.to([dotRef.current, ringRef.current], {
        scale: 0.7, duration: 0.1, onComplete: () => {
          gsap.to(dotRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.3)' });
          gsap.to(ringRef.current, { scale: isHovering.current ? 2.2 : 1, duration: 0.4, ease: 'elastic.out(1,0.3)' });
        }
      });
    };

    // Attach hover event listeners
    const attachListeners = () => {
      hoverTargets().forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    attachListeners();
    window.addEventListener('click', onClick);

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px) scale(${ringRef.current.style.transform?.match(/scale\(([\d.]+)\)/)?.[1] || 1})`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      hoverTargets().forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [handleMouseMove]);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          backgroundColor: '#FF8C00',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: '2px solid #FF8C00',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'background-color 0.3s',
        }}
      />
    </>
  );
}
