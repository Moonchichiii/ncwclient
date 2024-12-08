import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Clock, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';

const LandingPage: FC = () => {
  const [times, setTimes] = useState<Record<string, Date>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const sideLinksRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const nordicText = 'nordic'.split('');
  const codeText = '((code) => works)'.split('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        stockholm: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' })),
        newYork: new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })),
        london: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' })),
        tokyo: new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date?: Date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  useEffect(() => {
    // Prefetch routes for smoother transitions
    const routes = ['/home', '/about', '/portfolio', '/contact'];
    routes.forEach((route) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  // GSAP animations for the landing page
  useEffect(() => {
    gsap.set('.letter', { y: 50, opacity: 0 });
    gsap.set('.tagline, .scroll-indicator', { y: 30, opacity: 0 });
    gsap.set(sideLinksRef.current, { opacity: 0, x: -20 });

    const tl = gsap.timeline();

    tl.to('.letter', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
    })
      .to(
        '.tagline',
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .to(
        scrollIndicatorRef.current,
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      .to(
        sideLinksRef.current,
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.5 },
        '-=0.8'
      );

    return () => tl.kill();
  }, []);

  return (
    <div id="landing-page" ref={containerRef} className="bg-black text-white overflow-hidden min-h-screen relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20 z-0" />
      
      {/* Time Display */}
      <div className="absolute top-8 left-6 flex items-center gap-2 text-xs">
        <div className="w-8 h-[1px] bg-white opacity-20" />
        <span>2024</span>
      </div>

      <div className="absolute top-8 right-6 flex flex-col sm:flex-row items-end sm:items-center gap-3 text-xs">
        {[
          { city: 'STOCKHOLM', timeZone: 'stockholm' },
          { city: 'NEW YORK', timeZone: 'newYork' },
          { city: 'LONDON', timeZone: 'london' },
          { city: 'TOKYO', timeZone: 'tokyo' },
        ].map((location) => (
          <div key={location.city} className="flex items-center gap-2">
            <Clock size={12} className="text-white opacity-70" />
            <span className="text-white opacity-70 font-medium">{location.city}</span>
            <span className="text-white font-mono font-medium">{formatTime(times[location.timeZone])}</span>
            <div className="w-8 h-[1px] bg-white opacity-30" />
          </div>
        ))}
      </div>

      <div ref={textRef} className="text-center w-full max-w-[90vw] mx-auto mb-8">
        <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-mono leading-none tracking-tighter mb-4">
          <div className="block text-white overflow-hidden">
            <div className="flex justify-center">
              {nordicText.map((letter, index) => (
                <span key={index} className="letter inline-block">{letter}</span>
              ))}
            </div>
          </div>
          <div className="block text-white opacity-90 overflow-hidden">
            <div className="flex justify-center">
              {codeText.map((letter, index) => (
                <span key={index} className="letter inline-block">{letter}</span>
              ))}
            </div>
          </div>
        </h1>

        <div className="overflow-hidden">
          <p className="tagline text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Crafting digital solutions with Nordic precision
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/home')}
        className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 mt-8"
      >
        Explore Our Work
      </button>

      {/* Side Links */}
      <div
        ref={sideLinksRef}
        className="absolute bottom-12 left-4 flex flex-col gap-6 text-xs"
      >
        <a
          href="https://github.com/Moonchichiii"
          className="text-gray-300 hover:text-white transition-colors flex flex-row items-end"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="transform rotate-90 origin-bottom-left mb-1">GITHUB</span>
          <Github size={18} className="ml-1" />
        </a>
        <a
          href="https://linkedin.com/in/mats-gustafsson-a57643103"
          className="text-gray-300 hover:text-white transition-colors flex flex-row items-end"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="transform rotate-90 origin-bottom-left mb-1">LINKEDIN</span>
          <Linkedin size={18} className="ml-1" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-6 w-full left-0 right-0 flex flex-col items-center gap-2"
      >
        <ArrowDown className="animate-bounce text-white w-5 mx-auto" />
        <span className="text-xs uppercase tracking-widest text-gray-300 font-medium text-center w-full">
          Scroll Down
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
