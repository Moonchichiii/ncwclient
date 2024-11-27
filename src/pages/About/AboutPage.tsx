import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Heart, LineChart, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const values = [
    {
      icon: <Code size={32} />,
      title: "Clean Code",
      description: "We believe in writing maintainable, scalable, and efficient code that stands the test of time."
    },
    {
      icon: <Shield size={32} />,
      title: "Security First",
      description: "Security is not an afterthought. We implement best practices from the ground up."
    },
    {
      icon: <Heart size={32} />,
      title: "User Focused",
      description: "Every line of code we write is aimed at creating exceptional user experiences."
    },
    {
      icon: <LineChart size={32} />,
      title: "Performance",
      description: "We optimize every aspect to ensure blazing-fast performance across all devices."
    }
  ];

  const skills = [
    { name: "Frontend Development", level: 95 },
    { name: "Backend Architecture", level: 90 },
    { name: "UI/UX Design", level: 85 },
    { name: "DevOps & Cloud", level: 88 },
    { name: "Security", level: 92 },
  ];

  const milestones = [
    {
      year: "Late 2023",
      title: "The Spark",
      description: "Nordic Code Works began as an idea, combining a passion for Scandinavian design principles with modern web development. The initial concept was sketched out, focusing on bringing minimalist, functional, and user-centered development to clients."
    },
    {
      year: "Early 2024",
      title: "Foundation & Planning",
      description: "The groundwork was laid - establishing our core values, development methodology, and technical standards. We crafted our identity around the principles of clean code, security-first development, and exceptional user experiences."
    },
    {
      year: "Spring 2024",
      title: "Development Phase",
      description: "Intensive period of building our infrastructure, setting up our development environment, and creating our first portfolio projects. Focus on implementing cutting-edge technologies while maintaining our commitment to Nordic design principles."
    },
    {
      year: "Present",
      title: "Launch",
      description: "Nordic Code Works officially launches, ready to deliver high-quality web solutions. With our foundation in place, we're excited to begin our journey of creating impactful digital experiences for our clients."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars
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

      // Animate timeline
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#343A40] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[#223651] opacity-50"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About <span className="text-[#CBB26A]">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Crafting digital excellence with Nordic precision and innovation
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#223651] p-8 rounded-lg hover:bg-[#2a4162] transition-colors"
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
      <section className="skills-section py-20 px-4 bg-[#2a3238]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Expertise</h2>
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-[#CBB26A]">{skill.level}%</span>
                </div>
                <div className="h-2 bg-[#223651] rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-[#CBB26A] rounded-full origin-left"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Journey</h2>
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item relative pl-8 border-l-2 border-[#CBB26A]">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#CBB26A]" />
                <div className="mb-2">
                  <span className="text-[#CBB26A] font-bold text-xl">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-300">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;