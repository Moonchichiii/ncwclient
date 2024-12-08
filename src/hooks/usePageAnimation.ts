// src/hooks/usePageAnimations.ts
import { RefObject, useEffect } from 'react';
import { gsap } from '../utils/gsap-init';

type AnimationFn = (ctx: gsap.Context) => void;

export default function usePageAnimations(
  containerRef: RefObject<HTMLElement>,
  animationFn: AnimationFn
) {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(animationFn, containerRef);
    return () => ctx.revert();
  }, [containerRef, animationFn]);
}
