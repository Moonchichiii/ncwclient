import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Clock, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import ThemeToggle from '../components/common/ThemeToggle';

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

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }});

    gsap.set('.letter', { y: 50, opacity: 0 });
    gsap.set('.tagline, .scroll-indicator', { y: 30, opacity: 0 });
    gsap.set('.tech-stack', { opacity: 0, y: 20 });
    gsap.set(sideLinksRef.current, { opacity: 0, x: -20 });
    gsap.set('.time-display', { opacity: 0, y: -20 });

    tl.to('.time-display', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0)
      .to('.letter', { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.05 
      }, 0.2)
      .to('.tagline', { 
        y: 0, 
        opacity: 1, 
        duration: 0.8 
      }, '-=0.5')
      .to('.tech-stack', {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.3')
      .to(scrollIndicatorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, '-=0.3')
      .to(sideLinksRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8
      }, '-=0.5');

    return () => tl.kill();
  }, []);

  const formatTime = (date?: Date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-surface-darker overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-tekhelet opacity-10" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="absolute top-8 w-full px-6 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <div className="w-8 h-[1px] bg-white/20" />
            <span>2024</span>
          </div>
          <ThemeToggle position="landing" />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { city: 'STOCKHOLM', timeZone: 'stockholm' },
            { city: 'NEW YORK', timeZone: 'newYork' },
            { city: 'LONDON', timeZone: 'london' },
            { city: 'TOKYO', timeZone: 'tokyo' },
          ].map((location) => (
            <div key={location.city} className="time-display flex items-center gap-2 text-xs">
              <Clock size={12} className="text-white/70" />
              <span className="text-white/70 font-medium">{location.city}</span>
              <span className="font-mono font-medium text-white">
                {formatTime(times[location.timeZone])}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div ref={textRef} className="text-center w-full max-w-6xl px-4 mx-auto mb-12">
        <h1 className="font-mono leading-none tracking-tighter mb-6">
          <div className="overflow-hidden">
            <div className="flex justify-center text-[clamp(2.5rem,10vw,8rem)]">
              {nordicText.map((letter, index) => (
                <span key={index} className="letter inline-block text-white">
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex justify-center text-[clamp(2rem,8vw,6rem)]">
              {codeText.map((letter, index) => (
                <span key={index} className="letter inline-block text-white/90">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </h1>

        <div className="overflow-hidden mb-12">
          <p className="tagline text-xl sm:text-2xl md:text-3xl text-white/80 font-light">
            Crafting digital solutions with Nordic precision
          </p>
        </div>

        <div className="tech-stack flex flex-wrap justify-center gap-6 mb-12 ">
          {['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
            <span key={tech} className="text-sm text-white/60 hover:text-white/80 transition-colors">
              {tech}
            </span>
          ))}
        </div>

              </div>

      <div
        ref={sideLinksRef}
        className="fixed bottom-12 left-6 flex flex-col gap-6 text-xs"
      >
        {[
          { href: "https://github.com/nordiccodeworks", label: "GITHUB", icon: Github },
          { href: "https://linkedin.com/company/nordiccodeworks", label: "LINKEDIN", icon: Linkedin }
        ].map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="text-white/60 hover:text-white transition-colors flex items-end group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="transform rotate-90 origin-bottom-left mb-8 tracking-wider">
              {label}
            </span>
            <Icon size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 w-full flex flex-col items-center gap-3"
      >
        <ArrowDown className="animate-bounce text-white/60 w-5" />
        <span className="text-xs uppercase tracking-widest text-white/60">
          Scroll Down
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
