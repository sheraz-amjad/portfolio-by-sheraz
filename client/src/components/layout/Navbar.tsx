import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Menu,
  X,
  FileText,
  Send,
  Github,
  Linkedin,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'pipeline', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'pipeline', label: 'CI/CD Sim' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass-nav py-3 shadow-xl shadow-black/50'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-cyber-card border border-cyber-cyan/40 flex items-center justify-center shadow-lg group-hover:border-cyber-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
              <Terminal size={20} className="text-cyber-cyan group-hover:animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base text-white tracking-wide flex items-center gap-1">
                Syed Sheraz <span className="text-cyber-cyan">Amjad</span>
              </span>
              <span className="text-[10px] font-mono text-cyber-emerald flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
                DevOps · Flutter
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-cyber-border/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isActive
                      ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-cyber-card/80 border border-cyber-border hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all duration-200"
            >
              <FileText size={14} className="text-cyber-cyan" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-cyber-cyan to-cyber-green hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-200"
            >
              <Send size={13} />
              <span>Hire Me</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-cyber-border mt-3 px-6 py-6 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === link.id
                    ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-slate-300 hover:bg-white/5'
                  }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-cyber-border flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-mono text-slate-200 bg-cyber-card border border-cyber-border"
              >
                <FileText size={16} className="text-cyber-cyan" />
                <span>View CV / Resume</span>
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-cyber-cyan to-cyber-green"
              >
                <Send size={16} />
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
