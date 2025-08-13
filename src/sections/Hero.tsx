import { useEffect } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import { FractalTree } from '../components/FractalTree';

type HeroProps = {
  isDarkTheme: boolean;
  scrollToSection: (section: string) => void;
};
export function Hero({ isDarkTheme, scrollToSection }: HeroProps) {
  // Counter animation for stats
  function animateCounter(element: Element, target: number, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    }
    updateCounter();
  }

  // Trigger counter animations when stats come into view
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.textContent ?? '');
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }
  // Typing effect for hero subtitle
  function typeWriter(element: Element, text: string, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  const typingEffect = () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
      const originalText = subtitle.textContent ?? '';
      setTimeout(() => {
        typeWriter(subtitle, originalText, 150);
      }, 1000);
    }
  };

  // Initialize
  useEffect(() => {
    typingEffect();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative z-10 pt-20"
    >
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Animated Fractal Tree */}
        <FractalTree />
        {/* Typewriter-style intro */}
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          Hi,{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Mahima Mathews
          </span>{' '}
          here.
        </h1>

        <h2 className="text-2xl md:text-3xl mb-8 font-light">Welcome to my page!</h2>

        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-80 leading-relaxed">
          I’m a passionate developer with experience delivering both enterprise-grade solutions and
          innovative digital platforms. I specialise in modern frontend development while also
          contributing across the full stack, blending creativity with solid engineering practices.
          With a keen eye for detail, I craft clean, high-performance applications, solve complex UI
          challenges, and continuously grow my skills through hands-on projects and ongoing
          learning, creating polished experiences used by thousands of users.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Say hi!
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`px-8 py-4 border-2 ${
              isDarkTheme
                ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                : 'border-blue-600 text-blue-600 hover:bg-blue-600/10'
            } rounded-full font-semibold hover:scale-105 transition-all duration-300`}
          >
            Learn More
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </div>
    </section>
  );
}
