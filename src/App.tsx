import { useEffect } from 'react';
import './App.css';
import Portfolio from './Portfolio';

function App() {
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
  // Active Navigation
  function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id') ?? '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement | null;
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.background = 'rgba(0, 0, 0, 0.3)';
        } else {
          navbar.style.background = 'rgba(0, 0, 0, 0.1)';
        }
      }

      updateActiveNav();
      animateOnScroll();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Portfolio />
    </div>
  );
}

export default App;
