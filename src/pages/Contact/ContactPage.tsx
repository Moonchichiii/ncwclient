import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { contactService, ContactFormData } from '../../api/services/contact';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactService.submit(formData);
      // Handle success (could add toast notification here)
      console.log('Form submitted successfully');
    } catch (error) {
      // Handle error (could add error toast notification here)
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inputClasses = "w-full bg-[#223651] border border-[#343A40] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#CBB26A] transition-colors";

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
          Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} h-32 resize-none`}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-[#137DC5] hover:bg-[#223651] text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              Send Message
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

            <div className="bg-[#223651] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Office Hours</h3>
              <p className="text-gray-300">Monday - Friday</p>
              <p className="text-gray-300">9:00 AM - 5:00 PM CET</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;