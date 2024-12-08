import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingSpinner = () => {
  const outerSpinnerRef = useRef(null);
  const innerSpinnerRef = useRef(null);
  const centerDotRef = useRef(null);

  useEffect(() => {
    // Outer spinner rotation
    gsap.to(outerSpinnerRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
    });

    // Inner spinner rotation (counter-clockwise)
    gsap.to(innerSpinnerRef.current, {
      rotation: -360,
      duration: 1.5,
      repeat: -1,
      ease: "none",
    });

    // Center dot pulsing animation
    gsap.to(centerDotRef.current, {
      opacity: 1,
      duration: 0.75,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    // Cleanup
    return () => {
      gsap.killTweensOf([outerSpinnerRef.current, innerSpinnerRef.current, centerDotRef.current]);
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