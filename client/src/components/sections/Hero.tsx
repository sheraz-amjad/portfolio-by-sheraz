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
    <section id="hero" ref={sectionRef} className="relative flex items-center overflow-hidden pt-24 sm:pt-28 pb-4 sm:pb-6">
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

          {/* Right Column: Hero Portrait Circular Avatar with Modern DevOps Styling */}
          <div className="relative flex justify-center lg:justify-end my-4 lg:my-0">
            <div className="relative group">
              {/* Outer Glowing Cyber Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#f59e0b] via-amber-500/20 to-cyan-400/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Circular Avatar Container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full p-1 bg-gradient-to-tr from-[#f59e0b] via-amber-500/40 to-cyan-400/40 shadow-[0_0_35px_rgba(245,158,11,0.25)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#14151e] border-2 border-[#0a0e1a] relative">
                  <picture>
                    <source srcSet="/profile.webp" type="image/webp" media="(min-width: 640px)" />
                    <source srcSet="/profile-sm.webp" type="image/webp" media="(max-width: 639px)" />
                    <img
                      src="/profile.jpg"
                      alt={`${profile.name} - Microsoft Certified DevOps Engineer Expert (AZ-400)`}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>

                  {/* Subtle inner overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
                </div>
              </div>

              {/* Floating AZ-400 Credential Pill at bottom-right */}
              <div className="absolute -bottom-2 -right-1 sm:right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e111a]/95 backdrop-blur-md border border-[#f59e0b]/40 shadow-xl z-20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
                <a
                  href="https://learn.microsoft.com/en-us/users/syedsherazamjad-7601/credentials/certification/devops-engineer?tab=credentials-tab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-mono font-bold text-[#f59e0b] hover:text-white transition-colors whitespace-nowrap"
                  title="View Microsoft AZ-400 Credential"
                >
                  AZ-400 Expert ↗
                </a>
              </div>

              {/* Floating Uptime Badge at top-left */}
              <div className="absolute -top-2 -left-2 sm:left-0 px-2.5 py-1 rounded-full bg-[#0e111a]/95 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-400 shadow-xl hidden sm:flex items-center gap-1.5 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>99.9% SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => onNavigate('about')}
            className="flex flex-col items-center gap-1 text-xs font-mono text-slate-400 hover:text-[#f59e0b] transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="tracking-wider text-[11px]">EXPLORE</span>
            <ChevronDown size={16} className="animate-bounce text-[#f59e0b]" />
          </button>
        </div>
      </div>
    </section>
  );
};

