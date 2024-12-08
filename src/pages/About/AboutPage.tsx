import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Heart, LineChart, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Value {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
}

const values: Value[] = [
  {
    icon: <Code size={32} />,
    title: "Clean Code",
    description: "We believe in writing maintainable, scalable, and efficient code.",
  },
  {
    icon: <Shield size={32} />,
    title: "Security First",
    description: "Security is not an afterthought.",
  },
  {
    icon: <Heart size={32} />,
    title: "User Focused",
    description: "Exceptional user experiences from every line of code.",
  },
  {
    icon: <LineChart size={32} />,
    title: "Performance",
    description: "Optimized for blazing-fast performance.",
  },
];

const skills: Skill[] = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Architecture", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "DevOps & Cloud", level: 88 },
  { name: "Security", level: 92 },
];

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const nordicText = 'nordic'.split('');
  const storyText = '((story))'.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        y: '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.from('.letter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
      });

      gsap.from('.skill-bar', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.timeline-item', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-page min-h-screen text-white relative z-0">
      {/* Simple black background at z-[-1] */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-black" />

      <section className="relative h-[80vh] overflow-hidden flex items-end pb-20 z-10">
        <div ref={parallaxRef} className="absolute inset-0 z-[-1]" />
        <div className="relative z-10 text-center px-4 w-full">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
              <div className="block text-white overflow-hidden">
                <div className="flex justify-center">
                  {nordicText.map((letter, index) => (
                    <span key={index} className="letter inline-block">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
              <div className="block text-white opacity-90 overflow-hidden">
                <div className="flex justify-center">
                  {storyText.map((letter, index) => (
                    <span key={index} className="letter inline-block">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="border border-white/10 p-8 rounded-lg hover:border-white/20 transition-all"
              >
                <div className="text-white mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section py-20 px-4 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-white">Our Expertise</h2>
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-white/70">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-white rounded-full origin-left"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section py-20 px-4 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-white">Our Journey</h2>
          <div className="space-y-12">
            {[2020, 2021, 2022, 2023].map((year, index) => (
              <div key={index} className="timeline-item relative pl-8 border-l-2 border-white/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white" />
                <div className="mb-2">
                  <span className="text-white font-bold text-xl">{year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Milestone {index + 1}</h3>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="end-marker"></div>
    </div>
  );
};

export default AboutPage;
