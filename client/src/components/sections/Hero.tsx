import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronDown, FileDown, Linkedin, Github, Award, CheckCircle2 } from 'lucide-react';
import { PersonalInfo } from '../../types';

interface HeroProps {
  profile: PersonalInfo;
  onNavigate: (sectionId: string) => void;
}

const ROLES = [
  'Senior DevOps Engineer',
  'Microsoft Certified: AZ-400 Expert',
  'AWS & Azure Cloud Architect',
  'Kubernetes & Docker Specialist',
  'CI/CD & Terraform Engineer',
];

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((p) => (p + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/6 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-emerald-500/4 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0f1628]/95 border border-[#f59e0b]/40 font-mono text-xs text-slate-200 shadow-md">
              <span className="relative flex w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-400" />
              </span>
              <span className="font-semibold text-emerald-400">Available</span>
              <span className="text-white/20">|</span>
              <span>DevOps &amp; Cloud Infrastructure</span>
            </div>

            {/* Main Title */}
            <h1
              className="font-display font-extrabold text-white leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
            >
              SYED SHERAZ<br />
              <span className="text-[#f59e0b]">AMJAD</span>
            </h1>

            {/* Role Switcher */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/40 font-mono text-xs sm:text-sm text-[#f59e0b] font-semibold">
              <Terminal size={15} className="animate-pulse flex-shrink-0" />
              <span className="transition-all duration-300">{ROLES[roleIndex]}</span>
            </div>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Senior DevOps Engineer &amp; <strong className="text-white font-semibold">Microsoft Certified DevOps Engineer Expert (AZ-400)</strong>.
              Automating zero-downtime CI/CD pipelines, containerizing production workloads with Docker &amp; Kubernetes, and architecting resilient AWS &amp; Azure cloud infrastructure using Terraform.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/resume.pdf"
                download="Syed_Sheraz_Amjad_DevOps_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f59e0b] text-[#0a0e1a] font-bold text-sm hover:bg-[#fbbf24] shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-0.5"
                title="Download Syed Sheraz Amjad DevOps CV (PDF)"
              >
                <FileDown size={17} />
                Download CV
              </a>
              <a
                href="https://github.com/sheraz-amjad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-slate-200 hover:border-[#f59e0b]/50 hover:text-[#f59e0b] font-semibold text-sm transition-all hover:-translate-y-0.5"
                title="View GitHub Repositories"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/syed-sheraz-amjad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-slate-200 hover:border-[#f59e0b]/50 hover:text-[#f59e0b] font-semibold text-sm transition-all hover:-translate-y-0.5"
                title="Connect on LinkedIn"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>

            {/* Responsive Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {[
                { value: '95%', label: 'CI/CD Deploy Speedup', sub: '10m → 30s' },
                { value: '0 Downtime', label: 'Server Migration Success', sub: '100% Zero-Loss' },
                { value: 'AZ-400', label: 'DevOps Engineer Expert', sub: 'Microsoft Certified' },
              ].map((m) => (
                <div key={m.label} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-mono font-bold text-xl text-[#f59e0b]">{m.value}</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5 leading-tight">{m.label}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Portrait Card with Modern Responsive WebP */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[28px] overflow-hidden border border-white/15 bg-[#14151e] shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(245,158,11,0.08)] hover:border-[#f59e0b] hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.2)] hover:-translate-y-1 transition-all duration-500 group">
              <picture>
                <source srcSet="/profile.webp" type="image/webp" media="(min-width: 640px)" />
                <source srcSet="/profile-sm.webp" type="image/webp" media="(max-width: 639px)" />
                <img
                  src="/profile.jpg"
                  alt={`${profile.name} - Microsoft Certified DevOps Engineer Expert (AZ-400)`}
                  width={380}
                  height={475}
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-[1.03] transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>

              {/* Subtle bottom gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(10, 11, 14, 0.9) 100%)' }}
              />

              {/* Floating tech badge at bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-[#0e111a]/90 backdrop-blur-md border border-white/15 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-white font-sans leading-tight">{profile.name}</div>
                    <div className="text-[11px] font-mono text-[#f59e0b] leading-tight">DevOps Engineer Expert</div>
                  </div>
                </div>
                <a
                  href="https://learn.microsoft.com/en-us/users/syedsherazamjad-7601/credentials/certification/devops-engineer?tab=credentials-tab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[10px] font-mono font-semibold text-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0a0e1a] transition-colors"
                  title="View Microsoft AZ-400 Credential"
                >
                  AZ-400 ↗
                </a>
              </div>
            </div>

            {/* Floating uptime pill */}
            <div className="absolute -bottom-3 -left-3 sm:-left-6 px-4 py-2 rounded-xl bg-[#0f1628]/95 border border-[#f59e0b]/30 font-mono text-xs text-emerald-400 shadow-2xl backdrop-blur-md hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-flex" />
              <span>✓ 99.9% Production SLA</span>
            </div>
          </div>
        </div>

        {/* Scroll down */}
        <div className="flex justify-center mt-14">
          <button
            onClick={() => onNavigate('about')}
            className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#f59e0b] transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="tracking-wider">SCROLL TO EXPLORE</span>
            <ChevronDown size={18} className="animate-bounce text-[#f59e0b]" />
          </button>
        </div>
      </div>
    </section>
  );
};

