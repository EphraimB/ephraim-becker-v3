import { useState, useEffect } from 'react';

export default function useParallax() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch/coarse devices to bypass parallax calculation for performance
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize coordinates relative to viewport center: -0.5 to 0.5
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return coords;
}
