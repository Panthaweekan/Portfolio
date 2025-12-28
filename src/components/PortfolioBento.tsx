import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  Code2, 
  Terminal, 
  Cpu, 
  Briefcase,
  Copy,
  Check,
  Database,
  Server,
  FileText,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BentoCard } from './ui/BentoCard';
import { Badge } from './ui/Badge';
import { TechIcon } from './ui/TechIcon';

export function PortfolioBento() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [expandedJob, setExpandedJob] = useState<number | null>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const bangkokTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
      setTime(bangkokTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("panthaweekansomngam@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const experiences = [
    {
      title: 'Associate Software Engineer',
      company: 'SCB TechX',
      period: 'May 2025 - Present',
      location: 'Bangkok (Hybrid)',
      technologies: ['Go', 'Fiber', 'Kong', 'Rails', 'React', 'TypeScript'],
      highlights: [
        'Enterprise API gateway infrastructure (CA Layer 7 & Kong)',
        'Cloud migration with seamless service continuity',
        'Full-stack Asset Management System',
        'Custom hybrid API gateway with event-driven design',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Chiang Mai University',
      period: '2023 - 2025',
      location: 'Chiang Mai',
      technologies: ['Go', 'Fiber', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
      highlights: [
        'Production apps serving 2,000+ users',
        'Hexagonal Architecture & SOLID patterns',
        'Full deployment lifecycle with incident response',
      ],
    },
  ];

  const projects = [
    {
      title: "Hybrid API Gateway",
      description: "Custom API gateway combining CA Layer 7 and Kong best practices with database event-driven design.",
      technologies: ["Go", "Fiber", "PostgreSQL", "Kong"],
      impact: "Handle all Easy App Requests",
      dateRange: "2025"
    },
    {
      title: "Asset Management",
      description: "Enterprise inventory tracking with request/return workflows and centralized database.",
      technologies: ["Rails", "React", "TypeScript"],
      impact: "800+ employees",
      dateRange: "2025"
    },
    {
      title: "SD-Booking",
      description: "Room reservation system with PWA notifications via WebHooks, reducing wait time by 60%.",
      technologies: ["Go", "React", "TypeScript", "PWA"],
      impact: "100+ monthly bookings",
      dateRange: "2023-2025"
    },
    {
      title: "LongPlan Validator",
      description: "Senior thesis validating 200+ curriculum rules for prerequisites and graduation.",
      technologies: ["Go", "React", "Graph Algorithms"],
      impact: "Senior Thesis",
      dateRange: "2023-2025"
    },
    {
      title: "SD-Letter",
      description: "Certificate request workflow with multi-stage approval, reducing processing time by 40%.",
      technologies: ["Go", "React", "TypeScript", "WebHooks"],
      impact: "500+ requests/semester",
      dateRange: "2023-2025"
    }
  ];


  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 md:p-6 lg:p-8 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-4 animate-fade-in-up">
        
        {/* ===== ROW 1: Profile + Location + Social ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          
          {/* Profile Card */}
          <BentoCard className="col-span-2 row-span-2 justify-between p-5 md:p-6">
            <div>
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
                PS
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2">Panthaweekan S.</h1>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                Associate Software Engineer at SCB TechX. Specializing in API gateway infrastructure, cloud-native solutions, and full-stack development with Go and TypeScript.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
               <Link 
                 to="/resume"
                 className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium text-xs md:text-sm hover:bg-zinc-200 transition-colors"
               >
                 <FileText size={14} />
                 Resume
               </Link>
               <button onClick={handleCopyEmail} className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-full font-medium text-xs md:text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
                 {copied ? <Check size={14} /> : <Copy size={14} />}
                 {copied ? 'Copied!' : 'Email'}
               </button>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          </BentoCard>

          {/* Location */}
          <BentoCard className="justify-center items-center text-center p-4">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:12px_12px]"></div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="bg-white/80 dark:bg-zinc-950/80 p-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                 <MapPin className="text-indigo-400" size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-xs md:text-sm">Bangkok</h3>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-bold">{time} GMT+7</p>
              </div>
            </div>
          </BentoCard>

          {/* Availability */}
          <BentoCard className="justify-center items-center text-center p-4 gap-2">
             <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute inset-0 opacity-75"></div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full relative"></div>
             </div>
             <h3 className="font-semibold text-xs md:text-sm">Available</h3>
             <a 
               href="mailto:panthaweekansomngam@gmail.com"
               className="text-[10px] font-medium text-emerald-400 border border-emerald-900/50 bg-emerald-900/10 px-2 py-1 rounded-full hover:bg-emerald-900/20 transition-colors"
             >
               Contact
             </a>
          </BentoCard>

          {/* Social Links */}
          <BentoCard className="flex flex-col justify-center gap-2 p-4">
             <a href="https://github.com/Panthaweekan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group/link">
                <div className="bg-zinc-200 dark:bg-zinc-800 p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 group-hover/link:text-zinc-900 dark:group-hover/link:text-white transition-all">
                  <Github size={14} />
                </div>
                <span className="text-xs font-medium flex-1">GitHub</span>
                <ArrowUpRight size={10} className="text-zinc-400 dark:text-zinc-600" />
             </a>
             <a href="https://www.linkedin.com/in/panthaweekan/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group/link">
                <div className="bg-blue-900/30 p-1.5 rounded-md text-blue-400 group-hover/link:text-blue-300 transition-all">
                  <Linkedin size={14} />
                </div>
                <span className="text-xs font-medium flex-1">LinkedIn</span>
                <ArrowUpRight size={10} className="text-zinc-400 dark:text-zinc-600" />
             </a>
          </BentoCard>

          {/* Theme Toggle */}
          <BentoCard className="flex flex-row items-center justify-between p-4 gap-2">
            <div>
              <h3 className="font-semibold text-xs">Theme</h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{isDark ? 'Dark' : 'Light'}</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </BentoCard>
        </div>

        {/* ===== ROW 2: Tech Stack ===== */}
        <BentoCard className="p-5">
          <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
            <Cpu size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Primary Stack</span>
          </div>
          
          {/* Languages */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={12} className="text-indigo-400" />
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Languages</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <TechIcon icon={Terminal} label="Go" highlight />
              <TechIcon icon={Code2} label="TypeScript" highlight />
              <TechIcon icon={Code2} label="Ruby" />
              <TechIcon icon={Code2} label="Python" />
              <TechIcon icon={Code2} label="Java" />
              <TechIcon icon={Code2} label="Rust" subtitle="Learning" />
            </div>
          </div>

          {/* Backend & Frameworks */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Server size={12} className="text-emerald-400" />
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Backend & Frameworks</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <TechIcon icon={Terminal} label="Go Fiber" highlight />
              <TechIcon icon={Terminal} label="Rails" />
              <TechIcon icon={Code2} label="React" highlight />
              <TechIcon icon={Code2} label="Node.js" />
              <TechIcon icon={Server} label="Kong Gateway" />
              <TechIcon icon={Server} label="CA Layer 7" />
            </div>
          </div>

          {/* Data & DevOps */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Database size={12} className="text-amber-400" />
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Data & DevOps</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <TechIcon icon={Database} label="PostgreSQL" highlight />
              <TechIcon icon={Database} label="MySQL" />
              <TechIcon icon={Server} label="Docker" highlight />
              <TechIcon icon={Terminal} label="Git" />
              <TechIcon icon={Server} label="CI/CD" />
              <TechIcon icon={Server} label="Linux" />
            </div>
          </div>

          {/* Architecture */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={12} className="text-purple-400" />
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Architecture & Practices</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge>Hexagonal Architecture</Badge>
              <Badge>Domain-Driven Design</Badge>
              <Badge>Microservices</Badge>
              <Badge>SOLID Principles</Badge>
              <Badge>Clean Code</Badge>
              <Badge>TDD</Badge>
            </div>
          </div>
        </BentoCard>

        {/* ===== ROW 3: Experience + Education ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Experience */}
          <BentoCard className="md:col-span-2 p-5" noHover>
             <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
               <Briefcase size={14} />
               <span className="text-[10px] font-bold uppercase tracking-wider">Experience</span>
             </div>
             <div className="space-y-4">
                {experiences.map((job, index) => (
                  <div key={index} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                    <button 
                      onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                      className="w-full text-left flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-indigo-500' : 'bg-zinc-400 dark:bg-zinc-600'}`}></span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">{job.period}</span>
                        </div>
                        <h4 className="font-bold text-sm mt-1">{job.title}</h4>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.company} • {job.location}</span>
                      </div>
                      <div className="text-zinc-500 ml-2">
                        {expandedJob === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>
                    
                    {expandedJob === index && (
                      <div className="mt-3 animate-fade-in-up">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {job.technologies.map((tech, i) => (
                            <Badge key={i}>{tech}</Badge>
                          ))}
                        </div>
                        <ul className="space-y-1">
                          {job.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                              <span className="text-indigo-400 mt-0.5">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </BentoCard>

          {/* Education & Interests */}
          <div className="space-y-4">
            <BentoCard className="p-5">
              <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
                <span className="text-sm">🎓</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Education</span>
              </div>
              <h3 className="font-bold text-sm">B.Eng. Computer Engineering</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Chiang Mai University</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-indigo-400">Second-Class Honours</span>
                <span className="text-[10px] text-zinc-500">GPA 3.32</span>
              </div>
            </BentoCard>

            <BentoCard className="p-5">
              <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
                <span className="text-sm">💡</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Interests</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['System Design', 'Clean Architecture', 'API Design', 'DevOps'].map((i, idx) => (
                  <Badge key={idx}>{i}</Badge>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>

        {/* ===== ROW 4: Projects ===== */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400 px-1">
            <span className="text-sm">🚀</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Key Projects</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <BentoCard key={index} className="p-5 group">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    Production
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono">{project.dateRange}</span>
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">{project.description}</p>
                <p className="text-[10px] text-indigo-400 dark:text-indigo-400 font-medium mb-3">📊 {project.impact}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i}>{tech}</Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge>+{project.technologies.length - 3}</Badge>
                  )}
                </div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* ===== ROW 5: About + Contact ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoCard className="md:col-span-2 p-5" noHover>
            <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
              <span className="text-sm">✨</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">About Me</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I focus on enterprise API gateway infrastructure and cloud migration at SCB TechX. 
              Passionate about <span className="text-zinc-900 dark:text-zinc-200">Hexagonal Architecture</span>, 
              <span className="text-zinc-900 dark:text-zinc-200"> Domain-Driven Design</span>, and 
              <span className="text-zinc-900 dark:text-zinc-200"> SOLID principles</span>—they create systems teams can evolve with confidence. 
              Looking for environments where engineering excellence is valued.
            </p>
          </BentoCard>

          <BentoCard className="p-5 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
            <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
              <span className="text-sm">📞</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Contact</span>
            </div>
            <div className="space-y-2">
              <a 
                href="mailto:panthaweekansomngam@gmail.com"
                className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail size={12} />
                panthaweekansomngam@gmail.com
              </a>
              <a 
                href="tel:+66946359510"
                className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                <span className="w-3 h-3 flex items-center justify-center">📱</span>
                +66 94-635-9510
              </a>
            </div>
            <a 
              href="mailto:panthaweekansomngam@gmail.com"
              className="mt-3 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              <Mail size={12} />
              Send Email
            </a>
          </BentoCard>
        </div>
        
        <footer className="text-center text-zinc-500 dark:text-zinc-600 text-xs py-4">
          <p>© {new Date().getFullYear()} Panthaweekan S. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default PortfolioBento;
