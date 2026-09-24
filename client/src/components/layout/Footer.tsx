import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PersonalInfo } from '../../types';

interface FooterProps {
  profile: PersonalInfo;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  return (
    <footer className="border-t border-white/6" style={{ background: '#0a0e1a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">

        <div>
          <span className="font-display font-extrabold text-[#f59e0b] text-base tracking-widest">
            SYED SHERAZ AMJAD
          </span>
          <span className="block font-mono text-xs text-slate-600 mt-0.5">
            DevOps Engineer • Flutter Mobile Developer
          </span>
        </div>

        <div className="flex items-center gap-2">
          {[
            { href: profile.links.github || '#', icon: Github, label: 'GitHub' },
            { href: profile.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: profile.links.email, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#f59e0b] transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              title={label}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-slate-600">© {new Date().getFullYear()} Syed Sheraz Amjad</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-[#f59e0b] transition-colors"
          >
            Back to Top <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};
