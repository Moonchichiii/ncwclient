import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <div className="relative">
    {/* Outer spinner */}
    <motion.div
      className="w-16 h-16 border-4 border-white/10 border-t-white/30 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Inner spinner */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 border-4 border-white/20 border-t-white/40 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Optional: Add a glowing dot in the center */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-white rounded-full"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      style={{
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
      }}
    />
  </div>
);

export default LoadingSpinner;