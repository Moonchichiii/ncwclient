import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap-init';
import usePageAnimations from '../../hooks/usePageAnimation';
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

  // Initial letter animations
  usePageAnimations(containerRef, () => {
    gsap.from('.letter', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
    });
  });

  // Batch project items animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.project-item', {
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          }),
        start: 'top 85%',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div ref={containerRef} className="portfolio-page min-h-screen text-white relative z-0">
      {/* Simple backgrounds at z-[-1] */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[url('/noise.png')] opacity-5" />
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto text-center">
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
                {worksText.map((letter, index) => (
                  <span key={index} className="letter inline-block">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light mb-12">
            Explore our portfolio of digital solutions
          </p>

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
      </div>

      <div className="px-4 pb-20 z-10 relative max-w-6xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            Failed to load projects. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project) => (
              <div
                key={project.id}
                className="project-item group relative backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title || 'Project image'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white text-black rounded-full hover:bg-white/90"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <a
                      href={`https://github.com/nordiccodeworks/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="end-marker"></div>
    </div>
  );
};

export default PortfolioPage;
