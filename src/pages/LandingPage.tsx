import { FC, useRef, useEffect } from 'react';
import { ArrowDown, Clock, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import ThemeToggle from '../components/common/ThemeToggle';

// Brand colors as constants
const BRAND_COLORS = {
  teal: '#3BB4C5',
  yellow: '#F1B418',
  purple: '#8655CA',
  blue: '#2D7ACA'
};

const LandingPage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const sideLinksRef = useRef<HTMLDivElement>(null);
  const timeDisplaysRef = useRef<HTMLDivElement>(null);

  const nordicText = 'nordic'.split('');
  const codeText = '((code) => works)'.split('');

  // Initialize time display
  useEffect(() => {
    const updateTimeDisplays = () => {
      if (!timeDisplaysRef.current) return;
      const now = new Date();
      const timeElements = timeDisplaysRef.current.querySelectorAll('.time-value');
      
      timeElements.forEach((el) => {
        const timezone = el.getAttribute('data-timezone');
        if (!timezone) return;
        const time = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
          .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        el.textContent = time;
      });
    };

    updateTimeDisplays();
    const interval = setInterval(updateTimeDisplays, 1000);
    return () => clearInterval(interval);
  }, []);

  // Landing page animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const mainTL = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Initial states
      gsap.set(['.letter', '.tagline', '.tech-stack', '.scroll-indicator', '.side-link', '.time-display'],
        { opacity: 0, y: 20 });

      // Main animation sequence
      mainTL
        .to('.time-display', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        })
        .to('.letter', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
        }, '-=0.3')
        .to('.tagline', {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, '-=0.4')
        .to('.tech-stack', {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, '-=0.3')
        .to('.side-link', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
        }, '-=0.4')
        .to('.scroll-indicator', {
          opacity: 1,
          y: 0,
          duration: 0.4,
        }, '-=0.2');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden
                 bg-white dark:bg-surface-darker transition-colors duration-300"
    >
                 
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white 
                       dark:from-surface-darker dark:to-transparent opacity-50 dark:opacity-10" />
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Top Bar */}
      <div className="absolute top-8 w-full px-6 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
            <div className="w-8 h-[1px] bg-gray-300 dark:bg-white/20" />
            <span>2024</span>
          </div>
          <ThemeToggle variant="landing" />
        </div>

        {/* Time Displays */}
        <div ref={timeDisplaysRef} className="hidden lg:flex items-center gap-8">
          {[
            { city: 'STOCKHOLM', timezone: 'Europe/Stockholm' },
            { city: 'NEW YORK', timezone: 'America/New_York' },
            { city: 'LONDON', timezone: 'Europe/London' },
            { city: 'TOKYO', timezone: 'Asia/Tokyo' },
          ].map(({ city, timezone }) => (
            <div key={city} className="time-display flex items-center gap-2 text-xs">
              <Clock size={12} className="text-gray-500 dark:text-white/70" />
              <span className="text-gray-500 dark:text-white/70 font-medium">{city}</span>
              <span className="time-value font-mono font-medium text-gray-700 dark:text-white" data-timezone={timezone} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div ref={textRef} className="text-center w-full max-w-6xl px-4 mx-auto mb-12">
        <h1 className="font-mono leading-none tracking-tighter mb-6">
          <div className="overflow-hidden">
            <div className="flex justify-center text-[clamp(2.5rem,10vw,8rem)]">
              {nordicText.map((letter, index) => (
                <span key={index} className="letter inline-block" style={{ color: BRAND_COLORS.teal }}>
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex justify-center text-[clamp(2rem,8vw,6rem)]">
              {codeText.map((letter, index) => {
                let color = BRAND_COLORS.blue;
                if (letter === '(' || letter === ')') color = index < 2 ? BRAND_COLORS.yellow : BRAND_COLORS.purple;
                return (
                  <span key={index} className="letter inline-block" style={{ color }}>
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>
        </h1>

        <div className="overflow-hidden mb-12">
          <p className="tagline text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-white/80 font-light">
            Crafting digital solutions with Nordic precision
          </p>
        </div>

        <div className="tech-stack flex flex-wrap justify-center gap-6">
          {['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
            <span key={tech} className="text-sm text-gray-500 hover:text-tekhelet-base dark:text-white/60 
                                     dark:hover:text-white/80 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Side Links */}
      <div ref={sideLinksRef} className="fixed bottom-12 left-6 flex flex-col gap-6 text-xs">
        {[
          { href: "https://github.com/nordiccodeworks", label: "GITHUB", icon: Github, marginBottom: "mb-8" },
          { href: "https://linkedin.com/company/nordiccodeworks", label: "LINKEDIN", icon: Linkedin, marginBottom: "mb-6" }
        ].map(({ href, label, icon: Icon, marginBottom }) => (
          <a
            key={label}
            href={href}
            className="side-link text-gray-500 hover:text-tekhelet-base dark:text-white/60 
                     dark:hover:text-white transition-colors flex items-end group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={`transform rotate-90 origin-bottom-left ${marginBottom} tracking-wider`}>
              {label}
            </span>
            <Icon size={24} className="group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-8 w-full flex flex-col items-center gap-3"
      >
        <ArrowDown className="animate-bounce text-gray-400 dark:text-white/60 w-5" />
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/60">
          Scroll Down
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
