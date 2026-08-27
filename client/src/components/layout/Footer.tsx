import React from 'react';
import {
  Terminal,
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUp,
  Server,
  Heart,
  Cpu,
  Layers
} from 'lucide-react';
import { PersonalInfo } from '../../types';

interface FooterProps {
  profile: PersonalInfo;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyber-border bg-cyber-bg/95 pt-14 pb-10 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cyber-border/70">
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-cyber-card border border-cyber-cyan/40 flex items-center justify-center">
                <Terminal size={18} className="text-cyber-cyan" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Syed Sheraz <span className="text-cyber-cyan">Amjad</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              DevOps Engineer & Flutter Mobile Developer specializing in AWS infrastructure, Docker containerization, automated GitHub Actions CI/CD pipelines, MERN full-stack development, and Linux incident response.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                title="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                title="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={profile.links.email}
                className="w-9 h-9 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-center text-slate-300 hover:text-cyber-green hover:border-cyber-green transition-all"
                title="Email Me"
              >
                <Mail size={17} />
              </a>
              <a
                href={profile.links.phone}
                className="w-9 h-9 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-center text-slate-300 hover:text-cyber-green hover:border-cyber-green transition-all"
                title="Call Phone"
              >
                <Phone size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-cyan mb-4 flex items-center gap-1.5">
              <Server size={13} />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              {['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Architecture & Tech Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-green mb-4 flex items-center gap-1.5">
              <Cpu size={13} />
              <span>Stack & Deployment</span>
            </h4>
            <ul className="space-y-1.5 text-xs font-mono text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                Frontend: React + Vite + Three.js
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                Backend: Node.js + Express API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald" />
                Database: MongoDB (Mongoose)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple" />
                Deploy: AWS EC2 + PM2 + Nginx
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue" />
                Location: Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Syed Sheraz Amjad. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart size={13} className="text-red-500 fill-red-500 inline" /> & Antigravity IDE
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
