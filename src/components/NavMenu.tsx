import { Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
type NavMenuProps = {
  scrollToSection: (section: string) => void;
  onThemeChange: (theme: boolean) => void;
  activeSection: string;
};

export function NavMenu({ scrollToSection, activeSection, onThemeChange }: NavMenuProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleTheme = () => {
    onThemeChange(!isDarkTheme);
    setIsDarkTheme((prevState) => !prevState);
  };
  const handleMobileNavClick = (section: string) => {
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDarkTheme ? 'bg-slate-900/20' : 'bg-white/20'
      } backdrop-blur-md border-b ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Mahima Mathews
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === section ? 'text-cyan-400' : ''
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="text-xl hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </button>
            <a
              href="https://github.com/mahi3mathews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-cyan-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mahima-mathews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkTheme ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-800/20 text-slate-800'
              }`}
            >
              {isDarkTheme ? '☀️' : '🌙'}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  handleMobileNavClick(section);
                }}
                className="block w-full text-left py-2 capitalize hover:text-cyan-400 transition-colors"
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
