import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Database, Globe } from 'lucide-react';

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: <Code size={24} />,
      title: "Full-Stack Development",
      description: "Modern web applications built with cutting-edge technologies"
    },
    {
      icon: <Database size={24} />,
      title: "Backend Architecture",
      description: "Scalable and secure server-side solutions"
    },
    {
      icon: <Globe size={24} />,
      title: "Frontend Design",
      description: "Responsive and intuitive user interfaces"
    }
  ];

  return (
    <div className="min-h-screen bg-[#343A40] text-white">
      {/* Hero Section */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center px-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl md:text-7xl font-bold mb-6 text-center font-space-grotesk"
          {...fadeIn}
        >
          Nordic Code
          <span className="text-[#CBB26A]"> Works</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-gray-300"
          {...fadeIn}
        >
          Crafting elegant digital solutions with Scandinavian simplicity
        </motion.p>
        <motion.button 
          className="bg-[#137DC5] hover:bg-[#223651] text-white px-8 py-3 rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Our Work
        </motion.button>
        <motion.div 
          className="absolute bottom-8 animate-bounce cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            Our <span className="text-[#CBB26A]">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-[#223651] hover:bg-[#2a4162] transition-colors"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-[#CBB26A] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Teaser */}
      <section className="py-20 px-4 bg-[#2a3238]">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-video bg-[#223651]"
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
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xl font-bold">View Project</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;