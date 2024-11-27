import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Loader } from 'lucide-react';
import useProjects from '../../hooks/useProjects';
import { usePageTransitions } from '../../hooks/usePageTransitions';

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'UI/UX'];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { projects, loading, error } = useProjects();
  const pageRef = useRef<HTMLDivElement>(null);
  
  usePageTransitions(pageRef);

  const filteredProjects = projects?.results.filter(project =>
    selectedCategory === 'All' || project.tags.includes(selectedCategory)
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-[#343A40] text-white">
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-[#CBB26A]">Work</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Explore our portfolio of successful projects and digital solutions
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#CBB26A] text-black'
                    : 'bg-[#223651] text-white hover:bg-[#2a4162]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400">
              Failed to load projects. Please try again later.
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects?.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="group relative bg-[#223651] rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4">
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#CBB26A] rounded-full text-black"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        )}
                        <motion.a
                          href={`https://github.com/nordiccodeworks/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={18} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;