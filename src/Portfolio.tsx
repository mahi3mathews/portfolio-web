import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavMenu } from './components/NavMenu';
import { Overlay } from './components/Overlay';
import { Hero } from './sections/Hero';
import { Contact } from './sections/Contact';
import { About } from './sections/About';
import {
  figma,
  git,
  firebase,
  mongodb,
  vscode,
  googlecloud,
  rendercom,
  vercel,
  netlify,
  postman,
  chromedevtools,
  expo,
  reactnative,
  react,
  nextjs,
  html5,
  css3,
  es6,
  typescript,
  tailwind,
  sass,
  nodejs,
  express,
  flaskapi,
  python,
} from './assets/index';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Footer } from './sections/Footer';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observerRef?.current?.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef?.current?.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const tech = {
    'Frontend Technologies': [
      { name: 'ReactJs', icon: react },
      { name: 'Next.js', icon: nextjs },
      { name: 'HTML5', icon: html5 },
      { name: 'CSS3', icon: css3 },
      { name: 'Javascript ES6+', icon: es6 },
      { name: 'Typescript', icon: typescript },
      { name: 'Tailwind CSS', icon: tailwind },
      { name: 'SASS', icon: sass },
    ],
    'Backend & APIs': [
      { name: 'Node.js', icon: nodejs },
      { name: 'Express', icon: express },
      { name: 'Flask API', icon: flaskapi },
      { name: 'Python', icon: python },
    ],
    'DevOps & Deployment': [
      { name: 'Vercel', icon: vercel },
      { name: 'Render.com', icon: rendercom },
      { name: 'Google Cloud', icon: googlecloud },
      { name: 'Netlify', icon: netlify },
      { name: 'Git', icon: git },
    ],
    'Mobile Development': [
      { name: 'React Native', icon: reactnative },
      { name: 'Expo', icon: expo },
    ],
    Databases: [
      { name: 'MongoDB', icon: mongodb },
      { name: 'Firebase', icon: firebase },
    ],
    'Development Tools & Design': [
      { name: 'VS Code', icon: vscode },
      { name: 'Figma', icon: figma },
      { name: 'Postman', icon: postman },
      { name: 'Chrome DevTools', icon: chromedevtools },
    ],
  };
  const experiences = [
    {
      company: 'Freelance',
      position: 'Full-Stack Developer',
      period: '2024 - Present',
      location: '',
      description:
        'Partnered with diverse clients from startups to established businesses, delivering custom web solutions using React and JavaScript. Built responsive websites, e-commerce platforms, and interactive applications. Managed complete project lifecycle from concept to deployment on Vercel and Render.',
      achievements: [
        'Delivered responsive websites, e-commerce platforms, and interactive applications tailored to client needs.',
        'Managed full project lifecycle from concept to deployment.',
        'Deployed projects on Vercel and Render for optimized hosting.',
      ],
    },
    {
      company: 'CubeQ Analytica',
      position: 'React Native Developer',
      period: '2024 - 2025',
      location: 'London, United Kingdom',
      description:
        'Led React Native mobile app development from concept to Google Play release. Integrated RESTful APIs, optimized architecture for performance and scalability, and collaborated with backend teams to resolve critical issues.',
      achievements: [
        'Led React Native mobile app development from concept to release.',
        'Integrated RESTful APIs for seamless data communication.',
        'Optimized architecture for better performance and scalability.',
      ],
    },
    {
      company: 'Coventry University',
      position: 'MSc Software Development (Student)',
      period: '2022 - 2023',
      location: 'Coventry, United Kingdom',
      description:
        'Advanced studies in software development with emphasis on secure coding, modern design patterns, and scalable architectures. Gained practical experience in building user-friendly applications, implementing REST APIs, and working with data management systems.',
      achievements: [
        'Designed and implemented layered architectures using GoF and GRASP design patterns for various academic projects.',
        'Developed a hybrid recommendation algorithm combining content-based and collaborative filtering techniques.',
        'Built full-stack applications integrating REST APIs and secure authentication mechanisms including JWT and password encryption.',
        'Led a software project to connect travel companions, incorporating Agile methodology and a task dashboard for sprint tracking.',
        'Applied Spiral Lifecycle Method for iterative feature development and enhancement.',
        'Implemented unit testing protocols to maintain code quality and functionality.',
      ],
    },
    {
      company: 'Infrrd Pvt Ltd.',
      position: 'Software Engineer',
      period: '2019 - 2022',
      location: 'Bengaluru, India',
      description:
        'Executed CI/CD pipelines for automated builds and deployments while developing UI features for web applications. Conducted code reviews and refactoring, reducing code complexity by 20%. Optimized performance achieving 15% faster loading times and 8% less memory usage.',
      achievements: [
        'Developed UI features for web applications within CI/CD pipelines.',
        'Reduced code complexity by 20% through systematic code reviews and refactoring.',
        'Achieved 15% faster load times and 8% lower memory usage.',
        'Implemented Google Analytics and improved website performance scores.',
        'Mentored junior developers on best practices.',
      ],
    },
  ];

  const projects = [
    {
      title: 'CBAM Calculator',
      description:
        'A carbon emissions calculator that gathers data on production processes, supplier emissions, and subcontractor information to help businesses assess environmental impact and ensure compliance with climate standards.',
      tech: [
        'React.js',
        'Node.js',
        'MongoDB',
        'Express',
        'Firebase Authentication',
        'Render.com',
        'Vercel',
      ],
      image: '🌱',
      live: 'https://cbam-calculator.vercel.app/sign-in',
      featured: true,
    },
    {
      title: 'Eventfull Sundays',
      description:
        'Dual mobile app experiences for event organizers and users. Organizers can publish events, manage ticket types, monitor sales, and check in attendees, while users can browse events, receive recommendations, purchase tickets, and access QR codes for entry.',
      tech: ['React Native', 'Expo', 'Stripe', 'Redux Toolkit', 'Axios'],
      image: '📊',
      live: 'https://play.google.com/store/apps/details?id=com.cubeqtec.eventsfullsundays&pcampaignid=web_share',
      featured: true,
    },
    {
      title: 'Recipe Route',
      description:
        'A full-stack recipe recommendation and meal planning platform with personalized suggestions powered by content-based and collaborative filtering. Includes user onboarding, store and inventory management, Stripe payment integration, and shopping list/cart features.',
      tech: [
        'React',
        'Bootstrap',
        'Axios',
        'Chart.js',
        'Chroma.js',
        'Stripe API',
        'Flask',
        'MongoDB',
        'Pandas',
        'scikit-learn',
        'NLTK',
      ],
      image: '🥘',
      github: 'https://github.com/mahi3mathews/recipe-route-prototype',
      featured: true,
    },
    {
      title: 'Travel Services Management System',
      description:
        'A full-stack application designed for Administrators and Travel Agents to manage travel services, track bookings, monitor commissions, and create custom itineraries for customers. Includes real-time sales analytics and commission tracking for improved business insights.',
      tech: [
        'React.js',
        'Redux',
        'Python',
        'FlaskAPI',
        'MongoDB',
        'CORS',
        'SCSS',
        'Bootstrap',
        'Unit Testing',
      ],
      image: '🧳',
      github: 'https://github.com/mahi3mathews/travelbounty',
      featured: true,
    },
    {
      title: 'Skill Forge',
      description:
        'A full-stack training management platform with separate admin and attendee views. Admins can create and manage trainings and courses, while attendees can apply for trainings and track applications. Built with React for the frontend and Spring Boot for the backend, using REST APIs and MongoDB for data persistence.',
      tech: [
        'React',
        'Redux Toolkit',
        'MUI',
        'Bootstrap',
        'Axios',
        'Spring Boot',
        'Java',
        'MongoDB',
        'REST API',
      ],
      image: '🎓',
      github: 'https://github.com/mahi3mathews/skill-forge',
      featured: false,
    },
    {
      title: 'Fleet Fortress',
      description:
        'A secure logistics management platform for tracking deliveries and managing fleet operations. Features include route planning, vehicle assignment, and manager oversight with role-based access. Built with React and Redux on the frontend, and Flask with MongoDB on the backend, offering robust APIs for routes, vehicles, users, and managers.',
      tech: [
        'React',
        'Redux Toolkit',
        'Bootstrap',
        'React-Bootstrap',
        'Axios',
        'Formik',
        'Flask',
        'Flask-RESTful',
        'Flask-CORS',
        'MongoDB',
        'Python',
      ],
      image: '🚚',
      github: 'https://github.com/mahi3mathews/fleet-fortress',
      featured: false,
    },
    {
      title: 'Weather App',
      description:
        "A responsive weather application that displays temperature, wind speed, and humidity for both the user's current location and a city entered as input. Utilizes the OpenWeatherMap API for real-time weather data and the Google Maps Geocoding API to determine the current city based on geolocation. Built using HTML, CSS, and JavaScript with dynamic DOM updates.",
      tech: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API', 'Google Maps Geocoding API'],
      image: '🌥',
      github: 'https://github.com/mahi3mathews/weather-web-app',
      featured: false,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkTheme
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
      }`}
    >
      {/* Fractal-inspired Particles Background */}
      <Overlay isDarkTheme={isDarkTheme} />

      {/* Navigation */}
      <NavMenu
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        onThemeChange={(isDTheme) => setIsDarkTheme(isDTheme)}
      />

      {/* Hero Section */}
      <Hero isDarkTheme={isDarkTheme} scrollToSection={scrollToSection} />

      {/* About Section */}
      <About tools={tech} isDarkTheme={isDarkTheme} />

      {/* Experience Section */}
      <Experience experiences={experiences} isDarkTheme={isDarkTheme} />

      {/* Projects Section */}
      <Projects projects={projects} isDarkTheme={isDarkTheme} />

      {/* Contacts Session */}
      <Contact isDarkTheme={isDarkTheme} />

      {/* Footer */}
      <Footer isDarkTheme={isDarkTheme} />

      {/* Floating Action Button - Back to Top */}
      <button
        onClick={() => scrollToSection('home')}
        className={`fixed bottom-8 right-8 p-3 rounded-full ${
          isDarkTheme ? 'bg-cyan-500' : 'bg-blue-600'
        } text-white shadow-lg hover:scale-110 transition-all duration-300 z-50`}
      >
        <ChevronDown className="w-6 h-6 trans form rotate-180" />
      </button>
    </div>
  );
};

export default Portfolio;
