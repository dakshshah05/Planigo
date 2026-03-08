import { useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import CustomCursor from './components/ui/CustomCursor';
import IntroAnimation from './components/sections/IntroAnimation';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import MarqueeStrip from './components/ui/MarqueeStrip';
import HowItWorks from './components/sections/HowItWorks';
import Features from './components/sections/Features';
import Destinations from './components/sections/Destinations';
import Deals from './components/sections/Deals';
import Dashboard from './components/sections/Dashboard';
import Testimonials from './components/sections/Testimonials';
import AppDownload from './components/sections/AppDownload';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <CustomCursor />
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <MarqueeStrip />
          <HowItWorks />
          <Features />
          <Destinations />
          <Deals />
          <Dashboard />
          <Testimonials />
          <AppDownload />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
