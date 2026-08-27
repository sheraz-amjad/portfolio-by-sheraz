import React, { useState } from 'react';
import {
  Cpu,
  Github,
  ExternalLink,
  Cloud,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Layers,
  CheckCircle2,
  X,
  Code2,
  Server
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  projects: ProjectItem[];
}

const CATEGORIES = [
  'All',
  'DevOps & Cloud',
  'Security & Automation',
  'Mobile (Flutter)',
  'Full Stack (MERN)'
];

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory || (selectedCategory === 'Full Stack (MERN)' && p.technologies.includes('React.js')));

  const getProjectIcon = (cat: string) => {
    switch (cat) {
      case 'DevOps & Cloud':
        return Cloud;
      case 'Security & Automation':
        return ShieldCheck;
      case 'Mobile (Flutter)':
        return Smartphone;
      default:
        return Cpu;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Layers size={13} />
            <span>PORTFOLIO SHOWCASE // PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Engineered Systems & <br />
            <span className="cyber-gradient-text">Production Deployments</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            From automated zero-downtime AWS infrastructure to cross-platform Flutter applications.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] font-bold'
                  : 'bg-cyber-card/60 border border-cyber-border text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const Icon = getProjectIcon(project.category);

            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl border border-cyber-border/80 p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent Top Border Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-green to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Top row: Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-cyber-card border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-cyber-green block">
                          {project.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-[10px] font-mono text-slate-300">
                          {project.architectureBadge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-cyber-card border border-cyber-border text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                        title="View Source on GitHub"
                      >
                        <Github size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyber-cyan/90 mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2">
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 size={13} className="text-cyber-green mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Tech Tags & Deep Dive Button */}
                <div className="pt-6 mt-6 border-t border-cyber-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-border text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-cyber-card text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-cyber-cyan hover:text-white flex items-center gap-1 self-end sm:self-auto"
                  >
                    <span>Architecture Details</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl glass-card bg-cyber-bg/95 border border-cyber-cyan/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-cyber-border pb-4">
                <div>
                  <span className="text-xs font-mono text-cyber-cyan">
                    {activeModalProject.category} · {activeModalProject.architectureBadge}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p className="leading-relaxed">{activeModalProject.description}</p>

                <div className="space-y-2">
                  <h5 className="text-xs font-mono text-cyber-green uppercase tracking-wider">
                    Detailed Architectural Highlights:
                  </h5>
                  <ul className="space-y-2">
                    {activeModalProject.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-cyber-green mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Complete Stack:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-cyber-card border border-cyber-border text-xs font-mono text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-card border border-cyber-cyan/40 text-xs font-mono text-white hover:bg-cyber-cyan hover:text-black transition-all"
                >
                  <Github size={15} />
                  <span>View Repository</span>
                </a>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl bg-cyber-card border border-cyber-border text-xs font-mono text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
