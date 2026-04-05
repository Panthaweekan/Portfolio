import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Cpu, 
  Briefcase,
  Copy,
  Check,
  FileText,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BentoCard } from './ui/BentoCard';
import { Badge } from './ui/Badge';
import {
  personalInfo,
  technicalSkills,
  experiences as dataExperiences,
  projects as dataProjects,
  education,
  interests,
  bentoGridSkillCategories,
  bentoBadgeSkillCategories
} from '@/data/portfolio-data';

function LocalTimeClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const bangkokTime = new Date(now.toLocaleString("en-US", { timeZone: personalInfo.timezone }));
      setTime(bangkokTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{time} GMT+7</>;
}

export function PortfolioBento() {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [expandedJob, setExpandedJob] = useState<number | null>(0);

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
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 font-sans selection:bg-primary/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-4 animate-fade-in-up">
        
        {/* ===== HEADER: Profile & Metadata ===== */}
        <div className="mb-10 pt-4 md:pt-8 flex flex-col items-start gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-6">
            <div>
              <div className="h-16 w-16 md:h-20 md:w-20 mb-6 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <img 
                  src="imgs/image.svg" 
                  alt={`${personalInfo.shortName} Brand Logo`} 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-50">{personalInfo.shortName}</h1>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg max-w-2xl">
                {personalInfo.bio}
              </p>
            </div>
            
            {/* Theme Toggle */}
            <div className="flex self-start md:self-end">
              <button 
                onClick={toggleTheme}
                className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} />
              Bangkok • <LocalTimeClock />
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for work
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
            
            {/* Socials Inline */}
            <div className="flex items-center gap-1 w-full sm:w-auto mt-2 sm:mt-0">
               <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  <Github size={18} />
                  <span className="sr-only">GitHub</span>
               </a>
               <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  <Linkedin size={18} />
                  <span className="sr-only">LinkedIn</span>
               </a>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex flex-wrap gap-3 mt-4 pt-6 border-t border-zinc-100 dark:border-zinc-800/60 w-full">
             <Link 
               to="/resume"
               className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2.5 min-h-[44px] rounded-lg font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm w-full sm:w-auto"
             >
               <FileText size={16} />
               Resume PDF
             </Link>
             <button onClick={handleCopyEmail} className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-5 py-2.5 min-h-[44px] rounded-lg font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm w-full sm:w-auto">
               {copied ? <Check size={16} /> : <div className="text-zinc-400"><Copy size={16} /></div>}
               {copied ? 'Copied!' : 'Copy Email'}
             </button>
             <a 
               href={`mailto:${personalInfo.email}`}
               className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-5 py-2.5 min-h-[44px] rounded-lg font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm w-full sm:w-auto"
             >
               <Mail size={16} className="text-zinc-400" />
               Get in touch
             </a>
          </div>
        </div>

        {/* ===== ROW 2: Tech Stack ===== */}
        <BentoCard className="p-5" aria-labelledby="tech-skills-heading" role="region">
          <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
            <Cpu size={14} aria-hidden="true" />
            <h2 id="tech-skills-heading" className="text-xs font-bold uppercase tracking-wider m-0">Technical Skills</h2>
          </div>
          
          <div className="space-y-6">
            {/* Grid Categories (Text Layout) */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-4">
              {technicalSkills
                .filter((cat) => (bentoGridSkillCategories as readonly string[]).includes(cat.name))
                .map((category) => (
                <li key={category.name} className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{category.name}</h3>
                  <ul className="flex flex-wrap gap-x-1.5 gap-y-1">
                    {category.items.map((item, index) => (
                      <li 
                        key={item.label} 
                        className={`text-xs flex items-center ${item.highlight ? 'text-primary font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}
                      >
                        <span>{item.label}</span>
                        {item.subtitle && <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-1">({item.subtitle})</span>}
                        {index !== category.items.length - 1 && <span className="text-zinc-300 dark:text-zinc-700 ml-1.5">,</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Badge Categories (Horizontal List) */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              <ul className="space-y-3">
                {technicalSkills
                  .filter((cat) => (bentoBadgeSkillCategories as readonly string[]).includes(cat.name))
                  .map((category) => (
                  <li key={category.name}>
                    <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">{category.name}</h3>
                    <ul className="flex flex-wrap gap-1.5">
                      {category.items.map((item) => (
                        <li key={item.label}>
                          <Badge variant={item.highlight ? 'highlight' : 'default'}>
                            {item.label}{item.subtitle ? ` (${item.subtitle})` : ''}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BentoCard>

        {/* ===== ROW 3: Experience + Education ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Experience */}
          <BentoCard className="md:col-span-2 p-5" noHover aria-labelledby="experience-heading" role="region">
             <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
               <Briefcase size={14} aria-hidden="true" />
               <h2 id="experience-heading" className="text-xs font-bold uppercase tracking-wider m-0">Experience</h2>
             </div>
             <div className="space-y-4">
                {dataExperiences.map((job, index) => (
                  <div key={index} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                    <button 
                      onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                      className="w-full text-left flex items-start justify-between py-2 min-h-[44px] hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-md -ml-2 px-2 transition-colors group"
                      aria-expanded={expandedJob === index}
                      aria-controls={`job-details-${index}`}
                      id={`job-button-${index}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-zinc-400 dark:bg-zinc-600'}`}></span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">{job.period}</span>
                        </div>
                        <h4 className="font-bold text-sm mt-1">{job.title}</h4>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.company} • {job.location}</span>
                      </div>
                      <div className="text-zinc-500 ml-2 mt-1 transition-transform duration-200">
                        {expandedJob === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>
                    
                    {expandedJob === index && (
                      <div 
                        className="mt-3 animate-fade-in-up"
                        id={`job-details-${index}`}
                        role="region"
                        aria-labelledby={`job-button-${index}`}
                      >
                        <div className="flex flex-wrap gap-1 mb-2">
                          {job.technologies.map((tech, i) => (
                            <Badge key={i}>{tech}</Badge>
                          ))}
                        </div>
                        <ul className="space-y-1">
                          {job.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{h.text}</span>
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
            <BentoCard className="p-5" aria-labelledby="education-heading" role="region">
              <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
                <h2 id="education-heading" className="text-xs font-bold uppercase tracking-wider m-0">Education</h2>
              </div>
              <h3 className="font-bold text-sm">B.Eng. Computer Engineering</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{education.school}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-primary">{education.honours}</span>
                <span className="text-xs text-zinc-500">GPA {education.gpa}</span>
              </div>
            </BentoCard>

            <BentoCard className="p-5" aria-labelledby="interests-heading" role="region">
              <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
                <h2 id="interests-heading" className="text-xs font-bold uppercase tracking-wider m-0">Interests</h2>
              </div>
              <div className="flex flex-wrap gap-1">
                {interests.map((interest, idx) => (
                  <Badge key={idx}>{interest}</Badge>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>

        {/* ===== ROW 4: Projects ===== */}
        <div aria-labelledby="projects-heading" role="region">
          <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400 px-1">
            <h2 id="projects-heading" className="text-xs font-bold uppercase tracking-wider m-0">Key Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataProjects.map((project, index) => (
              <BentoCard key={index} className="p-5 group">
                <div className="flex items-center justify-end mb-2">
                  <span className="text-xs text-zinc-500 font-mono">{project.dateRange}</span>
                </div>
                <h3 className="font-bold text-sm mb-1 tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">{project.description}</p>
                {project.impact && (
                  <p className="text-xs text-primary dark:text-primary font-medium mb-3">{project.impact}</p>
                )}
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
          <BentoCard className="md:col-span-2 p-5" noHover aria-labelledby="about-heading" role="region">
            <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
              <h2 id="about-heading" className="text-xs font-bold uppercase tracking-wider m-0">About Me</h2>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {personalInfo.aboutSummary}
            </p>
          </BentoCard>

          <BentoCard className="p-5" aria-labelledby="contact-heading" role="region">
            <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
              <h2 id="contact-heading" className="text-xs font-bold uppercase tracking-wider m-0">Contact</h2>
            </div>
            <div className="space-y-1">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors py-2 min-h-[44px]"
              >
                <Mail size={14} className="opacity-70" />
                {personalInfo.email}
              </a>
              <a 
                href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors py-2 min-h-[44px]"
              >
                <span className="font-semibold text-xs tracking-widest text-zinc-400 px-0.5">TEL</span>
                {personalInfo.phone}
              </a>
            </div>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="mt-3 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
            >
              <Mail size={14} />
              Send Email
            </a>
          </BentoCard>
        </div>
        
        <footer className="text-center text-zinc-500 dark:text-zinc-600 text-xs py-8">
          <p>© {new Date().getFullYear()} {personalInfo.shortName} Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default PortfolioBento;
