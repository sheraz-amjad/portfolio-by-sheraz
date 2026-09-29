import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PersonalInfo } from '../../types';

interface FooterProps {
  profile: PersonalInfo;
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="border-t border-white/10" style={{ background: '#070b14' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">

        <div className="text-center sm:text-left">
          <span className="font-display font-extrabold text-[#f59e0b] text-base tracking-widest block">
            SYED SHERAZ AMJAD
          </span>
          <span className="block font-mono text-xs text-slate-300 mt-1">
            Senior DevOps Engineer (AZ-400 Expert) • Cloud &amp; CI/CD Architect
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {[
            { href: profile.links.github || 'https://github.com/sheraz-amjad', icon: Github, label: 'GitHub Profile' },
            { href: profile.links.linkedin, icon: Linkedin, label: 'LinkedIn Profile' },
            { href: profile.links.email, icon: Mail, label: 'Email Contact' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-200 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 hover:bg-white/10 transition-all min-w-[40px] min-h-[40px]"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              title={label}
              aria-label={label}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-center sm:text-right">
          <span className="font-mono text-xs text-slate-300">
            © {new Date().getFullYear()} Syed Sheraz Amjad
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-300 hover:text-[#f59e0b] transition-colors p-2 rounded-lg hover:bg-white/5 min-h-[40px]"
            aria-label="Back to top of page"
          >
            Back to Top <ArrowUp size={13} className="text-[#f59e0b]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

