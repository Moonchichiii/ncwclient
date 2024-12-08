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
    w-full
    border border-white/10 rounded-xl px-6 py-4
    text-white placeholder:text-gray-400/70
    focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20
    transition-all duration-200
  `;

  return (
    <div ref={containerRef} className="contact-page min-h-screen text-white py-20 px-4 relative overflow-hidden z-0">
      {/* Background at z-[-1], no blending */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0 z-[-1]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)'
        }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
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
            {/* Form fields... */}
            {/* (Same as above, unchanged) */}
          </form>

          <div className="contact-sidebar space-y-12">
            {/* Sidebar with links... */}
            {/* (Same as above, unchanged) */}
          </div>
        </div>
      </div>
      <div className="end-marker"></div>
    </div>
  );
};

export default ContactPage;
