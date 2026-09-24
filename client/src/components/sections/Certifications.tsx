import React, { useEffect, useRef } from 'react';
import { CertificationItem } from '../../types';
import { ExternalLink, Award, GraduationCap, BookOpen } from 'lucide-react';

interface CertificationsProps {
  certifications: CertificationItem[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
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

  const getIcon = (type: string) => {
    if (type === 'Certification') return Award;
    if (type === 'Education') return GraduationCap;
    return BookOpen;
  };

  const getColor = (type: string) => {
    if (type === 'Certification') return '#f59e0b';
    if (type === 'Education') return '#38bdf8';
    return '#10b981';
  };

  return (
    <section id="certifications" ref={sectionRef} className="py-28 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/4 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div data-scroll="slide-left" className="mb-14">
          <div className="w-12 h-1.5 bg-[#f59e0b] rounded-full mb-4" />
          <h2
            className="font-display font-extrabold text-white"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            CREDENTIALS <span className="text-[#f59e0b]">&</span> EDUCATION
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">Certifications, degrees, and training that back the experience.</p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => {
            const Icon = getIcon(cert.type);
            const color = getColor(cert.type);
            return (
              <div
                key={idx}
                data-scroll="roll-3d"
                data-delay={`${((idx % 3) + 1) * 100}` as any}
                className="flex flex-col p-5.5 rounded-2xl border border-white/8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#f59e0b]/30 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.12)]"
                style={{ background: 'rgba(15,20,40,0.7)', padding: '1.4rem' }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border flex-shrink-0"
                  style={{ background: `${color}15`, borderColor: `${color}40`, color }}
                >
                  <Icon size={20} />
                </div>

                {/* Type Badge */}
                <span
                  className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider mb-2 self-start px-2 py-0.5 rounded-md"
                  style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  {cert.type}
                </span>

                <h3 className="font-display font-bold text-white text-[0.95rem] leading-snug mb-1.5">
                  {cert.title}
                </h3>

                <p className="font-mono text-[0.72rem] text-slate-500 mb-1">{cert.issuer}</p>
                <p className="font-mono text-[0.7rem] text-slate-600 mb-3">{cert.period}</p>

                {cert.description && (
                  <p className="text-[0.78rem] text-slate-500 leading-relaxed mb-3 flex-1">{cert.description}</p>
                )}

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.62rem] text-slate-600 rounded-md px-1.5 py-0.5"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] mt-auto hover:gap-2 transition-all"
                    style={{ color }}
                  >
                    VIEW CREDENTIAL <ExternalLink size={11} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
