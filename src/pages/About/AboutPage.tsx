import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Heart, LineChart, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageTransitions } from '../../hooks/usePageTransitions';

// Types
interface Value {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

// Constants
const VALUES: Value[] = [
  {
    icon: <Code aria-hidden="true" size={32} />,
    title: "Clean Code",
    description: "We believe in writing maintainable, scalable, and efficient code that stands the test of time."
  },
  {
    icon: <Shield aria-hidden="true" size={32} />,
    title: "Security First",
    description: "Security is not an afterthought. We implement best practices from the ground up."
  },
  {
    icon: <Heart aria-hidden="true" size={32} />,
    title: "User Focused",
    description: "Every line of code we write is aimed at creating exceptional user experiences."
  },
  {
    icon: <LineChart aria-hidden="true" size={32} />,
    title: "Performance",
    description: "We optimize every aspect to ensure blazing-fast performance across all devices."
  }
];

const SKILLS: Skill[] = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Architecture", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "DevOps & Cloud", level: 88 },
  { name: "Security", level: 92 },
];

const MILESTONES: Milestone[] = [
  {
    year: "Late 2023",
    title: "The Spark",
    description: "Nordic Code Works began as an idea, combining a passion for Scandinavian design principles with modern web development..."
  },
  // ... other milestones
];

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  usePageTransitions(pageRef);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Skill bars animation
      gsap.from(".skill-bar", {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top center",
        },
      });

      // Timeline items animation
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top center",
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#343A40] text-white">
      <div ref={contentRef}>
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden flex items-center justify-center" aria-label="Hero">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 bg-[#223651] opacity-50"
            aria-hidden="true"
          />
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
            >
              About <span className="text-[#CBB26A]">Us</span>
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            >
              Crafting digital excellence with Nordic precision and innovation
            </motion.p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 px-4" aria-labelledby="values-title">
          <div className="max-w-6xl mx-auto">
            <h2 id="values-title" className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {VALUES.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#223651] p-6 sm:p-8 rounded-lg hover:bg-[#2a4162] transition-colors duration-300"
                >
                  <div className="text-[#CBB26A] mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section py-16 sm:py-20 px-4 bg-[#2a3238]" aria-labelledby="skills-title">
          <div className="max-w-4xl mx-auto">
            <h2 id="skills-title" className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center">Our Expertise</h2>
            <div className="space-y-6 sm:space-y-8">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[#CBB26A]" aria-label={`${skill.level}% proficiency`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#223651] rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-[#CBB26A] rounded-full origin-left"
                      style={{ width: `${skill.level}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="timeline-section py-16 sm:py-20 px-4" aria-labelledby="journey-title">
          <div className="max-w-4xl mx-auto">
            <h2 id="journey-title" className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center">Our Journey</h2>
            <div className="space-y-8 sm:space-y-12">
              {MILESTONES.map((milestone) => (
                <div key={milestone.year} className="timeline-item relative pl-8 border-l-2 border-[#CBB26A]">
                  <div 
                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#CBB26A]"
                    aria-hidden="true"
                  />
                  <time className="text-[#CBB26A] font-bold text-xl block mb-2">
                    {milestone.year}
                  </time>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;