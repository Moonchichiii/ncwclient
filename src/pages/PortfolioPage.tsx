import { FC, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Loader, Filter, Code, Globe } from 'lucide-react';
import useProjects from '../hooks/useProjects';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  label: string;
  icon: typeof Code;
}

const categories: Category[] = [
  { id: 'all', label: 'All Projects', icon: Filter },
  { id: 'frontend', label: 'Frontend', icon: Globe },
  { id: 'backend', label: 'Backend', icon: Code },
  { id: 'fullstack', label: 'Full Stack', icon: Code },
  { id: 'ui', label: 'UI/UX', icon: Globe }
];

const PortfolioPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { projects, loading, error } = useProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects?.results.filter(project =>
    selectedCategory === 'all' || project.tags.includes(selectedCategory)
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.portfolio-title', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.portfolio-description', {
        opacity: 0,
        y: 30,
        duration: 0.6,
      }, '-=0.4')
      .from('.category-button', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.4,
      }, '-=0.2');

      ScrollTrigger.batch('.project-card', {
        start: 'top bottom-=100px',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-surface-darker text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-tekhelet-dark/50 to-transparent opacity-30" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="portfolio-title text-5xl md:text-6xl lg:text-7xl font-mono leading-tight mb-6">
            Our Portfolio
          </h1>
          <p className="portfolio-description text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Explore our latest projects and digital solutions
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button flex items-center gap-2 px-6 py-3 rounded-full text-sm 
                  transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-white text-surface-darker font-medium'
                    : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                }`}
              >
                <category.icon size={16} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={projectsRef} className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader className="w-8 h-8 animate-spin text-white/70" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">Failed to load projects. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects?.map((project) => (
                <div
                  key={project.id}
                  className="project-card group relative bg-black/20 backdrop-blur-sm 
                    border border-white/10 rounded-xl overflow-hidden transition-all duration-300
                    hover:border-white/20 hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title || 'Project thumbnail'}
                      className="w-full h-full object-cover transform transition-transform duration-500 
                        group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                    p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 
                    transition-transform duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300"
                    >
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white text-surface-darker rounded-full 
                            hover:bg-white/90 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <a
                        href={`https://github.com/nordiccodeworks/${project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 
                          transition-colors"
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
      </div>
    </div>
  );
};

export default PortfolioPage;
