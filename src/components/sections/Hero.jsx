import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../../constants/data';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const cities = ['Delhi', 'Goa', 'Mumbai', 'Ooty', 'Hampi', 'Kochi', 'Manali', 'Jaipur'];

function FloatingBox({ position, speed = 1, radius = 2 }) {
  const meshRef = useRef();
  const initialAngle = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed * 0.3 + initialAngle.current;
      meshRef.current.position.x = position[0] + Math.cos(t) * radius;
      meshRef.current.position.z = position[2] + Math.sin(t) * radius;
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.3;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <meshStandardMaterial
          color="#FFB300"
          transparent
          opacity={0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function LocationPin({ position }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={position}>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#FFB300" emissive="#FF8C00" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.04, 0.2, 8]} />
          <meshStandardMaterial color="#FFB300" emissive="#FF8C00" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function PulsingLight() {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });
  return <pointLight ref={lightRef} position={[0, 0, 0]} color="#FFB300" intensity={1} distance={10} />;
}

function CameraControl() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.rotation.y += (mouse.current.x - camera.rotation.y) * 0.03;
    camera.rotation.x += (-mouse.current.y - camera.rotation.x) * 0.03;
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#FFB300" />
      <directionalLight position={[3, 5, 2]} intensity={0.6} color="#00D4FF" />
      <PulsingLight />
      <CameraControl />

      {cities.map((city, i) => (
        <FloatingBox
          key={city}
          position={[
            Math.cos((i / cities.length) * Math.PI * 2) * 2,
            (Math.random() - 0.5) * 1.5,
            Math.sin((i / cities.length) * Math.PI * 2) * 2,
          ]}
          speed={0.5 + Math.random() * 0.5}
          radius={1.5 + Math.random()}
        />
      ))}

      {[0, 1, 2, 3, 4].map(i => (
        <LocationPin
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 1.2,
            0.5 + Math.random() * 1,
            Math.sin((i / 5) * Math.PI * 2) * 1.2,
          ]}
        />
      ))}
    </>
  );
}

export default function Hero({ className = '' }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const titleWordsRef = useRef([]);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const statValuesRef = useRef([]);
  const scrollIndicatorRef = useRef(null);

  const titleLines = [
    { text: 'Travel Smarter.', gradient: false },
    { text: 'Spend Less.', gradient: false },
    { text: 'Live More.', gradient: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, { y: 20, opacity: 0, delay: 0.1, duration: 0.6, ease: 'power3.out' });

      titleWordsRef.current.forEach((word, i) => {
        if (word) {
          gsap.from(word, { y: '100%', opacity: 0, delay: 0.3 + i * 0.08, duration: 0.7, ease: 'power4.out' });
        }
      });

      gsap.from(descRef.current, { y: 20, opacity: 0, delay: 0.7, duration: 0.6 });
      gsap.from(ctaRef.current, { y: 20, opacity: 0, delay: 0.9, duration: 0.6 });

      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card');
        gsap.from(statCards, { x: 30, opacity: 0, stagger: 0.1, delay: 1.1, duration: 0.6 });
      }

      stats.forEach((stat, i) => {
        if (statValuesRef.current[i]) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2,
            delay: 1.3,
            ease: 'power2.out',
            onUpdate: () => {
              if (statValuesRef.current[i]) {
                let display = '';
                if (stat.prefix) display += stat.prefix;
                if (stat.value >= 10000000) {
                  display += (Math.floor(obj.val / 10000000 * 10) / 10) + 'Cr';
                } else if (stat.value >= 1000) {
                  display += Math.floor(obj.val / 1000) + 'K';
                } else {
                  display += Math.floor(obj.val);
                }
                if (stat.suffix) display += stat.suffix;
                statValuesRef.current[i].textContent = display;
              }
            }
          });
        }
      });

      gsap.to(titleRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: 0.5, start: 'top top', end: 'bottom top' }
      });

      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
      id="explore"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#111118] to-[#0A0A0F]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[--gold]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-[--cyan]/3 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-16 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Left Content — 55% */}
        <div className="w-full lg:w-[55%]" ref={titleRef}>
          {/* Badge */}
          <div ref={badgeRef} className="mb-8">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[--gold]/20 bg-[--gold]/5 text-xs text-[--gold] font-medium tracking-wide">
              <span className="text-[--gold]">✦</span>
              AI-Powered Travel Planning — Now in Beta
            </span>
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-[40px] sm:text-[52px] md:text-[60px] lg:text-[72px] xl:text-[80px] leading-[1.1] mb-8 tracking-tight">
            {titleLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block overflow-hidden mb-1">
                {line.text.split(' ').map((word, wIdx) => {
                  const currentWordIndex = wordIndex++;
                  return (
                    <span
                      key={wIdx}
                      ref={el => titleWordsRef.current[currentWordIndex] = el}
                      className={`inline-block mr-[0.3em] ${line.gradient ? 'gradient-text' : 'text-white'}`}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p ref={descRef} className="text-base sm:text-lg text-white/50 max-w-xl mb-10 leading-[1.8]">
            Planigo&apos;s AI builds your perfect trip in seconds — hotels, transport, food &amp; activities,
            all within your budget. One tap. Zero stress.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-5 mb-14">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[--amber] via-[--gold] to-[--orange] text-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(255,179,0,0.4)] transition-all duration-300 hover:scale-105">
              🚀 Plan My Trip Free →
            </button>
            <button className="px-8 py-4 rounded-full border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-all duration-300 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-xs">▶</span>
              Watch How It Works
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-5">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card glass rounded-2xl px-8 py-5 min-w-[150px]">
                <div
                  ref={el => statValuesRef.current[i] = el}
                  className="text-3xl font-bold font-[family-name:var(--font-syne)] gradient-text"
                >
                  0
                </div>
                <div className="text-xs text-white/40 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — 45% Three.js */}
        <div className="w-full lg:w-[45%] h-[350px] sm:h-[450px] lg:h-[550px] hidden md:block">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[--gold] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Scene />
            </Canvas>
          </Suspense>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-[10px] uppercase tracking-[4px] text-white/30">Scroll</span>
        <div ref={scrollIndicatorRef} className="w-px h-10 bg-gradient-to-b from-[--gold]/60 to-transparent" />
      </div>
    </section>
  );
}
