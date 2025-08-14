import { MapPin } from 'lucide-react';
import mahiPic from '../assets/mahi_mathews.jpg';
import { Card } from '../components/Card';

type Tool = {
  name: string;
  icon?: string;
};
type ToolsProp = {
  [category: string]: Tool[];
};

type AboutProps = {
  tools: ToolsProp;
  isDarkTheme: boolean;
};
export function About({ tools, isDarkTheme }: AboutProps) {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              / about_me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-10">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed opacity-90">
              I'm an experienced Frontend/Fullstack Developer with 4 years of experience crafting
              responsive, high-performance web and mobile applications. I thrive in Agile
              environments where collaboration, clean architecture, and attention to detail are
              paramount.
            </p>
            <p className="text-lg leading-relaxed opacity-90 mb-6">
              My expertise lies in transforming complex ideas into intuitive, user-friendly
              interfaces that people love to use. I specialize in modern JavaScript frameworks, with
              a particular focus on React and React Native, and have strong experience integrating
              RESTful APIs to deliver seamless data-driven experiences. I also leverage cutting-edge
              design tools and performance optimization techniques to ensure every product I build
              is both beautiful and efficient.
            </p>

            <div className="flex items-center gap-2 pt-4">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>United Kingdom</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Profile Image */}
            <div className="text-center">
              <div
                className={`w-[350px] h-[350px] mx-auto rounded-2xl ${
                  isDarkTheme
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                    : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                } backdrop-blur-md border ${
                  isDarkTheme ? 'border-cyan-400/30' : 'border-blue-400/30'
                } p-2`}
              >
                <img
                  src={mahiPic}
                  alt="Mahima Mathews"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';

                    const next = target.nextElementSibling as HTMLElement;
                    if (next) {
                      next.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hidden items-center justify-center text-4xl font-bold text-white">
                  MSM
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tools */}
        <div>
          <h2 className="text-xl font-semibold mb-8 text-cyan-400">Tools & Technologies</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(tools).map((toolHeader, index) => (
              <Card
                isDarkTheme={isDarkTheme}
                cardKey={index}
                className="p-4 rounded-xl text-center flex flex-col items-center"
              >
                <h3 className="text-xl font-bold mb-6">
                  <span className="text-cyan-400">{toolHeader}</span>
                </h3>
                <div className="flex flex-wrap justify-evenly">
                  {tools[toolHeader]?.map((tool, tIndex) => (
                    <div key={`${index}-${tIndex}`} className="flex flex-col items-center mx-2">
                      <img
                        src={tool?.icon ?? 'icon'}
                        alt={tool.name}
                        className="w-[50px] h-[50px] mb-[8px] mx-[10px]"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';

                          const next = target.nextElementSibling as HTMLElement;
                          if (next) {
                            next.style.display = 'flex';
                          }
                        }}
                      />
                      <p className="w-full h-full p-[10px] my-[10px] rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hidden items-center justify-center text-sm font-bold text-white">
                        {tool.name}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
