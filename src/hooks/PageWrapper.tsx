import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: ({ transition }) => ({
    opacity: 0,
    y: transition === 'slide-up' ? '100%' : 0,
    x: transition === 'slide-horizontal' ? '100%' : 0
  }),
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  exit: ({ transition }) => ({
    opacity: 0,
    y: transition === 'slide-up' ? '-100%' : 0,
    x: transition === 'slide-horizontal' ? '-100%' : 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

export const PageWrapper = ({ children }) => {
  const location = useLocation();
  const transition = location.state?.transition || 'slide-horizontal';

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      custom={{ transition }}
    >
      {children}
    </motion.div>
  );
};