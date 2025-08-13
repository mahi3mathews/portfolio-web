import { MapPin, Calendar } from 'lucide-react';

type ExperienceProps = {
  experiences: {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
  }[];
  isDarkTheme: boolean;
};

export function Experience({ experiences, isDarkTheme }: ExperienceProps) {
  return (
    <section id="experience" className="min-h-screen flex items-center py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              / experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${
                isDarkTheme ? 'bg-white/5' : 'bg-white/60'
              } backdrop-blur-md border ${
                isDarkTheme ? 'border-white/10' : 'border-white/20'
              } hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">
                    <span className="text-cyan-400">{exp.position}</span>
                    <span className="text-cyan-400"> @ </span>
                    <span className="hover:text-cyan-400 transition-colors">{exp.company}</span>
                  </h3>
                </div>
                <div className="text-sm opacity-70 mt-2 md:mt-0 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  )}
                </div>
              </div>

              <p className="mb-4 opacity-90">{exp.description}</p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-baseline gap-3">
                    <span className="text-cyan-400 mt-2">▹</span>
                    <span className="text-sm opacity-80 leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
