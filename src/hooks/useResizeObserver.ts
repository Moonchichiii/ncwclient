import { useEffect, useRef } from 'react';
import { debouncedRefresh } from '@/config/gsap';

export const useResizeObserver = (elementRef: React.RefObject<HTMLElement>) => {
    const observerRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        observerRef.current = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === elementRef.current) {
                    debouncedRefresh();
                }
            }
        });

        observerRef.current.observe(elementRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [elementRef]);
};
