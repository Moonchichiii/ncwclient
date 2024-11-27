import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

// Zod schema for validation
const contactSchema = z.object({
  user_name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  user_email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(500, 'Message is too long'),
  project_type: z.string().min(1, 'Project type is required'),
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  goals: z.string().min(1, 'Goals are required').max(500, 'Goals are too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
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
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        data,
        'YOUR_PUBLIC_KEY'
      );

      console.log('Email sent successfully');
      reset(); 
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const inputClasses =
    "w-full bg-[#223651] border border-[#343A40] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#CBB26A] transition-colors";

  return (
    <div className="min-h-screen bg-[#343A40] text-white py-20 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-8 text-center">
          Let's <span className="text-[#CBB26A]">Connect</span>
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Tell us about your project. The more details, the better!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Basic Info */}
            <div>
              <label htmlFor="user_name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="user_name"
                {...register('user_name')}
                className={`${inputClasses} ${errors.user_name && 'border-red-500'}`}
                placeholder="Your Name"
              />
              {errors.user_name && (
                <p className="text-red-500 mt-1">{errors.user_name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="user_email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="user_email"
                {...register('user_email')}
                className={`${inputClasses} ${errors.user_email && 'border-red-500'}`}
                placeholder="Your Email"
              />
              {errors.user_email && (
                <p className="text-red-500 mt-1">{errors.user_email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                {...register('message')}
                className={`${inputClasses} h-32 resize-none ${
                  errors.message && 'border-red-500'
                }`}
                placeholder="Your Message"
              />
              {errors.message && (
                <p className="text-red-500 mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Project Details */}
            <div>
              <label htmlFor="project_type" className="block mb-2 font-medium">
                Project Type
              </label>
              <input
                type="text"
                id="project_type"
                {...register('project_type')}
                className={`${inputClasses} ${errors.project_type && 'border-red-500'}`}
                placeholder="e.g., Web App, Mobile App"
              />
              {errors.project_type && (
                <p className="text-red-500 mt-1">{errors.project_type.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="budget" className="block mb-2 font-medium">
                Budget
              </label>
              <input
                type="text"
                id="budget"
                {...register('budget')}
                className={`${inputClasses} ${errors.budget && 'border-red-500'}`}
                placeholder="e.g., $5,000 - $10,000"
              />
              {errors.budget && (
                <p className="text-red-500 mt-1">{errors.budget.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="timeline" className="block mb-2 font-medium">
                Timeline
              </label>
              <input
                type="text"
                id="timeline"
                {...register('timeline')}
                className={`${inputClasses} ${errors.timeline && 'border-red-500'}`}
                placeholder="e.g., 2-3 months"
              />
              {errors.timeline && (
                <p className="text-red-500 mt-1">{errors.timeline.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="goals" className="block mb-2 font-medium">
                Project Goals
              </label>
              <textarea
                id="goals"
                {...register('goals')}
                className={`${inputClasses} h-32 resize-none ${
                  errors.goals && 'border-red-500'
                }`}
                placeholder="Describe your project's goals..."
              />
              {errors.goals && (
                <p className="text-red-500 mt-1">{errors.goals.message}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#137DC5] hover:bg-[#223651] text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <a
                  href="mailto:contact@nordiccodeworks.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#CBB26A] transition-colors"
                >
                  <Mail size={20} />
                  contact@nordiccodeworks.com
                </a>
                <a
                  href="https://github.com/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#CBB26A] transition-colors"
                >
                  <Github size={20} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/company/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#CBB26A] transition-colors"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
