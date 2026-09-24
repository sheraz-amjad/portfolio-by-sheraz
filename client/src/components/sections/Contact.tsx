import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, FileDown, Copy, Check } from 'lucide-react';
import { PersonalInfo } from '../../types';

interface ContactProps {
  profile: PersonalInfo;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ profile, onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-scroll]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const copyText = (text: string, which: 'email' | 'phone') => {
    navigator.clipboard.writeText(text).then(() => {
      if (which === 'email') {
        setCopiedEmail(true);
        onShowToast('Email copied!');
        setTimeout(() => setCopiedEmail(false), 2500);
      } else {
        setCopiedPhone(true);
        onShowToast('Phone number copied!');
        setTimeout(() => setCopiedPhone(false), 2500);
      }
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#f59e0b]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div data-scroll="roll-3d" className="max-w-3xl mx-auto text-center">

          {/* Big Title */}
          <h2
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          >
            LET'S BUILD 🚀
          </h2>

          <p className="text-slate-500 text-base mb-10 max-w-lg mx-auto">
            Available for challenging DevOps roles, mobile app projects, and infrastructure optimization contracts.
          </p>

          {/* Copy Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => copyText(profile.email, 'email')}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-sm text-slate-300 transition-all hover:border-[#f59e0b]/40 hover:text-[#f59e0b] hover:bg-[#f59e0b]/6"
              style={{ background: 'rgba(15,20,40,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}
              title="Click to copy email"
            >
              <Mail size={17} className="text-[#f59e0b] flex-shrink-0" />
              <span>{profile.email}</span>
              {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-slate-600" />}
            </button>

            <button
              onClick={() => copyText(profile.phone, 'phone')}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-sm text-slate-300 transition-all hover:border-[#f59e0b]/40 hover:text-[#f59e0b] hover:bg-[#f59e0b]/6"
              style={{ background: 'rgba(15,20,40,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}
              title="Click to copy phone"
            >
              <Phone size={17} className="text-[#f59e0b] flex-shrink-0" />
              <span>{profile.phone}</span>
              {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-slate-600" />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#0a0e1a] transition-all hover:-translate-y-0.5"
              style={{ background: '#f59e0b', boxShadow: '0 0 24px rgba(245,158,11,0.35)' }}
            >
              <Mail size={17} />
              Email Me
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 transition-all hover:border-[#f59e0b]/50 hover:text-[#f59e0b] hover:-translate-y-0.5"
              style={{ border: '2px solid rgba(255,255,255,0.15)' }}
            >
              <Linkedin size={17} />
              LinkedIn
            </a>

            <a
              href="/resume.pdf"
              download="Syed_Sheraz_Amjad_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 transition-all hover:border-[#f59e0b]/50 hover:text-[#f59e0b] hover:-translate-y-0.5"
              style={{ border: '2px solid rgba(255,255,255,0.15)' }}
            >
              <FileDown size={17} />
              Download Resume
            </a>

            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 transition-all hover:border-[#f59e0b]/50 hover:text-[#f59e0b] hover:-translate-y-0.5"
                style={{ border: '2px solid rgba(255,255,255,0.15)' }}
              >
                <Github size={17} />
                GitHub
              </a>
            )}
          </div>

          {/* Status Pill */}
          <div
            className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-mono text-xs text-slate-400"
            style={{ background: 'rgba(15,20,40,0.85)', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            <span>Status: <strong className="text-emerald-400">Open to Opportunities</strong></span>
            <span className="text-white/15">|</span>
            <span>Location: <strong className="text-slate-300">Lahore, Pakistan</strong></span>
            <span className="text-white/15">|</span>
            <span>AZ-400: <strong className="text-[#f59e0b]">Certified</strong></span>
          </div>

        </div>
      </div>
    </section>
  );
};
