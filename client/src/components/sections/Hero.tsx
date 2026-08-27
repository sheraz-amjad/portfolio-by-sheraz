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
import { TechNetworkScene } from '../3d/TechNetworkScene';
import { PersonalInfo } from '../../types';

interface HeroProps {
  profile: PersonalInfo;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

const ROLES = [
  'DevOps Engineer',
  'Flutter Mobile Developer',
  'Full Stack MERN Engineer',
  'Linux Security & Cloud Specialist'
];

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, onOpenResume }) => {
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
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card/90 border border-cyber-cyan/30 backdrop-blur-md shadow-lg shadow-cyber-cyan/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green" />
              </span>
              <span className="text-xs font-mono text-slate-200">
                Available for DevOps & Mobile Projects
              </span>
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

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-3 rounded-xl glass-card border border-cyber-border text-slate-300 hover:text-white hover:border-slate-500 text-sm font-mono transition-all"
                title="Download / View Resume"
              >
                <FileDown size={15} className="text-cyber-cyan" />
                <span>CV</span>
              </button>
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
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-purple">MERN + Flutter</div>
                <div className="text-[11px] text-slate-400 font-sans leading-tight mt-0.5">End-to-End Stack Mastery</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Scene (6 cols) */}
          <div className="lg:col-span-6 relative w-full">
            <TechNetworkScene />
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
