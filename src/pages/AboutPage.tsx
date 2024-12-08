import { FC, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Heart, LineChart, Shield, Cpu, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Value {
  icon: typeof Code;
  title: string;
  description: string;
  gradient: string;
}

const values: Value[] = [
  {
    icon: Code,
    title: "Clean Code",
    description: "We believe in writing maintainable, scalable, and efficient code.",
    gradient: 'from-accent-primary/20 to-accent-secondary/20'
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Security is not an afterthought. Built with best practices.",
    gradient: 'from-accent-secondary/20 to-tekhelet-light/20'
  },
  {
    icon: Heart,
    title: "User Focused",
    description: "Exceptional user experiences from every line of code.",
    gradient: 'from-tekhelet-light/20 to-accent-tertiary/20'
  },
  {
    icon: LineChart,
    title: "Performance",
    description: "Optimized for blazing-fast performance.",
    gradient: 'from-accent-tertiary/20 to-accent-primary/20'
  },
];

const skills = [
  { name: "Frontend Development", level: 95, color: "from-accent-primary to-accent-secondary" },
  { name: "Backend Architecture", level: 90, color: "from-accent-secondary to-tekhelet-light" },
  { name: "UI/UX Design", level: 85, color: "from-tekhelet-light to-accent-tertiary" },
  { name: "DevOps & Cloud", level: 88, color: "from-accent-tertiary to-accent-primary" },
  { name: "Security", level: 92, color: "from-accent-primary to-tekhelet-light" },
];

const timeline = [
  { year: 2020, title: "Foundation", description: "Nordic Code Works was established with a vision for elegant solutions." },
  { year: 2021, title: "Growth", description: "Expanded our team and established key partnerships." },
  { year: 2022, title: "Innovation", description: "Launched our flagship development framework." },
  { year: 2023, title: "Recognition", description: "Received industry recognition for technical excellence." },
];

const AboutPage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'top top',
          scrub: 1
        }
      });

      tl.fromTo(parallaxRef.current, 
        { y: "0%" },
        { y: "30%", ease: "none" }
      );

      // Values cards animation
      gsap.from('.value-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 80%',
        }
      });

      // Skills animation
      gsap.from('.skill-bar', {
        scaleX: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
        }
      });

      // Timeline animation
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%',
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-surface-darker text-white overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-0 bg-gradient-tekhelet opacity-20"
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Crafting digital excellence with Nordic precision and innovation
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`value-card relative overflow-hidden rounded-2xl backdrop-blur-sm 
                  border border-white/10 p-8 group hover:border-white/20 transition-all duration-300
                  bg-gradient-to-br ${value.gradient}`}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <value.icon className="w-8 h-8 mb-4 text-white/80 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300 group-hover:text-white/90 transition-colors">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Expertise</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-white/70">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`skill-bar h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="timeline-item relative pl-8 pb-12 last:pb-0 border-l-2 border-white/20"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" />
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;