import React, { useState, useEffect, useRef } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  projects: ProjectItem[];
}

const FILTERS = [
  { label: 'All Projects', value: 'all' },
  { label: 'DevOps & Cloud', value: 'DevOps & Cloud' },
  { label: 'Security & Automation', value: 'Security & Automation' },
  { label: 'Mobile (Flutter)', value: 'Mobile (Flutter)' },
];

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-scroll]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const getBadgeColor = (category: string) => {
    if (category === 'DevOps & Cloud') return { text: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' };
    if (category === 'Mobile (Flutter)') return { text: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' };
    return { text: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)' };
  };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="py-28 relative"
        style={{ background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Bg glow */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/4 blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Header */}
          <div data-scroll="slide-left" className="mb-10">
            <h2
              className="font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              PROD READY.
            </h2>
            <p className="text-slate-500 text-sm mt-1.5 mb-5">
              Selected infrastructure, automation, and mobile engineering projects.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
                    activeFilter === f.value
                      ? 'bg-[#f59e0b]/15 border border-[#f59e0b]/50 text-[#f59e0b] font-semibold'
                      : 'bg-white/4 border border-white/8 text-slate-500 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project, idx) => {
              const badge = getBadgeColor(project.category);
              return (
                <div
                  key={idx}
                  data-scroll="roll-3d"
                  data-delay={`${((idx % 3) + 1) * 100}` as any}
                  className="flex flex-col p-6 rounded-2xl border border-white/8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-[#f59e0b]/30 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.12)] group"
                  style={{ background: 'rgba(15,20,40,0.7)' }}
                >
                  {/* Top border line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#f59e0b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Card Top */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-[0.68rem] font-semibold px-2.5 py-1 rounded-md"
                      style={{ color: badge.text, background: badge.bg, border: `1px solid ${badge.border}` }}
                    >
                      {project.featured ? 'Live Production' : 'Architecture'}
                    </span>
                    <span className="font-mono text-[0.68rem] text-slate-600">{project.architectureBadge}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-white text-[1.05rem] leading-snug mb-2 group-hover:text-[#f59e0b] transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[0.85rem] text-slate-400 leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.65rem] text-slate-500 rounded-md px-2 py-0.5"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-white/6 flex items-center justify-between">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-semibold text-[#f59e0b] hover:gap-2.5 transition-all tracking-wide"
                      >
                        VIEW PROJECT <span>↗</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => setModalProject(project)}
                        className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-semibold text-slate-500 hover:text-[#f59e0b] transition-colors tracking-wide"
                      >
                        VIEW DETAILS <span className="text-xs">↗</span>
                      </button>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-600 hover:text-[#f59e0b] transition-colors"
                      title="GitHub"
                    >
                      <Github size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && setModalProject(null)}
        >
          <div className="relative w-full max-w-2xl rounded-2xl p-7 space-y-5 shadow-2xl" style={{ background: '#0f1628', border: '1px solid rgba(245,158,11,0.35)' }}>
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>

            <div>
              <span className="font-mono text-[0.68rem] text-[#f59e0b]">{modalProject.category} · {modalProject.architectureBadge}</span>
              <h3 className="font-display font-bold text-white text-xl mt-1">{modalProject.title}</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{modalProject.description}</p>

            <div>
              <h5 className="font-mono text-[0.68rem] uppercase tracking-wider text-emerald-400 mb-2.5">Architectural Highlights:</h5>
              <ul className="space-y-2">
                {modalProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="text-[#f59e0b] flex-shrink-0 mt-0.5">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
              {modalProject.technologies.map((t) => (
                <span key={t} className="font-mono text-[0.68rem] text-slate-400 bg-white/5 border border-white/8 rounded-lg px-2.5 py-1">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={modalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-white font-semibold transition-all hover:bg-[#f59e0b] hover:text-[#0a0e1a]"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(245,158,11,0.3)' }}
              >
                <Github size={14} /> View Repository
              </a>
              <button
                onClick={() => setModalProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
