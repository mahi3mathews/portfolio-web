import { useEffect, useRef } from 'react';
import '../App.css';
type OverlayProps = {
  isDarkTheme: boolean;
};
export function Overlay({ isDarkTheme }: OverlayProps) {
  const particlesRef = useRef(null);

  // Particle system with fractal-inspired movement
  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return;

      const particleCount = 60;
      particlesRef.current.innerHTML = '';

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        const colors = ['#00ff88', '#64ffda', '#80cbc4', '#4fc3f7'];
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          opacity: ${Math.random() * 0.8 + 0.2};
          left: ${Math.random() * 100}%;
          animation: fractalFloat ${12 + Math.random() * 16}s linear infinite;
          animation-delay: ${Math.random() * 10}s;
          box-shadow: 0 0 ${size * 2}px ${colors[Math.floor(Math.random() * colors.length)]};
        `;
        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();
    const interval = setInterval(createParticles, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: isDarkTheme
            ? 'radial-gradient(ellipse at center, #0f172a 0%, #1e293b 30%, #0c4a6e 70%, #082f49 100%)'
            : 'radial-gradient(ellipse at center, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)',
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <g
            transform="translate(200,400)"
            stroke={isDarkTheme ? '#64ffda' : '#3b82f6'}
            strokeWidth="1"
            fill="none"
          >
            <line x1="0" y1="0" x2="0" y2="-100" />
            <g transform="translate(0,-100)">
              <g transform="rotate(30)">
                <line x1="0" y1="0" x2="0" y2="-67" />
                <g transform="translate(0,-67) rotate(30)">
                  <line x1="0" y1="0" x2="0" y2="-45" />
                </g>
                <g transform="translate(0,-67) rotate(-30)">
                  <line x1="0" y1="0" x2="0" y2="-45" />
                </g>
              </g>
              <g transform="rotate(-30)">
                <line x1="0" y1="0" x2="0" y2="-67" />
                <g transform="translate(0,-67) rotate(30)">
                  <line x1="0" y1="0" x2="0" y2="-45" />
                </g>
                <g transform="translate(0,-67) rotate(-30)">
                  <line x1="0" y1="0" x2="0" y2="-45" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}
