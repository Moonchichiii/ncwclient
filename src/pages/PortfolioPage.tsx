import { FC, useState } from 'react';
import { ExternalLink, Github, Loader, Filter, Code, Globe } from 'lucide-react';
import useProjects from '../hooks/useProjects';

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

  const filteredProjects = projects?.results.filter(project =>
    selectedCategory === 'all' || project.tags.includes(selectedCategory)
  );

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-surface-darker text-gray-900 dark:text-white transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent dark:from-tekhelet-dark/20 dark:to-transparent opacity-20" />
        <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10" />
      </div>

      <div className="relative z-10 px-4 py-20">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-mono leading-tight mb-6 bg-gradient-to-r from-tekhelet-base to-tekhelet-light bg-clip-text text-transparent">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Explore our latest projects and digital solutions
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm 
                  transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-tekhelet-base text-white dark:bg-white dark:text-surface-darker font-medium'
                    : 'border border-gray-200 dark:border-white/20 text-gray-600 dark:text-white hover:border-tekhelet-base dark:hover:border-white/40 hover:bg-tekhelet-base/5 dark:hover:bg-white/5'
                }`}
              >
                <category.icon size={16} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader className="w-8 h-8 animate-spin text-tekhelet-base dark:text-white/70" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400">Failed to load projects. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects?.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-white/60 dark:bg-black/20 backdrop-blur-sm 
                    border border-gray-200/50 dark:border-white/10 rounded-xl overflow-hidden 
                    transition-all duration-300
                    hover:border-tekhelet-base dark:hover:border-white/20 
                    hover:transform hover:scale-[1.02]"
                >
                  {/* Project Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title || 'Project thumbnail'}
                      className="w-full h-full object-cover transform transition-transform duration-500 
                        group-hover:scale-110"
                    />
                  </div>

                  {/* Project Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t 
                    from-gray-900/90 via-gray-900/50 to-transparent 
                    dark:from-black/90 dark:via-black/50 dark:to-transparent 
                    p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 
                    transition-transform duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-200 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Project Links */}
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300"
                    >
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-tekhelet-base dark:bg-white text-white dark:text-surface-darker 
                            rounded-full hover:bg-tekhelet-light dark:hover:bg-white/90 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <a
                        href={`https://github.com/nordiccodeworks/${project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-full 
                          hover:bg-white/20 transition-colors"
                      >
                        <Github size={18} className="text-white" />
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