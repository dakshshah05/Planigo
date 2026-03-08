import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

function ParticleField({ color = '#FFB300', count = 4000, opacity = 1, rotationDir = 1 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001 * rotationDir;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

export default function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const rippleRef = useRef(null);
  const logoRef = useRef(null);
  const glowRef = useRef(null);
  const lettersRef = useRef([]);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);

  const letters = 'PLANIGO'.split('');
  const letterDirections = [
    { x: -100, y: 0 },   // P ← left
    { x: 0, y: -100 },   // L ↑ top
    { x: 100, y: 0 },    // A → right
    { x: 0, y: 100 },    // N ↓ bottom
    { x: 80, y: -80 },   // I ↗
    { x: -80, y: 80 },   // G ↙
    { x: 0, y: 0, scale: 3 }, // O zoom
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      }
    });

    // t=0.0 — amber dot scales in
    tl.fromTo(dotRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' },
      0
    );

    // t=0.4 — ripple expands
    tl.fromTo(rippleRef.current,
      { scale: 0, opacity: 1 },
      { scale: 4, opacity: 0, duration: 0.8, ease: 'power2.out' },
      0.4
    );

    // t=0.6 — logo drops in with spring
    tl.fromTo(logoRef.current,
      { y: -100, scale: 0.2, rotation: -20, opacity: 0 },
      { y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'elastic.out(1,0.5)' },
      0.6
    );

    // t=1.0 — glow behind logo
    tl.fromTo(glowRef.current,
      { opacity: 0, boxShadow: '0 0 0px rgba(255,179,0,0)' },
      { opacity: 0.6, boxShadow: '0 0 80px rgba(255,179,0,0.6)', duration: 0.4, ease: 'power2.out' },
      1.0
    );

    // t=1.2 — letters animate in
    letters.forEach((_, i) => {
      const dir = letterDirections[i];
      tl.fromTo(lettersRef.current[i],
        {
          x: dir.x,
          y: dir.y,
          scale: dir.scale || 1,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        1.2 + i * 0.08
      );
    });

    // t=2.2 — horizontal gradient line
    tl.fromTo(lineRef.current,
      { width: '0%' },
      { width: '100%', duration: 0.5, ease: 'power3.out' },
      2.2
    );

    // t=2.5 — tagline types in
    const tagText = 'AI · TRAVEL · REIMAGINED';
    tl.to(taglineRef.current, {
      duration: 0.8,
      ease: 'none',
      onUpdate: function() {
        const progress = this.progress();
        const chars = Math.floor(progress * tagText.length);
        if (taglineRef.current) {
          taglineRef.current.textContent = tagText.substring(0, chars);
        }
      },
    }, 2.5);

    // t=3.1 — scale up and fade out
    tl.to(containerRef.current, {
      scale: 1.15,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, 3.1);

    return () => tl.kill();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0F]"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Three.js particle background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ParticleField color="#FFB300" count={4000} opacity={0.8} rotationDir={1} />
            <ParticleField color="#00D4FF" count={2000} opacity={0.3} rotationDir={-1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center z-10">
        {/* Amber dot */}
        <div
          ref={dotRef}
          className="w-3 h-3 rounded-full bg-[--gold] absolute"
          style={{ boxShadow: '0 0 20px rgba(255,179,0,0.6)', top: '-20px' }}
        />

        {/* Ripple ring */}
        <div
          ref={rippleRef}
          className="w-16 h-16 rounded-full border-2 border-[--gold] absolute"
          style={{ top: '-38px' }}
        />

        {/* Logo glow */}
        <div
          ref={glowRef}
          className="absolute w-20 h-20 rounded-full"
          style={{ top: '-10px' }}
        />

        {/* Logo SVG */}
        <div ref={logoRef} className="mb-4">
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="introGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="50%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="28" stroke="url(#introGrad)" strokeWidth="3" fill="none"/>
            <path d="M24 18 L42 32 L24 46 Z" fill="url(#introGrad)"/>
          </svg>
        </div>

        {/* PLANIGO letters */}
        <div className="flex gap-1 mb-3">
          {letters.map((letter, i) => (
            <span
              key={i}
              ref={el => lettersRef.current[i] = el}
              className="text-5xl md:text-6xl font-extrabold font-[family-name:var(--font-syne)] text-white select-none"
              style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Gradient line */}
        <div className="relative h-[2px] max-w-xs mx-auto mb-4 overflow-hidden">
          <div
            ref={lineRef}
            className="h-full bg-gradient-to-r from-[--amber] via-[--gold] to-[--cyan]"
            style={{ width: '0%' }}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-[13px] uppercase tracking-[6px] text-white/40 font-medium h-5"
        />
      </div>
    </div>
  );
}
