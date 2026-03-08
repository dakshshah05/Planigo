import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const triggers = useRef([]);

  const titleReveal = (titleRef) => {
    if (!titleRef.current) return;
    const st = gsap.fromTo(titleRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );
    triggers.current.push(st);
  };

  const cardStagger = (containerRef, cardSelector = '.anim-card') => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(cardSelector);
    const st = gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
    triggers.current.push(st);
  };

  const scaleReveal = (ref) => {
    if (!ref.current) return;
    const st = gsap.from(ref.current, {
      scale: 0.88,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
      },
    });
    triggers.current.push(st);
  };

  const slideIn = (ref, direction = 'left') => {
    if (!ref.current) return;
    const x = direction === 'left' ? -60 : 60;
    const st = gsap.from(ref.current, {
      x,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
    triggers.current.push(st);
  };

  const countUp = (ref, target) => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const st = gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(obj.val).toLocaleString('en-IN');
        }
      },
    });
    triggers.current.push(st);
  };

  useEffect(() => {
    return () => {
      triggers.current.forEach(t => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
      });
      triggers.current = [];
    };
  }, []);

  return { titleReveal, cardStagger, scaleReveal, slideIn, countUp };
}

export default useScrollAnimation;
