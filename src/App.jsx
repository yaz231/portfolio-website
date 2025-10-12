import React, { useState } from 'react';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setFormStatus('Thanks for reaching out! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    }
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
            <button onClick={() => scrollToSection('work')} className="hover:opacity-60 transition">Work</button>
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

      {/* Work Section */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-20 text-center tracking-tight">Selected Work</h2>
          <div className="space-y-24">
            {[
              { 
                title: 'BrewScout', 
                description: 'A native iOS app that helps coffee enthusiasts discover and review local coffee shops with detailed insights beyond what traditional map apps offer. Users can search for coffee shops based on specific amenities (WiFi, seating, outlets, vibes) and contribute community-driven reviews with granular attribute ratings.',
                tags: ['iOS', 'Swift', 'Mobile App'],
                link: 'https://apps.apple.com/us/app/brewscout-coffee/id6744943538' 
              },
              { 
                title: 'SaveSweida', 
                description: 'A full-stack web application that streamlines constituent communication with government officials across multiple jurisdictions to advocate for humanitarian relief in Sweida, Syria.',
                tags: ['Full-Stack', 'Web App', 'Social Impact'],
                link: 'https://www.savesweida.com' 
              },
              { 
                title: 'Financial Analyzer', 
                description: 'A financial comparison tool that analyzes three investment strategies—buying to live, buying to rent, or investing in stocks—through dynamic visualizations and customizable parameters. The app provides net worth projections, break-even analysis, and monthly payment breakdowns to help users make data-driven investment decisions.',
                tags: ['React', 'Data Visualization', 'Finance'],
                link: 'https://financial-analyzer-lac.vercel.app' 
              },
            ].map((project, index) => (
              <div key={index} className="group">
                <a href={project.link} target="_blank" rel="noopener noreferrer" 
                   className="block space-y-4 hover:opacity-60 transition-opacity duration-300">
                  <div className="aspect-video bg-gray-100 rounded-sm overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      [Project Image]
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light tracking-tight">{project.title}</h3>
                      <p className="text-gray-600 max-w-xl">{project.description}</p>
                      <div className="flex gap-3 pt-1">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-gray-500 tracking-wide">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={20} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </div>
                </a>
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
              With a background in [your field], I've had the opportunity to work on diverse projects 
              ranging from web applications to interactive experiences. I believe in the power of 
              simple, elegant solutions.
            </p>
            <p>
              When I'm not designing or coding, you can find me exploring new technologies, 
              contributing to open source, or seeking inspiration in everyday moments.
            </p>
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
          
          <div className="space-y-6 pt-8">
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
              onClick={handleSubmit}
              className="w-full md:w-auto px-12 py-4 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors mt-8"
            >
              Send Message
            </button>
            
            {formStatus && (
              <p className="text-center text-green-600 text-sm pt-4">{formStatus}</p>
            )}
          </div>
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