import React, { useState } from 'react';
import {
  Code,
  Cloud,
  Container,
  Workflow,
  Terminal,
  Shield,
  Database,
  Server,
  Smartphone,
  Flame,
  GitBranch,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { SkillItem } from '../../types';

interface SkillsProps {
  skills: SkillItem[];
}

const CATEGORY_TABS = [
  'All',
  'DevOps & Cloud',
  'Full Stack (MERN)',
  'Mobile Dev',
  'Firebase',
  'Tools & Practices'
];

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredSkills = activeTab === 'All'
    ? skills
    : skills.filter((s) => s.category === activeTab);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'DevOps & Cloud':
        return '#00f0ff';
      case 'Full Stack (MERN)':
        return '#10b981';
      case 'Mobile Dev':
        return '#38bdf8';
      case 'Firebase':
        return '#f59e0b';
      case 'Tools & Practices':
        return '#a855f7';
      default:
        return '#00f0ff';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-cyber-bg/70">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Cpu size={13} />
            <span>TECHNICAL PROFICIENCIES // STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Comprehensive Skills & <br />
            <span className="cyber-gradient-text">Tooling Matrix</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Specialized toolsets refined across cloud infrastructure, container registries, mobile frameworks, and modern full-stack workflows.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold'
                  : 'bg-cyber-card border border-cyber-border text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, idx) => {
            const color = getCategoryColor(skill.category);

            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl border border-cyber-border/80 p-5 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono border"
                      style={{
                        backgroundColor: `${color}15`,
                        borderColor: `${color}40`,
                        color: color
                      }}
                    >
                      {skill.category}
                    </span>

                    {skill.featuredIn3D && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-cyber-cyan">
                        <Sparkles size={11} className="animate-spin-slow" />
                        3D Scene Node
                      </span>
                    )}
                  </div>

                  {/* Skill Name */}
                  <h4 className="text-base font-bold text-white group-hover:text-cyber-cyan transition-colors mb-2">
                    {skill.name}
                  </h4>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-[10px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2 border-t border-cyber-border/50">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Proficiency</span>
                    <span className="text-white font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-cyber-bg overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
