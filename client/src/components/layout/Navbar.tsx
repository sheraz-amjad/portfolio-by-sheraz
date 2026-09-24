import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, Linkedin, Send } from 'lucide-react';

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
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
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
          className={`max-w-6xl mx-auto mt-3 flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0a0e1a]/92 backdrop-blur-xl border border-[#f59e0b]/25 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'bg-[#0a0e1a]/75 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => handleClick('hero')}
            className="font-display font-extrabold text-[#f59e0b] text-base tracking-widest hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            SYED SHERAZ AMJAD
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-[#f59e0b] bg-[#f59e0b]/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/syed-sheraz-amjad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Syed_Sheraz_Amjad_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-[#f59e0b] text-[#0a0e1a] font-mono font-bold text-xs hover:bg-[#fbbf24] transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] whitespace-nowrap"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed top-[72px] left-3 right-3 z-40 bg-[#0a0e1a]/98 border border-[#f59e0b]/20 rounded-2xl p-5 flex flex-col gap-1 shadow-2xl backdrop-blur-xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeSection === link.id
                  ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-white/8 my-1" />
          <a
            href="/resume.pdf"
            download="Syed_Sheraz_Amjad_Resume.pdf"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-[#0a0e1a] bg-[#f59e0b]"
          >
            <FileText size={16} />
            Download Resume
          </a>
        </div>
      )}
    </>
  );
};
