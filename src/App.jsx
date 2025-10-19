import React, { useState } from 'react';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight } from 'lucide-react';

import brewscout1 from './assets/images/projects/brewscout-1.png';
import brewscout2 from './assets/images/projects/brewscout-2.png';
import brewscout3 from './assets/images/projects/brewscout-3.png';
import saveseweidaImage from './assets/images/projects/savesweida.png';
import financialAnalyzerImage from './assets/images/projects/financial-analyzer.png';


const projects = [
  { 
    title: 'BrewScout', 
    description: 'A native iOS app that helps coffee enthusiasts discover and review local coffee shops with detailed insights beyond what traditional map apps offer. Users can search for coffee shops based on specific amenities (WiFi, seating, outlets, vibes) and contribute community-driven reviews with granular attribute ratings.',
    tags: ['iOS', 'Swift', 'Mobile App'],
    link: 'https://apps.apple.com/us/app/brewscout-coffee/id6744943538',
    // images come from https://mockuphone.com
    images: [brewscout1, brewscout2, brewscout3]
  },
  { 
    title: 'SaveSweida', 
    description: 'A full-stack web application that streamlines constituent communication with government officials across multiple jurisdictions to advocate for humanitarian relief in Sweida, Syria.',
    tags: ['Full-Stack', 'Web App', 'Social Impact'],
    link: 'https://www.savesweida.com',
    image: saveseweidaImage
  },
  { 
    title: 'Financial Analyzer', 
    description: 'A financial comparison tool that analyzes three investment strategies—buying to live, buying to rent, or investing in stocks—through dynamic visualizations and customizable parameters. The app provides net worth projections, break-even analysis, and monthly payment breakdowns to help users make data-driven investment decisions.',
    tags: ['React', 'Data Visualization', 'Finance'],
    link: 'https://financial-analyzer-lac.vercel.app',
    image: financialAnalyzerImage
  },
];


export default function Portfolio() {
  const accentColor = 'rgb(59, 130, 246)';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Simple Top Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-lg font-medium tracking-tight">Yazan Alatrach</a>
          <div className="flex gap-8 text-sm">
            <button onClick={() => scrollToSection('projects')} className="hover:opacity-60 transition">Projects</button>
            <button onClick={() => scrollToSection('about')} className="hover:opacity-60 transition">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:opacity-60 transition">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Very Spacious */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
            Yazan Alatrach
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            A creative professional interested in building 
            beautiful digital experiences
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <a href="https://www.linkedin.com/in/yazan-alatrach-98001b118/" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 transition">
              <Linkedin size={22} strokeWidth={1.5} />
            </a>
            <a href="https://github.com/yaz231" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 transition">
              <Github size={22} strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com/yazzz231" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 transition">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-20 text-center tracking-tight">Projects</h2>
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div key={index} className="space-y-4">
                {/* Title first */}
                <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
                
                {/* Non-clickable image */}
                <div className={`${project.images ? 'aspect-[16/10]' : 'aspect-video'} bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden`}>
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
                        <span key={i} className="text-xs tracking-wide px-3 py-1 rounded-full" 
                          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">About</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              I'm a creative professional passionate about crafting thoughtful digital experiences. 
              My work sits at the intersection of design and technology, always focused on solving 
              real problems for real people.
            </p>
            <p>
              With a background in Data Engineering, I've had the opportunity to work on diverse projects 
              ranging from web applications to interactive experiences. I believe in the power of 
              simple, elegant solutions.
            </p>
            <p>
              When I'm not designing or coding, you can find me exploring new technologies, 
              contributing to open source, or seeking inspiration in everyday moments.
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
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">The University of Texas at Austin</p>
                  <p className="text-gray-600">Bachelor of Science in Electrical & Computer Engineering</p>
                </div>
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
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>Building data infrastructure that powers financial reporting and energy trading operations across international markets</li>
              <li>Transforming raw data into reliable insights that help teams make critical business decisions in real-time</li>
              <li>Optimizing systems to run 80% faster through improved architecture and code refactoring</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Python', 'SQL', 'dbt', 'AWS', 'Airflow'].map((tech, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 cursor-default">
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
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>Designed and maintained data systems giving finance and operations teams instant access to key business metrics</li>
              <li>Streamlined complex queries to deliver insights 2x faster</li>
              <li>Enabled better decision-making through intuitive dashboards and reports</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {['SQL', 'Snowflake', 'Airflow', 'Tableau', 'Python'].map((tech, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Cisco */}
          <div className="space-y-3">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <p className="font-medium">Software Engineer</p>
                <p className="text-gray-600">Cisco Systems</p>
              </div>
              <p className="text-sm text-gray-500">Jul 2019 - Aug 2021</p>
            </div>
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>Automated testing and deployment processes, reducing testing time from 15 hours to 2 hours</li>
              <li>Scaled infrastructure to support millions of remote workers during the COVID-19 pandemic</li>
              <li>Ensured reliable video calling experiences for Webex communication products</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Python', 'Jenkins', 'Bash', 'VoIP', 'Webex'].map((tech, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Get in touch</h2>
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
            
            <button
              type='submit'
              className="w-full md:w-auto px-12 py-4 text-white text-sm tracking-wide hover:scale-105 transition-all duration-300 mt-8 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: accentColor }}
            >
              Send Message
            </button>
            
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
               className="text-sm text-gray-500 hover:text-gray-900 transition">LinkedIn</a>
            <a href="https://github.com/yaz231" target="_blank" rel="noopener noreferrer" 
               className="text-sm text-gray-500 hover:text-gray-900 transition">GitHub</a>
            <a href="https://www.instagram.com/yazzz231/" target="_blank" rel="noopener noreferrer" 
               className="text-sm text-gray-500 hover:text-gray-900 transition">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}