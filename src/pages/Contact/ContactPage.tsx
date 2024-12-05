import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const contactSchema = z.object({
  user_name: z.string().min(1, 'Name is required').max(100),
  user_email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(500),
  project_type: z.string().min(1, 'Project type is required'),
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  goals: z.string().min(1, 'Goals are required').max(500),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        'YOUR_PUBLIC_KEY'
      );
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.letter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
      });

      gsap.from('.contact-form', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: 0.4,
      });

      gsap.from('.contact-sidebar', {
        opacity: 0,
        x: 20,
        duration: 0.6,
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const inputClasses = `
    w-full backdrop-blur-sm
    border border-white/10 rounded-xl px-6 py-4
    text-white placeholder:text-gray-400/70
    focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20
    transition-all duration-200
  `;

  return (
    <div ref={containerRef} className="min-h-screen text-white py-20 px-4 relative overflow-hidden">
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

      <div 
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)'
        }}
      />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
            <div className="block text-white overflow-hidden">
              <div className="flex justify-center">
                {"nordic".split("").map((letter, index) => (
                  <span key={index} className="letter inline-block">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
            <div className="block text-white opacity-90 overflow-hidden">
              <div className="flex justify-center">
                {"((connect))".split("").map((letter, index) => (
                  <span key={index} className="letter inline-block">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light">
            Ready to bring your vision to life?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form space-y-8 backdrop-blur-md p-8 rounded-2xl border border-white/10"
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
                  <p className="mt-2 text-sm text-red-400">
                    {errors.user_name.message}
                  </p>
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
                  <p className="mt-2 text-sm text-red-400">
                    {errors.user_email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Project Type</label>
              <select
                {...register('project_type')}
                className={`${inputClasses} appearance-none`}
              >
                <option value="">Select project type...</option>
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
              {errors.project_type && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.project_type.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Budget</label>
                <input
                  {...register('budget')}
                  className={`${inputClasses} ${errors.budget ? 'border-red-500' : ''}`}
                  placeholder="$5,000 - $10,000"
                />
                {errors.budget && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.budget.message}
                  </p>
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
                  <p className="mt-2 text-sm text-red-400">
                    {errors.timeline.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Message</label>
              <textarea
                {...register('message')}
                className={`${inputClasses} h-32 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative overflow-hidden rounded-xl bg-white px-8 py-4 text-black font-medium"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100" />
            </button>
          </form>

          <div className="contact-sidebar space-y-12">
            <div className="backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, text: 'contact@nordiccodeworks.com', href: 'mailto:contact@nordiccodeworks.com' },
                  { icon: Github, text: 'GitHub', href: 'https://github.com/nordiccodeworks' },
                  { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com/company/nordiccodeworks' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors p-4 rounded-lg hover:bg-white/5"
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <p className="text-gray-300">
                Monday - Friday<br />
                9:00 AM - 5:00 PM CET
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
