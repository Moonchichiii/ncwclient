import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe } from 'lucide-react';
import Button from '../../components/shared/Button/Buttons';
import CookieConsent from '../../components/common/CookieConsent';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      icon: <Code size={24} />,
      title: 'Full-Stack Development',
      description: 'Modern web applications built with cutting-edge technologies',
    },
    {
      icon: <Database size={24} />,
      title: 'Backend Architecture',
      description: 'Scalable and secure server-side solutions',
    },
    {
      icon: <Globe size={24} />,
      title: 'Frontend Design',
      description: 'Responsive and intuitive user interfaces',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.letter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
      });

      gsap.from('.service-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%',
        },
      });

      gsap.from('.project-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="text-white min-h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <section className="home-intro h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="relative z-10 text-center space-y-12">
          <div className="space-y-8">
            <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
              <div className="block text-white overflow-hidden">
                <div className="flex justify-center">
                  {'nordic'.split('').map((letter, index) => (
                    <span key={index} className="letter inline-block">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
              <div className="block text-white opacity-90 overflow-hidden">
                <div className="flex justify-center">
                  {'((code) => works)'.split('').map((letter, index) => (
                    <span key={index} className="letter inline-block">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light">
              Crafting digital solutions with Nordic precision
            </p>
          </div>
        </div>
      </section>

      <section className="services-section py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-item p-8 rounded-lg border border-white/10 hover:border-white/20"
              >
                <div className="text-white mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section py-20 px-4 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="project-item relative overflow-hidden rounded-lg aspect-video border border-white/10"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={`/api/placeholder/${800}/${450}`}
                    alt={`Project ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button active={false}>View Project</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)',
        }}
      />

      <CookieConsent />
    </div>
  );
};

export default HomePage;
