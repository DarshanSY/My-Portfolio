import { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import {
  CodeXml, Download, Menu, MapPin, Mail, Github, Linkedin, Code,
  Target, BookOpen, Trophy, GraduationCap, Calendar,
  Award, ExternalLink, Phone, Send, ChevronRight, X,
  ArrowUp, Sparkles, CheckCircle, AlertCircle
} from 'lucide-react';

// Scroll-reveal hook
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-reveal');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Make sure to replace these with your actual IDs from EmailJS
    emailjs.sendForm('service_hto3mqv', 'template_brpptrg', form.current, 'JzuPtiB0awRXtcCrd')
      .then((result) => {
        console.log(result.text);
        setSubmitStatus('success');
        setIsSubmitting(false);
        form.current?.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }, (error) => {
        console.log(error.text);
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      });
  };

  const aboutRef = useScrollReveal();
  const skillsRef = useScrollReveal();
  const projectsRef = useScrollReveal();
  const educationRef = useScrollReveal();
  const contactRef = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 rounded-b-3xl ${scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl shadow-lg shadow-blue-500/30">
              <CodeXml className="text-white w-5 h-5" />
            </div>
            <span>Darshan S Y</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">
                {item}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors text-sm shadow-sm hover:shadow-md">
              <Download size={16} />
              Resume
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600 hover:text-slate-900 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for Work
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Full Stack <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">Developer.</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              Hi, I'm <strong className="text-slate-900 font-semibold">Darshan S Y</strong>. I build professional, clean, and scalable web experiences. Passionate about architecture, modern UI, and solving complex problems.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 flex items-center gap-2">
                  Get In Touch <ChevronRight size={18} />
                </button>
              </a>
              <a href="#projects">
                <button className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 group">
                  View Projects <ChevronRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </button>
              </a>
            </div>

            <div className="flex items-center gap-6 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="text-slate-400" size={16} />
                <span>Bangalore, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-slate-400" size={16} />
                <a href="mailto:darshansy318@gmail.com" className="hover:text-blue-600 transition-colors">darshansy318@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <SocialLink href="https://github.com/DARSHANSY" icon={<Github size={20} />} />
              <SocialLink href="https://www.linkedin.com/in/darshan-s-y-59b892343/" icon={<Linkedin size={20} />} />
              <SocialLink href="https://leetcode.com/u/DarshanSY/" icon={<Code size={20} />} />
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-10"></div>
              <div className="absolute inset-0 bg-slate-900 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500 overflow-hidden shadow-xl">
                <img alt="Darshan S Y" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="/profilephoto.jpeg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

      {/* About Section */}
      <section id="about" className="py-24 bg-white border-y border-slate-100">
        <div ref={aboutRef} className="scroll-reveal">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="About Me" subtitle="A quick glimpse into my professional profile and focus." />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <StatsCard icon={<Code />} label="Role" value="Full Stack Dev" />
              <StatsCard icon={<Target />} label="Experience" value="Fresher" />
              <StatsCard icon={<BookOpen />} label="Education" value="MCA" />
              <StatsCard icon={<Trophy />} label="Projects" value="5+ Built" />
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Innovation</span></h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  I am passionate about building practical software that solves real-world problems and improves everyday life. Whether it’s writing clean, efficient code, optimizing system performance, or exploring new technologies, I’m always ready for a challenge.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  I’m seeking an environment where I can grow, contribute meaningfully, and collaborate with a team that values creativity and effective problem-solving.
                </p>
              </div>
              <div className="md:w-1/2">
                <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-900">
                  <Target className="text-blue-600" size={20} /> Professional Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability', 'Time Management', 'Critical Thinking'].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-50">
        <div ref={skillsRef} className="scroll-reveal">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Technical Arsenal" subtitle="Tools and technologies I use to build robust applications." />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SkillCategory title="Frontend" skills={['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Redux']} />
              <SkillCategory title="Backend" skills={['Java', 'C', 'Python', 'Spring Boot', 'REST APIs', 'Node.js', 'Express']} />
              <SkillCategory title="Database" skills={['SQL', 'MySQL', 'MongoDB', 'PostgreSQL']} />
              <SkillCategory title="Tools" skills={['Eclipse IDE', 'NetBeans', 'VS Code', 'Git', 'GitHub', 'Postman']} />
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white border-y border-slate-100">
        <div ref={projectsRef} className="scroll-reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <SectionHeader title="Featured Projects" subtitle="Selected work demonstrating my technical capabilities." className="mb-0" />
              <a href="https://github.com/DARSHANSY" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 group">
                View Github <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                image="/zepto_sentiment.png"
                tag="AI/ML"
                title="Zepto Sentiment Analysis System"
                link="https://github.com/DarshanSY/Zepto-Sentiment-Analysis-System"
                desc="Machine learning-based application designed to analyze customer reviews and determine their sentiment."
                techs={['FastAPI', 'Streamlit', 'Transformers', 'Docker']}
              />
              <ProjectCard
                image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                tag="Platform"
                title="Stay-On-Track Platform"
                link="https://github.com/DarshanSY/Stay-On-Track"
                desc="AI-driven full-stack educational platform. Uses predictive analytics and XAI to detect dropout risks."
                techs={['Next.js', 'Flask', 'Scikit-Learn', 'CatBoost']}
              />
              <ProjectCard
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                tag="Web App"
                title="Smart Water Usage Optimizer"
                link="https://github.com/DarshanSY/Smart-Water-Management-System"
                desc="An intelligent web platform for monitoring and optimizing water usage using predictive analytics and machine learning."
                techs={['React', 'Node.js', 'Python', 'Docker']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      {/* Education & Certs */}
      <section id="education" className="py-24 bg-slate-50">
        <div ref={educationRef} className="scroll-reveal">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <SectionHeader title="Education" subtitle="My academic timeline." />
              <div className="space-y-6 border-l-2 border-slate-200 pl-6 ml-3">
                <EducationItem
                  title="Masters of Computer Application"
                  school="CMR Institute of Technology"
                  date="2026 (Expected)"
                  desc="Currently pursuing MCA with a focus on advanced computing. Holding a CGPA of 8.57."
                />
                <EducationItem
                  title="Bachelor of Computer Application"
                  school="Vidya Vahini First Gread Collage"
                  date="2024"
                  desc="Graduated with 85.65 aggregate. Built a strong foundation in computer science."
                />
                <EducationItem
                  title="PUC (12th Science)"
                  school="Ekalvya Model Residential PU Collage"
                  date="2021"
                  desc="Science stream. 78.88% aggregate."
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <SectionHeader title="Certifications" subtitle="Continuous learning." />
              <div className="space-y-4">
                <CertCard
                  title="Java Certification"
                  org="Udemy"
                  link="https://www.udemy.com/certificate/UC-18ef0e00-37f7-4b02-99d8-8ef25b94d71c/"
                />
                <CertCard
                  title="Campus to Technical Careers"
                  org="TNS India Foundation"
                />
                <CertCard
                  title="160 Days of Problem Solving"
                  org="GeeksforGeeks"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white border-t border-slate-100">
        <div ref={contactRef} className="scroll-reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <SectionHeader title="Get In Touch" subtitle="Have a project in mind or want to say hi? I'd love to hear from you." className="mb-8" />

                <div className="space-y-6 mb-12">
                  <ContactInfo icon={<Mail />} title="Email" value="darshansy318@gmail.com" />
                  <ContactInfo icon={<Phone />} title="Phone" value="+91 8088940665" />
                  <ContactInfo icon={<MapPin />} title="Location" value="Bangalore, India" />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Professional Profiles</h4>
                  <div className="flex gap-3">
                    <SocialLink href="https://github.com/DARSHANSY" icon={<Github size={20} />} />
                    <SocialLink href="https://www.linkedin.com/in/darshan-s-y-59b892343/" icon={<Linkedin size={20} />} />
                    <SocialLink href="https://leetcode.com/u/DarshanSY/" icon={<Code size={20} />} />
                  </div>
                </div>
              </div>

              <form ref={form} className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl shadow-indigo-500/5" onSubmit={sendEmail}>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-indigo-600" size={20} />
                  <span className="text-sm font-semibold text-indigo-600">Let's build something great</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Name</label>
                    <input name="user_name" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400" placeholder="John Doe" required type="text" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input name="user_email" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400" placeholder="john@example.com" required type="email" />
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <input name="subject" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400" placeholder="Project Inquiry" required type="text" />
                </div>
                <div className="space-y-1.5 mb-6">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea name="message" className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all h-32 resize-none placeholder:text-slate-400" placeholder="How can I help you?" required></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                  ) : submitStatus === 'success' ? (
                    <span className="flex items-center gap-2"><CheckCircle size={18} /> Sent Successfully</span>
                  ) : submitStatus === 'error' ? (
                    <span className="flex items-center gap-2"><AlertCircle size={18} /> Error Sending</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send size={18} /> Send Message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-400 mb-2">© {new Date().getFullYear()} Darshan S Y. All rights reserved.</p>
          <p className="text-slate-500 text-sm">Designed & Built with professional excellence.</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-indigo-500/50 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

// Subcomponents

const SectionHeader = ({ title, subtitle, className = 'mb-12' }: any) => (
  <div className={className}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full"></div>
      <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">Section</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{title}</h2>
    <p className="text-slate-500 text-lg max-w-2xl">{subtitle}</p>
  </div>
);

const SocialLink = ({ href, icon }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors shadow-sm">
    {icon}
  </a>
);

const StatsCard = ({ icon, label, value }: any) => (
  <div className="group flex flex-col items-center justify-center text-center p-6 bg-white border border-slate-100/50 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 rounded-3xl transition-all duration-300 hover:-translate-y-1">
    <div className="text-indigo-600 mb-4 bg-indigo-50 p-4 rounded-2xl group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 rotate-3 group-hover:rotate-0">{icon}</div>
    <span className="text-slate-500 text-sm mb-1 font-medium">{label}</span>
    <span className="text-slate-900 font-extrabold text-2xl tracking-tight">{value}</span>
  </div>
);

const SkillCategory = ({ title, skills }: any) => (
  <div className="group bg-white p-6 border border-slate-100/50 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold group-hover:rotate-6 transition-transform">
        {title[0]}
      </div>
      <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill: string, i: number) => (
        <span key={skill} className="px-3 py-1.5 bg-slate-50/80 border border-slate-100 rounded-xl text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100 transition-colors" style={{ animationDelay: `${i * 50}ms` }}>{skill}</span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ image, tag, title, link, desc, techs }: any) => (
  <div className="bg-white border border-slate-100/50 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col hover:-translate-y-2">
    <div className="relative h-56 overflow-hidden bg-slate-100">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <img alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" src={image} />
      <span className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 rounded-xl text-xs font-bold shadow-lg z-20">{tag}</span>
    </div>
    <div className="p-8 flex flex-col flex-1 relative bg-white">
      <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg z-20 group-hover:-translate-y-1 transition-transform duration-300 text-indigo-600">
        <CodeXml size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {techs.map((tech: string) => (
          <span key={tech} className="px-3 py-1 bg-indigo-50/50 text-indigo-700 rounded-lg text-xs font-semibold">{tech}</span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/btn">
          Source Code <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>
        <a href={link} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
          <Github size={18} />
        </a>
      </div>
    </div>
  </div>
);

const EducationItem = ({ title, school, date, desc }: any) => (
  <div className="relative pb-8 last:pb-0">
    <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-white border-[3px] border-blue-600 rounded-full"></div>
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <span className="text-blue-600 font-medium text-sm flex items-center gap-1"><Calendar size={14} /> {date}</span>
    </div>
    <div className="text-slate-700 font-medium mb-2 flex items-center gap-1"><GraduationCap size={16} className="text-slate-400" /> {school}</div>
    <p className="text-slate-600 text-sm">{desc}</p>
  </div>
);

const CertCard = ({ title, org, link }: any) => (
  <div className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all flex items-start justify-between group">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Award size={20} />
      </div>
      <div>
        <h3 className="font-bold text-slate-900 text-sm mb-1">{title}</h3>
        <p className="text-slate-500 text-xs">{org}</p>
      </div>
    </div>
    {link && (
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 p-1">
        <ExternalLink size={16} />
      </a>
    )}
  </div>
);

const ContactInfo = ({ icon, title, value }: any) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-slate-900 font-semibold">{value}</p>
    </div>
  </div>
);

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current && dotRef.current && ringRef.current) {
        dotRef.current.style.opacity = '1';
        ringRef.current.style.opacity = '1';
        visible.current = true;
      }

      // Check if hovering interactive element
      const t = e.target as HTMLElement;
      hovering.current = !!(
        t.closest('a') || t.closest('button') || t.closest('input') || t.closest('textarea')
      );
    };

    const onLeave = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.opacity = '0';
        ringRef.current.style.opacity = '0';
        visible.current = false;
      }
    };

    const loop = () => {
      // Smooth follow for ring
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        const dotScale = hovering.current ? 0 : 1;
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = hovering.current ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${ringScale})`;
        ringRef.current.style.borderColor = hovering.current
          ? 'rgba(99,102,241,0.9)'
          : 'rgba(99,102,241,0.45)';
        ringRef.current.style.backgroundColor = hovering.current
          ? 'rgba(99,102,241,0.08)'
          : 'transparent';
      }

      rafId.current = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <div
        ref={dotRef}
        className="hidden lg:block fixed pointer-events-none z-[9999]"
        style={{
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          top: 0,
          left: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
          boxShadow: '0 0 12px rgba(99,102,241,0.5)',
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Ring — follows with delay */}
      <div
        ref={ringRef}
        className="hidden lg:block fixed pointer-events-none z-[9998]"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(99,102,241,0.45)',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default App;
