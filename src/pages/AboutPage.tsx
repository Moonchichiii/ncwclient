import { FC } from 'react';
import { Code, Heart, LineChart, Shield } from 'lucide-react';

const values = [
  {
    icon: Code,
    title: "Clean Code",
    description: "We believe in writing maintainable, scalable, and efficient code.",
    gradient: 'from-tekhelet-base/20 to-tekhelet-light/20'
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Security is not an afterthought. Built with best practices.",
    gradient: 'from-tekhelet-light/20 to-accent-secondary/20'
  },
  {
    icon: Heart,
    title: "User Focused",
    description: "Exceptional user experiences from every line of code.",
    gradient: 'from-accent-secondary/20 to-accent-tertiary/20'
  },
  {
    icon: LineChart,
    title: "Performance",
    description: "Optimized for blazing-fast performance.",
    gradient: 'from-accent-tertiary/20 to-tekhelet-base/20'
  },
];

const skills = [
  { name: "Frontend Development", level: 95, color: "from-tekhelet-base to-tekhelet-light" },
  { name: "Backend Architecture", level: 90, color: "from-tekhelet-light to-accent-primary" },
  { name: "UI/UX Design", level: 85, color: "from-accent-primary to-accent-secondary" },
  { name: "DevOps & Cloud", level: 88, color: "from-accent-secondary to-tekhelet-base" },
  { name: "Security", level: 92, color: "from-tekhelet-base to-tekhelet-light" },
];

const timeline = [
  { year: 2020, title: "Foundation", description: "Nordic Code Works was established with a vision for elegant solutions." },
  { year: 2021, title: "Growth", description: "Expanded our team and established key partnerships." },
  { year: 2022, title: "Innovation", description: "Launched our flagship development framework." },
  { year: 2023, title: "Recognition", description: "Received industry recognition for technical excellence." },
];

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-darker text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent dark:from-tekhelet-dark/20 dark:to-transparent opacity-20" />
          <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 bg-gradient-to-r from-tekhelet-base to-tekhelet-light bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Crafting digital excellence with Nordic precision and innovation
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-tekhelet-base to-tekhelet-light bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl backdrop-blur-lg
                  border border-gray-200/50 dark:border-white/10
                  p-8 group hover:border-tekhelet-base dark:hover:border-white/20
                  bg-white/60 dark:bg-gray-900/40
                  transition-all duration-300"
              >
                <div className="relative z-10">
                  <value.icon className="w-8 h-8 mb-4 text-tekhelet-base dark:text-white/80
                    group-hover:text-tekhelet-light dark:group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white/90
                    transition-colors">
                    {value.description}
                  </p>
                </div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${value.gradient} transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative bg-gray-50 dark:bg-surface-darker/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-tekhelet-base to-tekhelet-light bg-clip-text text-transparent">
            Our Expertise
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-gray-500 dark:text-white/70">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000
                      transform origin-left scale-x-0 animate-skill-fill`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-tekhelet-base to-tekhelet-light bg-clip-text text-transparent">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-gray-200 dark:border-white/20"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full 
                  bg-gradient-to-r from-tekhelet-base to-tekhelet-light 
                  shadow-lg shadow-tekhelet-base/30" />
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium
                    bg-tekhelet-base/10 dark:bg-white/10 
                    text-tekhelet-base dark:text-white">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
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

export default AboutPage;