import { Github, ExternalLink, FolderOpen } from 'lucide-react';

type ProjectsProps = {
  projects: {
    title: string;
    description: string;
    tech: string[];
    image: string;
    github?: string;
    featured: boolean;
    live?: string;
  }[];
  isDarkTheme: boolean;
};

export function Projects({ projects, isDarkTheme }: ProjectsProps) {
  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              / compiled_works
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Here are some projects I've built that showcase my passion for creating innovative
            solutions.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl ${
                  isDarkTheme ? 'bg-white/5' : 'bg-white/60'
                } backdrop-blur-md border ${
                  isDarkTheme ? 'border-white/10' : 'border-white/20'
                } hover:scale-105 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="opacity-80 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDarkTheme
                          ? 'bg-cyan-400/20 text-cyan-400'
                          : 'bg-blue-500/20 text-blue-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Other Projects */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-6">Other Notable Projects</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  isDarkTheme ? 'bg-white/5' : 'bg-white/40'
                } backdrop-blur-md border ${
                  isDarkTheme ? 'border-white/5' : 'border-white/20'
                } hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-6 h-6 text-cyan-400" />
                    <h4 className="font-semibold">{project.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm opacity-80 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 text-xs rounded ${
                        isDarkTheme
                          ? 'bg-cyan-400/10 text-cyan-400'
                          : 'bg-blue-500/10 text-blue-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
