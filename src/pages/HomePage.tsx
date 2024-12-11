import { FC } from 'react';
import { Code, Database, Globe, Cpu, Shield, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'End-to-end solutions with modern tech stacks'
  },
  {
    icon: Database,
    title: 'Backend Architecture',
    description: 'Scalable and secure server infrastructure'
  },
  {
    icon: Globe,
    title: 'Frontend Design',
    description: 'Responsive and intuitive user interfaces'
  },
  {
    icon: Cpu,
    title: 'DevOps & CI/CD',
    description: 'Automated deployment and scaling solutions'
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in security and best practices'
  },
  {
    icon: Sparkles,
    title: 'Performance Optimization',
    description: 'Fast and efficient applications'
  }
];

const HomePage: FC = () => {
  return (
    <div className="section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-mono leading-none mb-8">
            <div className="flex justify-center flex-wrap gap-x-2">
              {'nordic'.split('').map((letter, index) => (
                <span key={index} className="inline-block">{letter}</span>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-x-1">
              {'((code)=>works)'.split('').map((letter, index) => (
                <span key={index} className="inline-block">{letter}</span>
              ))}
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Crafting digital solutions with Nordic precision and elegant simplicity
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl backdrop-blur-lg p-8 
                  transition-all duration-300 group
                  dark:bg-gray-900/40 dark:hover:bg-gray-800/60
                  bg-white/10 hover:bg-white/20
                  border border-white/10 hover:border-white/20"
              >
                <div className="relative z-10">
                  <service.icon 
                    className="w-8 h-8 mb-4
                      text-tekhelet-light dark:text-gray-300 
                      group-hover:text-tekhelet-base dark:group-hover:text-white 
                      transition-colors" 
                  />
                  <h3 className="text-xl font-bold mb-3 
                    text-tekhelet-dark dark:text-white 
                    group-hover:text-tekhelet-base dark:group-hover:text-white
                    transition-colors"
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 
                    group-hover:text-gray-800 dark:group-hover:text-white/90 
                    transition-colors"
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;