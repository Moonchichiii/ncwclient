import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Database, Globe } from 'lucide-react';
import Button from '../../components/shared/Button/Buttons';
import CookieConsent from '../../components/common/CookieConsent';

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
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

      <motion.section
        className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-10 text-center space-y-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="space-y-8"
          >
            <motion.h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
              <div className="block text-white overflow-hidden">
                <motion.div className="flex justify-center">
                  {'nordic'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <div className="block text-white opacity-90 overflow-hidden">
                <motion.div className="flex justify-center">
                  {'((code) => works)'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Crafting digital solutions with Nordic precision
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 px-4 backdrop-blur-sm">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-lg border border-white/10 hover:border-white/20 backdrop-blur-sm"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-white mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4 backdrop-blur-sm">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-video border border-white/10"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
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
