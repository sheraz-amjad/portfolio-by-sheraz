import React, { useState, useEffect } from 'react';
import {
  Terminal,
  ArrowRight,
  Send,
  FileDown,
  Cloud,
  Container,
  Workflow,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PersonalInfo } from '../../types';

interface HeroProps {
  profile: PersonalInfo;
  onNavigate: (sectionId: string) => void;
}

const ROLES = [
  'DevOps Engineer',
  'Flutter Mobile Developer',
  'Linux Security & Cloud Specialist'
];

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 lg:pt-36 flex flex-col justify-center overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Profile Picture & Status Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-full p-1 bg-gradient-to-tr from-cyber-cyan to-cyber-green">
                <img 
                  src="/profile-pic.png" 
                  alt="Syed Sheraz Amjad - DevOps Engineer"
                  className="w-full h-full object-cover rounded-full border-2 border-[#050811]"
                />
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card/90 border border-cyber-cyan/30 backdrop-blur-md shadow-lg shadow-cyber-cyan/5 h-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green" />
                </span>
                <span className="text-xs font-mono text-slate-200">
                  Available for DevOps & Mobile Projects
                </span>
              </div>
            </div>

            {/* Name and Titles */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-none">
                Syed Sheraz <br />
                <span className="cyber-gradient-text">Amjad</span>
              </h1>

              {/* Dynamic Role Switcher */}
              <div className="h-10 flex items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyber-surface/90 border border-cyber-cyan/40 text-cyber-cyan font-mono text-sm sm:text-base font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <Terminal size={16} className="text-cyber-green animate-pulse" />
                  <span className="transition-all duration-300">
                    {ROLES[roleIndex]}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl leading-relaxed">
              {profile.tagline}. Specialized in AWS cloud automation, Docker multi-stage pipelines, Flutter mobile experiences, and hardened Linux infrastructure.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan via-teal-400 to-cyber-green text-black font-bold text-sm hover:opacity-95 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-cyber-border text-slate-200 hover:border-cyber-cyan/50 hover:text-cyber-cyan text-sm font-semibold transition-all hover:scale-105"
              >
                <Send size={15} />
                <span>Contact Me</span>
              </button>

              <a
                href="/resume.pdf"
                download="Syed_Sheraz_Amjad_Resume.pdf"
                className="flex items-center gap-2 px-4 py-3 rounded-xl glass-card border border-cyber-border text-slate-300 hover:text-white hover:border-slate-500 text-sm font-mono transition-all hover:scale-105"
                title="Download / View Resume"
              >
                <FileDown size={15} className="text-cyber-cyan" />
                <span>CV</span>
              </a>
            </div>

            {/* Quick Metrics / Key Strengths Row */}
            <div className="pt-6 border-t border-cyber-border/80 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/60">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-cyan">~3 min</div>
                <div className="text-[11px] text-slate-400 font-sans leading-tight mt-0.5">CI/CD Build Speedup (Ebryx)</div>
              </div>

              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/60">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-green">100%</div>
                <div className="text-[11px] text-slate-400 font-sans leading-tight mt-0.5">Server Migration Success (Zemotify)</div>
              </div>

              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/60">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-purple">AZ-400</div>
                <div className="text-[11px] text-slate-400 font-sans leading-tight mt-0.5">Microsoft DevOps Expert Certified</div>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Terminal View (6 cols) */}
          <div className="lg:col-span-6 relative w-full mt-10 lg:mt-0">
            <div className="rounded-2xl terminal-window border border-cyber-border overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-cyber-cyan/10">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#050811] border-b border-cyber-border text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-slate-300 font-mono">deploy.yml — GitHub Actions</span>
                </div>
                <span className="text-[10px] text-cyber-cyan">Running</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 bg-[#080d1a] leading-relaxed">
                <div className="text-slate-400">name: <span className="text-cyber-green">Production Deploy Pipeline</span></div>
                <div className="text-slate-400">on:</div>
                <div className="text-slate-400 pl-4">push:</div>
                <div className="text-slate-400 pl-8">branches: <span className="text-cyber-cyan">["main"]</span></div>
                <br/>
                <div className="text-slate-400">jobs:</div>
                <div className="text-slate-400 pl-4">build-and-deploy:</div>
                <div className="text-slate-400 pl-8">runs-on: <span className="text-cyber-cyan">ubuntu-latest</span></div>
                <div className="text-slate-400 pl-8">steps:</div>
                <div className="pl-12 flex items-center gap-2">
                  <span className="text-slate-400">- name: Checkout code</span>
                  <CheckCircle2 size={12} className="text-cyber-green" />
                </div>
                <div className="pl-12 flex items-center gap-2">
                  <span className="text-slate-400">- name: Build Docker image</span>
                  <CheckCircle2 size={12} className="text-cyber-green" />
                </div>
                <div className="pl-12 flex items-center gap-2">
                  <span className="text-slate-400">- name: Push to ECR</span>
                  <CheckCircle2 size={12} className="text-cyber-green" />
                </div>
                <div className="pl-12 flex items-center gap-2 animate-pulse">
                  <span className="text-cyber-cyan">- name: Deploy to Kubernetes...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => onNavigate('about')}
            className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyber-cyan transition-colors group"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={18} className="animate-bounce text-cyber-cyan" />
          </button>
        </div>
      </div>
    </section>
  );
};
