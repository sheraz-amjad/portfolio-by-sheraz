import React, { useState, useEffect, useRef } from 'react';
import { SkillItem } from '../../types';
import { portfolioSkillGroups, SkillCategoryGroup } from '../../data/portfolioData';
import { Workflow, Cloud, Boxes, Code2, Activity, Terminal, Smartphone, Star } from 'lucide-react';

interface SkillsProps {
  skills?: SkillItem[];
}

const ICONS: Record<string, React.ElementType> = {
  Workflow,
  Cloud,
  Boxes,
  Code2,
  Activity,
  Terminal,
  Smartphone,
};

export const Skills: React.FC<SkillsProps> = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
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

  const filteredGroups = activeFilter === 'all'
    ? portfolioSkillGroups
    : portfolioSkillGroups.filter((g) => g.id === activeFilter);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="py-24 sm:py-28 relative"
      style={{
        background: 'rgba(255,255,255,0.012)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div data-scroll="slide-left" className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#f59e0b]">
              Core Toolchain &amp; Engineering Stack
            </span>
          </div>

          <h2
            className="font-display font-extrabold text-white tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
          >
            DEVOPS DISCIPLINES <span className="text-[#f59e0b]">&amp; SKILLS</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Organized across core production pillars: continuous delivery, container orchestration, cloud architectures, infrastructure as code, security hardening, and automation.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#f59e0b] text-[#0a0e1a] font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              All Domains ({portfolioSkillGroups.length})
            </button>
            {portfolioSkillGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveFilter(group.id)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeFilter === group.id
                    ? 'bg-[#f59e0b]/20 border border-[#f59e0b] text-[#f59e0b] font-semibold'
                    : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                {group.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group: SkillCategoryGroup, idx: number) => {
            const Icon = ICONS[group.icon] || Terminal;
            return (
              <div
                key={group.id}
                data-scroll="roll-3d"
                data-delay={`${((idx % 3) + 1) * 100}` as any}
                className="flex flex-col p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f59e0b]/40 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.15)] group"
                style={{ background: 'rgba(15, 20, 40, 0.75)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl border flex-shrink-0"
                      style={{
                        background: `${group.color}15`,
                        borderColor: `${group.color}35`,
                        color: group.color,
                      }}
                    >
                      <Icon size={19} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-[#f59e0b] transition-colors">
                        {group.title}
                      </h3>
                      <span className="font-mono text-[11px] text-slate-400">
                        {group.skills.length} core technologies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {group.description}
                </p>

                {/* Skill List with Badges */}
                <div className="space-y-2.5 flex-1">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2 rounded-xl bg-white/[0.03] border border-white/6 hover:border-white/15 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          {skill.isKey && (
                            <Star size={11} className="text-[#f59e0b] fill-[#f59e0b]" />
                          )}
                          <span className="text-xs font-semibold text-slate-200">
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden mb-1.5">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${group.color}, #f59e0b)`,
                          }}
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] px-1.5 py-0.5 rounded text-slate-300 bg-white/5 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Card Summary */}
                <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: group.color }} />
                    Production Verified
                  </span>
                  <span className="text-slate-400">{group.shortTitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

