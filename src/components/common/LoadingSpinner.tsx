import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingSpinner = () => {
  const outerSpinnerRef = useRef<HTMLDivElement>(null);
  const innerSpinnerRef = useRef<HTMLDivElement>(null);
  const centerDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outerSpinner = outerSpinnerRef.current;
    const innerSpinner = innerSpinnerRef.current;
    const centerDot = centerDotRef.current;

    // Outer spinner rotation
    if (outerSpinner) {
      gsap.to(outerSpinner, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    }

    // Inner spinner rotation (counter-clockwise)
    if (innerSpinner) {
      gsap.to(innerSpinner, {
        rotation: -360,
        duration: 1.5,
        repeat: -1,
        ease: "none",
      });
    }

    // Center dot pulsing animation
    if (centerDot) {
      gsap.to(centerDot, {
        opacity: 1,
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }

    // Cleanup
    return () => {
      if (outerSpinner) gsap.killTweensOf(outerSpinner);
      if (innerSpinner) gsap.killTweensOf(innerSpinner);
      if (centerDot) gsap.killTweensOf(centerDot);
    };
  }, []);

  return (
    <div className="relative">
      {/* Outer spinner */}
      <div
        ref={outerSpinnerRef}
        className="w-16 h-16 border-4 border-white/10 border-t-white/30 rounded-full"
      />
      
      {/* Inner spinner */}
      <div
        ref={innerSpinnerRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 border-4 border-white/20 border-t-white/40 rounded-full"
      />
      
      {/* Center glowing dot */}
      <div
        ref={centerDotRef}
        className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-white rounded-full opacity-40"
        style={{
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;