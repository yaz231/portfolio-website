import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight, Sun, Moon, Download } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';
import { techColors } from './utils/techColors';
import Typewriter from 'typewriter-effect';

import brewscout1 from './assets/images/projects/brewscout-1.png';
import brewscout2 from './assets/images/projects/brewscout-2.png';
import brewscout3 from './assets/images/projects/brewscout-3.png';
import saveseweidaImage from './assets/images/projects/savesweida.png';
import financialAnalyzerImage from './assets/images/projects/financial-analyzer.png';
import momentoImage from './assets/images/projects/momento.png';



const projects = [
  {
    title: 'Momento',
    description: 'An ephemeral photo sharing web application designed for temporary event albums. Create privacy-focused photo albums that automatically delete after 1-10 days, perfect for gatherings and events. Features include guest-friendly access with event codes, smart image compression, batch downloads, email reminders, and premium subscriptions for extended storage.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Stripe'],
    link: 'https://www.momentosharing.app',
    image: momentoImage
  },
  {
    title: 'Financial Analyzer',
    description: 'A financial comparison tool that analyzes three investment strategies—buying to live, buying to rent, or investing in stocks—through dynamic visualizations and customizable parameters. The app provides net worth projections, break-even analysis, and monthly payment breakdowns to help users make data-driven investment decisions.',
    tags: ['React', 'Data Visualization', 'Finance'],
    link: 'https://financial-analyzer-lac.vercel.app',
    image: financialAnalyzerImage
  },
  { 
    title: 'BrewScout', 
    description: 'A native iOS app that helps coffee enthusiasts discover and review local coffee shops with detailed insights beyond what traditional map apps offer. Users can search for coffee shops based on specific amenities (WiFi, seating, outlets, vibes) and contribute community-driven reviews with granular attribute ratings.',
    tags: ['iOS', 'Swift', 'Mobile App'],
    link: 'https://apps.apple.com/us/app/brewscout-coffee/id6744943538',
    images: [brewscout1, brewscout2, brewscout3]
  },
  { 
    title: 'SaveSweida', 
    description: 'A full-stack web application that streamlines constituent communication with government officials across multiple jurisdictions to advocate for humanitarian relief in Sweida, Syria.',
    tags: ['Full-Stack', 'Web App', 'Social Impact'],
    link: 'https://www.savesweida.com',
    image: saveseweidaImage
  },
];

const workHighlights = [
  {
    title: 'Automated Data Infrastructure',
    description: '10+ production data pipelines processing millions of daily events, enabling multi-million dollar trading decisions',
    tech: ['Python', 'Airflow', 'AWS', 'dbt']
  },
  {
    title: 'AI Quality Assessment System',
    description: 'End-to-end automated pipeline using LLMs to analyze transcripts and generate training reports',
    tech: ['Python', 'Gemini LLM', 'APIs']
  },
  {
    title: 'Financial Data Models',
    description: 'Transformation layer achieving cent-level precision for international financial reporting',
    tech: ['dbt', 'SQL', 'Snowflake']
  }
];

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function Portfolio() {
  const accentColor = 'rgb(59, 130, 246)';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isDark, setIsDark] = useDarkMode();
  const activeSection = useActiveSection();

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'cc30097c-b0e2-4b93-a731-0b32d9e73a17',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setFormStatus('Thanks for reaching out! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus('Failed to send. Please email me directly.');
    }
    
    setTimeout(() => setFormStatus(''), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    console.log('%c👋 Hey there, fellow developer!', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Looking for a talented engineer?', 'color: #10B981; font-size: 16px;');
    console.log('%c💼 Check out my GitHub: https://github.com/yaz231', 'color: #F59E0B; font-size: 14px;');
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Simple Top Navigation */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900/95 backdrop-blur z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-lg font-medium tracking-tight">Yazan Alatrach</a>
          <div className="flex gap-8 text-sm">
            <button onClick={() => scrollToSection('projects')} className={`hover:opacity-60 transition relative ${
                activeSection === 'projects' ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500' : ''
              }`}
            >Projects</button>
            <button onClick={() => scrollToSection('about')} className={`hover:opacity-60 transition relative ${
                activeSection === 'about' ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500' : ''
              }`}
            >About</button>
            <button onClick={() => scrollToSection('resume')} className={`hover:opacity-60 transition relative ${
                activeSection === 'resume' ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500' : ''
              }`}
            >Resume</button>
            <button onClick={() => scrollToSection('contact')} className={`hover:opacity-60 transition relative ${
                activeSection === 'contact' ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500' : ''
              }`}
            >Contact</button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }} 
      ></div>

      {/* Hero Section - Very Spacious */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight gradient-text">
            Yazan Alatrach
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto h-16">
            <Typewriter
              options={{
                strings: [
                  'Data Engineer building scalable systems and pipelines',
                  'Software Engineer passionate about data and automation',
                  'Turning complex problems into elegant, production-ready solutions',
                  'Building from data infrastructure to user-facing applications'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
                delay: 60,
                pauseFor: 3000, // Longer pause for readability
              }}
            />
          </div>
          <div className="flex justify-center gap-6 pt-4">
            <a href="https://www.linkedin.com/in/yazan-alatrach-98001b118/" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 dark:text-white transition">
              <Linkedin size={22} strokeWidth={1.5} />
            </a>
            <a href="https://github.com/yaz231" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 dark:text-white transition">
              <Github size={22} strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com/yazzz231" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 dark:text-white transition">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-20 text-center tracking-tight ">Projects</h2>
          <div className="space-y-24">
            {projects.map((project, index) => (
              <FadeInSection key={index}>
                <div className="space-y-4 transition-all duration-300 hover:scale-[1.01]">
                  {/* Title first */}
                  <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
                  
                  {/* Non-clickable image */}
                  <div className={`${project.images ? 'aspect-[16/10]' : 'aspect-video'} bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-sm overflow-hidden`}>
                    {project.images ? (
                      // Multiple images for BrewScout
                      <div className="w-full h-full flex items-center justify-center gap-4 p-8">
                        {project.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`${project.title} screenshot ${idx + 1}`}
                            className="h-full w-auto object-contain drop-shadow-2xl"
                          />
                        ))}
                      </div>
                    ) : project.image ? (
                      // Single image for other projects
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        [Project Image]
                      </div>
                    )}
                  </div>
                  
                  {/* Project info with description and button side-by-side */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <p className="text-gray-600">{project.description}</p>
                      <div className="flex gap-3">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-3 py-1 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-default"
                            style={{ 
                              backgroundColor: techColors[tag]?.bg || '#E5E7EB',
                              color: techColors[tag]?.text || '#374151'
                            }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* View Project button on the right */}
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-sm hover:gap-3 whitespace-nowrap flex-shrink-0"
                      style={{ 
                        backgroundColor: `${accentColor}15`, 
                        color: accentColor 
                      }}
                    >
                      View Project
                      <ArrowRight size={16} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Work Highlights Section */}
      <section className="py-32 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center tracking-tight">Professional Work</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Selected highlights from my professional experience building production data systems
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {workHighlights.map((highlight, index) => (
              <FadeInSection key={index}>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {highlight.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ 
                          backgroundColor: techColors[tech]?.bg || '#E5E7EB',
                          color: techColors[tech]?.text || '#374151'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight ">About</h2>
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              I'm a Data Engineer passionate about building scalable systems that turn data into actionable 
              insights. My work spans the full data stack—from ingestion pipelines and transformation layers 
              to BI dashboards and automated analytics.
            </p>
            <p>
              With experience at companies like Octopus Energy and Capital One, I've built production data 
              infrastructure processing millions of daily events, optimized critical business queries, and 
              created automated systems that drive multi-million dollar decisions.
            </p>
            <p>
              Beyond my day job, I build for fun—from iOS apps for discovering coffee shops to web platforms 
              for social impact. I believe in the power of elegant solutions, whether that's a clean data model 
              or an intuitive user interface.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="max-w-3xl mx-auto pt-8 space-y-4">
          <h3 className="text-2xl font-light tracking-tight">Education</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Georgia Institute of Technology</p>
                  <p className="text-gray-600">Master of Science in Computer Science</p>
                </div>
                <p className="text-sm text-gray-500">2025</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">The University of Texas at Austin</p>
                  <p className="text-gray-600">Bachelor of Science in Electrical & Computer Engineering</p>
                </div>
                <p className="text-sm text-gray-500">2019</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="max-w-3xl mx-auto pt-8 space-y-6">
          <h3 className="text-2xl font-light tracking-tight">Experience</h3>
          
          {/* Octopus Energy */}
          <div className="space-y-3 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <p className="font-medium">Analytics Engineer</p>
                <p className="text-gray-600">Octopus Energy</p>
              </div>
              <p className="text-sm text-gray-500">Sep 2024 - Present</p>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li>Owned transformation layer architecture using dbt and SQL to build scalable data models processing millions of daily events for financial reporting, energy trading, and risk management across international regions</li>
              <li>Built end-to-end automated QA pipeline using Python and Gemini LLM to generate AI-powered quality assessments and training reports, eliminating manual review processes</li>
              <li>Designed and implemented 10+ automated data ingestion pipelines using Python and Apache Airflow, enabling risk teams to perform accurate forecasting for multi-million dollar trading decisions</li>
              <li>Refactored legacy code using Python and dbt, reducing processing time by 80% and improving system reliability for business-critical operations</li>
              <li>Maintained 99%+ uptime of business-critical data systems by proactively monitoring and implementing fixes to prevent disruption to teams relying on real-time data</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Python', 'SQL', 'dbt', 'AWS', 'Airflow'].map((tech, i) => (
                <span key={i} 
                  className="text-xs px-3 py-1 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default"
                  style={{ 
                    backgroundColor: techColors[tech]?.bg || '#E5E7EB',
                    color: techColors[tech]?.text || '#374151'
                  }}>                  
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Capital One */}
          <div className="space-y-3 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <p className="font-medium">Senior Data Engineer</p>
                <p className="text-gray-600">Capital One</p>
              </div>
              <p className="text-sm text-gray-500">Aug 2021 - May 2023</p>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li>Built and maintained transformation layer data models using SQL and Snowflake to support diverse business needs, from daily operational metrics to historical trend analysis</li>
              <li>Optimized critical business queries, reducing query execution time by 50% from 1 hour to 30 minutes for key metrics like application submissions, conversion, and fund rates</li>
              <li>Developed robust ETL/ELT pipelines using Snowflake and Apache Airflow to integrate data from CRMs, payment systems, and transactional databases</li>
              <li>Collaborated directly with data analysts and business users to create and refine Tableau dashboards, delivering actionable data products</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {['SQL', 'Snowflake', 'Airflow', 'Tableau', 'Python'].map((tech, i) => (
                <span key={i} 
                  className="text-xs px-3 py-1 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default"
                  style={{ 
                    backgroundColor: techColors[tech]?.bg || '#E5E7EB',
                    color: techColors[tech]?.text || '#374151'
                  }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Cisco */}
          <div className="space-y-3">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <p className="font-medium">Network Engineer</p>
                <p className="text-gray-600">Cisco Systems</p>
              </div>
              <p className="text-sm text-gray-500">Jul 2019 - Aug 2021</p>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li>Created Python and Jenkins-based testing suite, automating feature verification and deployment, cutting testing duration from 15 hours to 2 hours</li>
              <li>Developed and deployed Webex clients to support increased demand for remote work during COVID-19 pandemic, creating bash scripts for efficient server monitoring</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Python', 'Jenkins', 'Bash', 'VoIP', 'Webex'].map((tech, i) => (
                <span key={i} 
                  className="text-xs px-3 py-1 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default"
                  style={{ 
                    backgroundColor: techColors[tech]?.bg || '#E5E7EB',
                    color: techColors[tech]?.text || '#374151'
                  }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-32 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Resume</h2>
            <p className="text-gray-600 text-lg">
              Download my resume to learn more about my experience and qualifications.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 pt-8">
            {/* PDF Preview Container */}
            <div className="w-full aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-sm overflow-hidden shadow-lg">
              <iframe
                src="/Resume.pdf"
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>

            {/* Download Button */}
            <a
              href="/Resume.pdf"
              download="Yazan_Alatrach_Resume.pdf"
              className="inline-flex items-center gap-3 px-12 py-4 text-white text-sm font-medium tracking-wide hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: accentColor }}
            >
              <Download size={18} strokeWidth={2} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight ">Get in touch</h2>
            <p className="text-gray-600 text-lg">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 pt-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none bg-transparent transition"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none bg-transparent transition"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-gray-600">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none bg-transparent resize-none transition"
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type='submit'
                className="w-full md:w-auto px-12 py-4 text-white text-sm tracking-wide hover:scale-105 transition-all duration-300 mt-8 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: accentColor }}
              >
                Send Message
              </button>
            </div>
            
            {formStatus && (
              <p className="text-center text-green-600 text-sm pt-4">{formStatus}</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2025 Yazan Alatrach</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/yazan-alatrach-98001b118/" target="_blank" rel="noopener noreferrer" 
               className="text-sm text-gray-500 hover:text-gray-900 dark:text-white transition">LinkedIn</a>
            <a href="https://github.com/yaz231" target="_blank" rel="noopener noreferrer" 
               className="text-sm text-gray-500 hover:text-gray-900 dark:text-white transition">GitHub</a>
            <a href="https://www.instagram.com/yazzz231/" target="_blank" rel="noopener noreferrer" 
               className="text-sm text-gray-500 hover:text-gray-900 dark:text-white transition">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}