import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLElement>(null);

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

  const dotColor: Record<string, string> = {
    DevOps: '#f59e0b',
    Mobile: '#10b981',
    Intern: '#38bdf8',
  };

  const getDotColor = (roleType: string) => dotColor[roleType] || '#f59e0b';

  return (
    <section id="experience" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Bg glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/4 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 items-start">

          {/* Left: Huge Title */}
          <div data-scroll="slide-left" className="lg:sticky lg:top-32">
            <h2
              className="font-display font-extrabold text-white leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', letterSpacing: '-0.03em', writingMode: 'horizontal-tb' }}
            >
              EXPERIENCE
            </h2>
          </div>

          {/* Right: Timeline */}
          <div className="flex flex-col gap-5">

            {/* Work Experiences */}
            {experiences.map((exp, idx) => {
              const dotC = getDotColor(exp.roleType);
              return (
                <div key={idx} className="flex gap-5" data-scroll="slide-right" data-delay={`${(idx + 1) * 100}` as any}>
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ background: dotC, boxShadow: `0 0 10px ${dotC}` }}
                    />
                    {idx < experiences.length - 1 && (
                      <div
                        className="w-0.5 flex-1 mt-2 min-h-[30px]"
                        style={{ background: `linear-gradient(to bottom, ${dotC}50, transparent)` }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 p-6 rounded-2xl border border-white/8 mb-2 transition-all hover:border-[#f59e0b]/30"
                    style={{ background: 'rgba(15,20,40,0.65)' }}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display font-bold text-white text-lg">
                          {exp.title}{' '}
                          <span style={{ color: dotC }}>@ {exp.company}</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>
                      </div>
                      <span className="font-mono text-[0.68rem] text-slate-500 bg-white/4 border border-white/8 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Achievements */}
                    <h4 className="font-mono text-[0.65rem] font-semibold tracking-[0.08em] text-[#f59e0b] uppercase mb-2.5">Key achievements:</h4>
                    <ul className="space-y-2">
                      {exp.description.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[0.875rem] text-slate-400 leading-relaxed">
                          <span className="text-[#f59e0b] flex-shrink-0 mt-0.5 text-xs">▸</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>

                    {/* Tech Tags & Download */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/6">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[0.65rem] text-slate-500 bg-white/4 border border-white/7 rounded-md px-2 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href="/syed_sheraz_experience_letter.pdf"
                        download="Syed_Sheraz_Amjad_Experience_Letter.pdf"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400 hover:text-amber-300 bg-amber-400/10 border border-amber-400/20 hover:border-amber-400/40 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Experience Letter
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Education Card */}
            <div className="flex gap-5" data-scroll="slide-right" data-delay="300">
              <div className="flex flex-col items-center pt-1 flex-shrink-0">
                <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 bg-[#38bdf8]" style={{ boxShadow: '0 0 10px #38bdf8' }} />
              </div>

              <div
                className="flex-1 p-6 rounded-2xl border border-white/8 transition-all hover:border-[#38bdf8]/30"
                style={{ background: 'rgba(15,20,40,0.65)' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">Bachelor of Science in Computer Science</h3>
                    <p className="text-[0.85rem] text-slate-400 mt-0.5">National University of Modern Languages (NUML), Lahore</p>
                  </div>
                  <span className="font-mono text-[0.68rem] text-slate-500 bg-white/4 border border-white/8 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                    Oct 2021 – Sep 2025
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap mt-3">
                  <span className="font-mono text-[0.7rem] text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-lg px-2.5 py-1">
                    Intermediate (F.Sc Pre-Engineering) · Punjab College, Lahore (2021)
                  </span>
                </div>

                {/* Awards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/4 border border-white/7">
                    <span className="text-2xl">🥈</span>
                    <div>
                      <strong className="text-sm text-slate-200">2nd Position</strong>
                      <p className="text-xs text-slate-500">Web Designing Competition, University</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/4 border border-white/7">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <strong className="text-sm text-slate-200">BSCS Graduate</strong>
                      <p className="text-xs text-slate-500">Computer Science · NUML University</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
