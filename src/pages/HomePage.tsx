import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe, Cpu, Shield, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  icon: typeof Code;
  title: string;
  description: string;
  gradient: string;
}

const services: ServiceCard[] = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'End-to-end solutions with modern tech stacks',
    gradient: 'from-accent-primary/20 to-accent-secondary/20'
  },
  {
    icon: Database,
    title: 'Backend Architecture',
    description: 'Scalable and secure server infrastructure',
    gradient: 'from-accent-secondary/20 to-tekhelet-light/20'
  },
  {
    icon: Globe,
    title: 'Frontend Design',
    description: 'Responsive and intuitive user interfaces',
    gradient: 'from-tekhelet-light/20 to-accent-tertiary/20'
  },
  {
    icon: Cpu,
    title: 'DevOps & CI/CD',
    description: 'Automated deployment and scaling solutions',
    gradient: 'from-accent-tertiary/20 to-accent-primary/20'
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in security and best practices',
    gradient: 'from-accent-primary/20 to-tekhelet-light/20'
  },
  {
    icon: Sparkles,
    title: 'Performance Optimization',
    description: 'Fast and efficient applications',
    gradient: 'from-tekhelet-light/20 to-accent-secondary/20'
  }
];

const HomePage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline();
      heroTl.from('.title-letter', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out'
      })
      .from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');

      // Services section animations
      ScrollTrigger.batch('.service-card', {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          });
        },
        once: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="home" className="relative min-h-screen w-full bg-surface-darker text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-mono leading-none mb-8">
            {'nordic'.split('').map((letter, index) => (
              <span key={index} className="title-letter inline-block">
                {letter}
              </span>
            ))}
            <br />
            {'((code)=>works)'.split('').map((letter, index) => (
              <span key={index} className="title-letter inline-block">
                {letter}
              </span>
            ))}
          </h1>
          <p className="hero-description text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Crafting digital solutions with Nordic precision and elegant simplicity
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card relative overflow-hidden rounded-2xl backdrop-blur-sm 
                  border border-white/10 p-8 group hover:border-white/20 transition-all duration-300
                  bg-gradient-to-br ${service.gradient}`}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <service.icon className="w-8 h-8 mb-4 text-white/80 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white/90 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;