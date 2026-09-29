import React, { useState, useEffect, useRef } from 'react';
import { X, Github, ExternalLink, ShieldCheck, Workflow, Cloud, Smartphone, CheckCircle, ArrowRight, Gauge } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  projects: ProjectItem[];
}

const FILTERS = [
  { label: 'All Case Studies', value: 'all' },
  { label: 'CI/CD & Cloud Infrastructure', value: 'CI/CD & Cloud Infrastructure' },
  { label: 'Mobile & Cloud Integration', value: 'Mobile & Cloud Integration' },
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
    if (category.includes('CI/CD') || category.includes('DevOps')) {
      return { text: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)' };
    }
    return { text: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)' };
  };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="py-24 sm:py-28 relative"
        style={{
          background: 'rgba(255,255,255,0.012)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/4 blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Section Header */}
          <div data-scroll="slide-left" className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#f59e0b]">
                Real-World Engineering Case Studies
              </span>
            </div>

            <h2
              className="font-display font-extrabold text-white tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
            >
              PRODUCTION CASE STUDIES.
            </h2>
            <p className="text-slate-300 text-sm mt-2 mb-6 max-w-2xl leading-relaxed">
              Every system documented in the standard DevOps delivery format: <strong className="text-amber-400">Problem → Solution → Toolchain → Quantified Results</strong>.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
                    activeFilter === f.value
                      ? 'bg-[#f59e0b] text-[#0a0e1a] font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((project, idx) => {
              const badge = getBadgeColor(project.category);
              const cs = project.caseStudy;
              return (
                <div
                  key={idx}
                  data-scroll="roll-3d"
                  data-delay={`${((idx % 3) + 1) * 100}` as any}
                  className="flex flex-col p-6 sm:p-7 rounded-2xl border border-white/10 relative overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-[#f59e0b]/40 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.15)] group"
                  style={{ background: 'rgba(15, 20, 40, 0.75)' }}
                >
                  {/* Top accent glow line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#f59e0b] via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Card Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ color: badge.text, background: badge.bg, border: `1px solid ${badge.border}` }}
                    >
                      {project.featured ? 'Featured Case Study' : 'Engineering Architecture'}
                    </span>
                    <span className="font-mono text-[11px] text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded border border-white/8">
                      {project.architectureBadge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-white text-lg leading-snug mb-1 group-hover:text-[#f59e0b] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-amber-400/90 mb-3">
                    {project.tagline}
                  </p>

                  {/* Case Study Metrics Strip (if available) */}
                  {cs?.metrics && (
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 my-2 rounded-xl bg-white/[0.03] border border-white/8">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="font-mono font-bold text-sm text-[#f59e0b]">{m.value}</div>
                          <div className="text-[10px] text-slate-300 leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Problem & Solution Mini Preview */}
                  {cs ? (
                    <div className="space-y-2 my-3 text-xs leading-relaxed flex-1">
                      <div className="p-2.5 rounded-lg bg-red-500/[0.06] border border-red-500/20">
                        <strong className="text-red-300 font-mono text-[10px] uppercase block mb-0.5">Problem:</strong>
                        <p className="text-slate-300 line-clamp-2">{cs.problem}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20">
                        <strong className="text-emerald-300 font-mono text-[10px] uppercase block mb-0.5">Solution:</strong>
                        <p className="text-slate-300 line-clamp-2">{cs.solution}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed flex-1 mb-4">
                      {project.description}
                    </p>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4 pt-2">
                    {project.technologies.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-slate-300 rounded px-2 py-0.5"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="font-mono text-[10px] text-slate-400 px-1.5 py-0.5">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                    <button
                      onClick={() => setModalProject(project)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#f59e0b] hover:gap-2.5 transition-all tracking-wide py-2"
                    >
                      READ CASE STUDY <ArrowRight size={13} />
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-300 hover:text-[#f59e0b] hover:bg-white/5 transition-colors"
                      title="View GitHub Repository"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <Github size={17} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Detailed Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-study-title"
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            style={{ background: '#0e1424', border: '1px solid rgba(245,158,11,0.4)' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close case study details"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div>
              <span className="font-mono text-xs text-[#f59e0b] font-semibold tracking-wider uppercase">
                {modalProject.category} · {modalProject.architectureBadge}
              </span>
              <h3 id="modal-case-study-title" className="font-display font-bold text-white text-xl sm:text-2xl mt-1.5">
                {modalProject.title}
              </h3>
              <p className="font-mono text-xs text-amber-400/90 mt-1">
                {modalProject.tagline}
              </p>
            </div>

            {/* Metrics Callout */}
            {modalProject.caseStudy?.metrics && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                {modalProject.caseStudy.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono font-bold text-lg text-[#f59e0b]">{m.value}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Case Study Structured Sections: Problem -> Solution -> Tools -> Result */}
            {modalProject.caseStudy ? (
              <div className="space-y-4 text-xs sm:text-sm">
                {/* 1. Problem */}
                <div className="p-4 rounded-xl bg-red-500/[0.07] border border-red-500/25">
                  <h4 className="font-mono text-xs uppercase font-bold text-red-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>🔴</span> Production Problem &amp; Challenge
                  </h4>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {modalProject.caseStudy.problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div className="p-4 rounded-xl bg-amber-500/[0.07] border border-amber-500/25">
                  <h4 className="font-mono text-xs uppercase font-bold text-amber-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>⚡</span> DevOps Architectural Solution
                  </h4>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {modalProject.caseStudy.solution}
                  </p>
                </div>

                {/* 3. Result */}
                <div className="p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/25">
                  <h4 className="font-mono text-xs uppercase font-bold text-emerald-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>✅</span> Measurable Results &amp; Impact
                  </h4>
                  <p className="text-slate-200 leading-relaxed font-sans">
                    {modalProject.caseStudy.result}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-200 leading-relaxed">{modalProject.description}</p>
            )}

            {/* Highlights */}
            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 mb-2.5 font-bold">
                Technical Highlights &amp; Execution:
              </h5>
              <ul className="space-y-2">
                {modalProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="text-[#f59e0b] flex-shrink-0 mt-0.5 font-mono">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-[11px] text-slate-400 block mb-2">Toolchain &amp; Infrastructure:</span>
              <div className="flex flex-wrap gap-2">
                {modalProject.technologies.map((t) => (
                  <span key={t} className="font-mono text-xs text-slate-300 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href={modalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-slate-900 font-bold transition-all bg-[#f59e0b] hover:bg-[#fbbf24] shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <Github size={15} /> View Repository
              </a>
              <button
                onClick={() => setModalProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10 hover:bg-white/10"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

