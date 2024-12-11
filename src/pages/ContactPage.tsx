import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, ArrowRight, Building2, Code } from 'lucide-react';
import { toast } from 'react-toastify';

// Schema and types remain the same
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
      );
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  // Updated input classes for theme support  
  const inputClasses = `
w-full rounded-xl px-6 py-4
bg-white/60 dark:bg-white/5 
border border-gray-200/50 dark:border-white/10 
text-gray-900 dark:text-white 
placeholder:text-gray-500 dark:placeholder:text-gray-400/70
focus:outline-none 
focus:border-tekhelet-base focus:ring-1 focus:ring-tekhelet-base
dark:focus:border-white/30 dark:focus:ring-white/20
transition-all duration-200 
hover:border-tekhelet-base/50 dark:hover:border-white/20
[&>option]:bg-white dark:[&>option]:bg-surface-darker
[&>option]:text-gray-900 dark:[&>option]:text-white
`;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-surface-darker text-gray-900 dark:text-white transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent dark:from-tekhelet-dark/20 dark:to-transparent opacity-50" />
        <div className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-mono mb-6 text-tekhelet-base dark:text-white">
            Let&apos;s Create
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let&apos;s discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); void handleSubmit(onSubmit)(); }}
            className="space-y-6 backdrop-blur-lg p-8 rounded-2xl
              border border-gray-200/50 dark:border-white/10
              bg-white/60 dark:bg-black/20"
          >
            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  {...register('user_name')}
                  className={`${inputClasses} ${errors.user_name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.user_name && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {errors.user_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  {...register('user_email')}
                  className={`${inputClasses} ${errors.user_email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.user_email && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {errors.user_email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Type
              </label>
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
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors.project_type.message}
                </p>
              )}
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Budget Range
                </label>
                <input
                  {...register('budget')}
                  className={`${inputClasses} ${errors.budget ? 'border-red-500' : ''}`}
                  placeholder="$5,000 - $10,000"
                />
                {errors.budget && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Timeline
                </label>
                <input
                  {...register('timeline')}
                  className={`${inputClasses} ${errors.timeline ? 'border-red-500' : ''}`}
                  placeholder="2-3 months"
                />
                {errors.timeline && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {errors.timeline.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Details
              </label>
              <textarea
                {...register('message')}
                className={`${inputClasses} h-32 resize-none ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative overflow-hidden rounded-xl 
              bg-tekhelet-base dark:bg-tekhelet-light
              hover:bg-tekhelet-light dark:hover:bg-tekhelet-base
              text-white font-medium
              transition-all duration-300 hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 py-4">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          {/* Sidebar Information */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="backdrop-blur-lg p-8 rounded-2xl
              border border-gray-200/50 dark:border-white/10
              bg-white/60 dark:bg-black/20">
              <h3 className="text-2xl font-bold mb-6 text-tekhelet-base dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-tekhelet-base/10 dark:bg-white/5">
                      <item.icon className="w-6 h-6 text-tekhelet-base dark:text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white/80">
                        {item.label}
                      </h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-tekhelet-base hover:text-tekhelet-light 
                            dark:text-white dark:hover:text-accent-primary 
                            transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-lg p-8 rounded-2xl
              border border-gray-200/50 dark:border-white/10
              bg-white/60 dark:bg-black/20">
              <h3 className="text-2xl font-bold mb-6 text-tekhelet-base dark:text-white">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-tekhelet-base/10 dark:bg-white/5 
                  hover:bg-tekhelet-base/20 dark:hover:bg-white/10
                  text-tekhelet-base dark:text-white
                  transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-tekhelet-base/10 dark:bg-white/5 
                  hover:bg-tekhelet-base/20 dark:hover:bg-white/10
                  text-tekhelet-base dark:text-white
                  transition-colors"
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