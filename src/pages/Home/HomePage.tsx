import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.title-letter', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out'
      });

      gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="home-page relative min-h-screen bg-surface-darker z-0">
      {/* Simple background: no blend, just z-[-1] */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-[-1] pointer-events-none" />
      <div
        className="fixed inset-0 opacity-5 z-[-1] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8">
              {'nordic'.split('').map((letter, index) => (
                <span key={index} className="title-letter inline-block">{letter}</span>
              ))}
              <br />
              {'((code)=>works)'.split('').map((letter, index) => (
                <span key={index} className="title-letter inline-block">{letter}</span>
              ))}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300">
              Crafting digital solutions with Nordic precision
            </p>
          </div>
        </section>

        <section className="services-section py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Code />, title: 'Full-Stack Development' },
                { icon: <Database />, title: 'Backend Architecture' },
                { icon: <Globe />, title: 'Frontend Design' }
              ].map((service, index) => (
                <div key={index} className="service-card glass-card p-8">
                  <div className="text-white mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
