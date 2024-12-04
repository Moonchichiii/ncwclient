import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Heart, LineChart, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: <Code size={32} />,
    title: "Clean Code",
    description: "We believe in writing maintainable, scalable, and efficient code that stands the test of time.",
  },
  {
    icon: <Shield size={32} />,
    title: "Security First",
    description: "Security is not an afterthought. We implement best practices from the ground up.",
  },
  {
    icon: <Heart size={32} />,
    title: "User Focused",
    description: "Every line of code we write is aimed at creating exceptional user experiences.",
  },
  {
    icon: <LineChart size={32} />,
    title: "Performance",
    description: "We optimize every aspect to ensure blazing-fast performance across all devices.",
  },
];

const skills = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Architecture", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "DevOps & Cloud", level: 88 },
  { name: "Security", level: 92 },
];

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
      },
    },
  };

  useEffect(() => {
    const createAnimations = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const ctx = gsap.context(() => {
        gsap.from(".skill-bar", {
          scaleX: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top center",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".timeline-item", {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top center",
            toggleActions: "play none none reverse",
          },
        });
      }, containerRef.current);

      return ctx;
    };

    const ctx = createAnimations();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative h-[80vh] overflow-hidden flex items-end pb-20">
        <motion.div
          style={{ y }}
          className="absolute inset-0 backdrop-blur-sm"
        />
        <div className="relative z-10 text-center px-4 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mx-auto max-w-6xl"
          >
            <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
              <div className="block text-white overflow-hidden">
                <motion.div className="flex justify-center">
                  {"nordic".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <div className="block text-white opacity-90 overflow-hidden">
                <motion.div className="flex justify-center">
                  {"((story))".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl font-bold mb-16 text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-sm border border-white/10 p-8 rounded-lg hover:border-white/20 transition-all"
              >
                <div className="text-white mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="skills-section py-20 px-4 backdrop-blur-sm">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
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
        </motion.div>
      </section>

      <section className="timeline-section py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl font-bold mb-16 text-center text-white">Our Journey</h2>
          <div className="space-y-12">
            {[2020, 2021, 2022, 2023].map((year, index) => (
              <div key={index} className="timeline-item relative pl-8 border-l-2 border-white/20">
                <motion.div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                />
                <div className="mb-2">
                  <span className="text-white font-bold text-xl">{year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Milestone {index + 1}</h3>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
