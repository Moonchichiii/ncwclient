import { FC, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, ArrowRight, Building2, Code } from 'lucide-react';
import { toast } from 'react-toastify';

const contactSchema = z.object({
  user_name: z.string().min(1, 'Name is required').max(100),
  user_email: z.string().email('Invalid email address'),
  project_type: z.string().min(1, 'Project type is required'),
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  message: z.string().min(1, 'Message is required').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'custom', label: 'Custom Solution' },
  { value: 'consulting', label: 'Technical Consulting' },
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact@nordiccodeworks.com',
    href: 'mailto:contact@nordiccodeworks.com'
  },
  {
    icon: Building2,
    label: 'Office Hours',
    value: 'Mon - Fri, 9:00 - 17:00 CET'
  },
  {
    icon: Code,
    label: 'Tech Stack',
    value: 'React, Node.js, Python, TypeScript'
  }
];

const ContactPage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out'
      });

      gsap.from('.contact-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out'
      });

      gsap.from('.contact-form', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.contact-sidebar > *', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  const inputClasses = `
    w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4
    text-white placeholder:text-gray-400/70
    focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20
    transition-all duration-200 hover:border-white/20
  `;

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-surface-darker text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-tekhelet-dark/20 to-transparent opacity-50" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="contact-title text-5xl md:text-6xl lg:text-7xl font-mono mb-6">
            {'Let\'s Create'.split('').map((letter, index) => (
              <span key={index} className="inline-block">{letter}</span>
            ))}
          </h1>
          <p className="contact-description text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form space-y-6 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                <input
                  {...register('user_name')}
                  className={`${inputClasses} ${errors.user_name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.user_name && (
                  <p className="mt-2 text-sm text-red-400">{errors.user_name.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input
                  {...register('user_email')}
                  className={`${inputClasses} ${errors.user_email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.user_email && (
                  <p className="mt-2 text-sm text-red-400">{errors.user_email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Project Type</label>
              <select
                {...register('project_type')}
                className={`${inputClasses} appearance-none ${errors.project_type ? 'border-red-500' : ''}`}
              >
                <option value="">Select project type...</option>
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.project_type && (
                <p className="mt-2 text-sm text-red-400">{errors.project_type.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Budget Range</label>
                <input
                  {...register('budget')}
                  className={`${inputClasses} ${errors.budget ? 'border-red-500' : ''}`}
                  placeholder="$5,000 - $10,000"
                />
                {errors.budget && (
                  <p className="mt-2 text-sm text-red-400">{errors.budget.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Timeline</label>
                <input
                  {...register('timeline')}
                  className={`${inputClasses} ${errors.timeline ? 'border-red-500' : ''}`}
                  placeholder="2-3 months"
                />
                {errors.timeline && (
                  <p className="mt-2 text-sm text-red-400">{errors.timeline.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Project Details</label>
              <textarea
                {...register('message')}
                className={`${inputClasses} h-32 resize-none ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative overflow-hidden rounded-xl bg-white px-8 py-4 
                text-surface-darker font-medium transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          <div className="contact-sidebar space-y-8">
            <div className="backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/5">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/80">{item.label}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white hover:text-accent-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
