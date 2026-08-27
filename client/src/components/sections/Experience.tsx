import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Terminal,
  Shield,
  Container,
  Smartphone,
  ChevronRight,
  Layers
} from 'lucide-react';
import { ExperienceItem } from '../../types';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const [selectedRole, setSelectedRole] = useState<number>(0);

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'DevOps':
        return Shield;
      case 'Full Stack':
        return Container;
      case 'Mobile':
        return Smartphone;
      default:
        return Briefcase;
    }
  };

  const getRoleColor = (roleType: string) => {
    switch (roleType) {
      case 'DevOps':
        return '#00f0ff';
      case 'Full Stack':
        return '#10b981';
      case 'Mobile':
        return '#38bdf8';
      default:
        return '#a855f7';
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-cyber-bg/50">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Briefcase size={13} />
            <span>CAREER TIMELINE // EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Professional Track Record & <br />
            <span className="cyber-gradient-text">Engineering Impact</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Hands-on expertise spanning server hardening, automated CI/CD containerization, and production Flutter mobile releases.
          </p>
        </div>

        {/* Desktop / Tablet Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Company Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {experiences.map((exp, idx) => {
              const isSelected = selectedRole === idx;
              const Icon = getRoleIcon(exp.roleType);
              const color = getRoleColor(exp.roleType);

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRole(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 text-left ${
                    isSelected
                      ? 'glass-card border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)] scale-[1.02]'
                      : 'glass-card border-cyber-border opacity-70 hover:opacity-100 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${color}15`,
                          borderColor: `${color}40`,
                          color: color
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{exp.company}</h4>
                        <p className="text-xs font-mono text-slate-400">{exp.title}</p>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        isSelected ? 'text-cyber-cyan translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>

                  <div className="mt-3 pt-3 border-t border-cyber-border/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-[10px] text-cyber-cyan">
                      {exp.roleType}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Experience Deep Dive Card (8 cols) */}
          <div className="lg:col-span-8">
            {(() => {
              const activeExp = experiences[selectedRole] || experiences[0];
              const Icon = getRoleIcon(activeExp.roleType);
              const color = getRoleColor(activeExp.roleType);

              return (
                <div className="glass-card rounded-2xl border border-cyber-cyan/30 p-6 sm:p-8 space-y-6 shadow-2xl relative">
                  {/* Glowing header bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyber-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold border"
                          style={{
                            backgroundColor: `${color}15`,
                            borderColor: `${color}50`,
                            color: color
                          }}
                        >
                          {activeExp.roleType}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <MapPin size={12} className="text-cyber-cyan" />
                          {activeExp.location}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                        {activeExp.title}{' '}
                        <span className="text-cyber-cyan">@ {activeExp.company}</span>
                      </h3>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-cyber-bg border border-cyber-border text-xs font-mono text-slate-300 flex items-center gap-2 self-start sm:self-auto">
                      <Calendar size={14} className="text-cyber-green" />
                      <span>{activeExp.period}</span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Terminal size={13} className="text-cyber-green" />
                      <span>Key Responsibilities & Deliverables</span>
                    </h5>
                    <div className="space-y-3">
                      {activeExp.description.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 group">
                          <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center">
                            <CheckCircle2 size={11} className="text-cyber-cyan" />
                          </span>
                          <p className="text-sm text-slate-300 leading-relaxed font-sans group-hover:text-white transition-colors">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Stack Tags */}
                  <div className="pt-4 border-t border-cyber-border">
                    <h5 className="text-xs font-mono text-slate-400 mb-2.5">
                      Environment & Technologies Applied:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-cyber-card border border-cyber-border text-xs font-mono text-slate-200 hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
