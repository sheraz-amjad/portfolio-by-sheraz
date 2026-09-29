import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Linkedin, Github } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'tech-stack', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'tech-stack', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Case Studies' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6">
        <nav
          className={`max-w-6xl mx-auto mt-3 flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0a0e1a]/95 backdrop-blur-xl border border-[#f59e0b]/30 shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
              : 'bg-[#0a0e1a]/80 backdrop-blur-md border border-white/10'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand */}
          <button
            onClick={() => handleClick('hero')}
            className="flex items-center gap-2 font-display font-extrabold text-[#f59e0b] text-sm sm:text-base tracking-widest hover:opacity-85 transition-opacity whitespace-nowrap focus:outline-none"
            aria-label="Syed Sheraz Amjad Home"
          >
            <span>SYED SHERAZ AMJAD</span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
              AZ-400
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 min-h-[44px] flex items-center ${
                  activeSection === link.id
                    ? 'text-[#f59e0b] bg-[#f59e0b]/15 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://github.com/sheraz-amjad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all min-w-[40px] min-h-[40px]"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/syed-sheraz-amjad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all min-w-[40px] min-h-[40px]"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Syed_Sheraz_Amjad_DevOps_CV.pdf"
              className="px-4 py-2.5 rounded-xl bg-[#f59e0b] text-[#0a0e1a] font-mono font-bold text-xs hover:bg-[#fbbf24] transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] whitespace-nowrap min-h-[40px] flex items-center gap-1.5"
              title="Download DevOps CV"
            >
              <FileDown size={14} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Toggle with 44px min target */}
          <button
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed top-[72px] left-3 right-3 z-40 bg-[#0a0e1a]/98 border border-[#f59e0b]/30 rounded-2xl p-5 flex flex-col gap-1.5 shadow-2xl backdrop-blur-xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px] flex items-center ${
                activeSection === link.id
                  ? 'bg-[#f59e0b]/15 text-[#f59e0b] font-bold'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex gap-2 mb-2">
            <a
              href="https://github.com/sheraz-amjad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-semibold text-slate-200 bg-white/5 border border-white/10 min-h-[44px]"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/syed-sheraz-amjad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-semibold text-slate-200 bg-white/5 border border-white/10 min-h-[44px]"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
          <a
            href="/resume.pdf"
            download="Syed_Sheraz_Amjad_DevOps_CV.pdf"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-[#0a0e1a] bg-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.3)] min-h-[44px]"
          >
            <FileDown size={16} />
            Download DevOps CV
          </a>
        </div>
      )}
    </>
  );
};

