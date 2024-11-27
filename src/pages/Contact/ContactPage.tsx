import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ArrowRight } from 'lucide-react';
import { usePageTransitions } from '../../hooks/usePageTransitions';

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
  const pageRef = useRef<HTMLDivElement>(null);
  usePageTransitions(pageRef);

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

  const inputClasses = `
    w-full bg-[#223651]/50 backdrop-blur-sm
    border-2 border-[#343A40] rounded-xl px-6 py-4
    text-white placeholder:text-gray-400/70
    focus:outline-none focus:border-[#CBB26A] focus:ring-1 focus:ring-[#CBB26A]/50
    transition-all duration-200
  `;

  return (
    <div ref={pageRef} className="min-h-screen bg-[#343A40] text-white py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-[#223651]/20 to-transparent" />
      
      <motion.div
        className="relative max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            Let's <span className="text-[#CBB26A]">Connect</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your vision to life? Share your project details with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-[#223651]/30 backdrop-blur-md p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.user_name.message}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input
                  {...register('user_email')}
                  className={inputClasses}
                  placeholder="john@example.com"
                />
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Budget</label>
                <input
                  {...register('budget')}
                  className={inputClasses}
                  placeholder="$5,000 - $10,000"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Timeline</label>
                <input
                  {...register('timeline')}
                  className={inputClasses}
                  placeholder="2-3 months"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Message</label>
              <textarea
                {...register('message')}
                className={`${inputClasses} h-32`}
                placeholder="Tell us about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative overflow-hidden rounded-xl bg-[#CBB26A] px-8 py-4 text-black font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#CBB26A] to-[#E6D5A7]"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>

          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-[#223651]/30 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, text: 'contact@nordiccodeworks.com', href: 'mailto:contact@nordiccodeworks.com' },
                  { icon: Github, text: 'GitHub', href: 'https://github.com/nordiccodeworks' },
                  { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com/company/nordiccodeworks' }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-[#CBB26A] transition-colors p-4 rounded-lg hover:bg-white/5"
                    whileHover={{ x: 10 }}
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-[#223651]/30 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <p className="text-gray-300">
                Monday - Friday<br />
                9:00 AM - 5:00 PM CET
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;