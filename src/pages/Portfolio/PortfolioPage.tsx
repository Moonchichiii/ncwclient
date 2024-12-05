import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Loader } from 'lucide-react';
import useProjects from '../../hooks/useProjects';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'UI/UX'];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { projects, loading, error } = useProjects();
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects?.results.filter(project =>
    selectedCategory === 'All' || project.tags.includes(selectedCategory)
  );

  const nordicText = 'nordic'.split('');
  const worksText = '((works))'.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Letter animations
      gsap.from('.letter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project items
      gsap.from('.project-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div ref={containerRef} className="min-h-screen text-white">
      {/* Background Texture - Matching Landing Page */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Center Line - Matching Landing Page */}
      <div 
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)'
        }}
      />

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
            {/* "nordic" */}
            <div className="block text-white overflow-hidden">
              <div className="flex justify-center">
                {nordicText.map((letter, index) => (
                  <span key={index} className="letter inline-block">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
            {/* "((works))" */}
            <div className="block text-white opacity-90 overflow-hidden">
              <div className="flex justify-center">
                {worksText.map((letter, index) => (
                  <span key={index} className="letter inline-block">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light mb-12">
            Explore our portfolio of digital solutions
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm border ${
                  selectedCategory === category
                    ? 'border-white bg-white text-black'
                    : 'border-white/20 text-white hover:border-white/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
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
                    className="project-item group relative backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
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
                            className="p-2 bg-white text-black rounded-full hover:bg-white/90"
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