import React from 'react';
import {
  Award,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Video,
  ExternalLink
} from 'lucide-react';
import { CertificationItem } from '../../types';

interface CertificationsProps {
  certifications: CertificationItem[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return GraduationCap;
      case 'Training':
        return Award;
      case 'Self-Directed':
        return Video;
      default:
        return BookOpen;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Education':
        return '#00f0ff';
      case 'Training':
        return '#10b981';
      case 'Self-Directed':
        return '#a855f7';
      default:
        return '#38bdf8';
    }
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Award size={13} />
            <span>CREDENTIALS // EDUCATION & TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Certifications & Academic <br />
            <span className="cyber-gradient-text">Foundation</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Rigorous hands-on engineering training, computer science foundations, and continuous self-directed learning.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((item, idx) => {
            const Icon = getIcon(item.type);
            const color = getColor(item.type);

            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl border border-cyber-border/80 p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${color}15`,
                        borderColor: `${color}40`,
                        color: color,
                        boxShadow: `0 0 15px ${color}20`
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-[10px] font-mono text-slate-400">
                      {item.period || item.type}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-cyber-cyan mt-1">
                      {item.issuer} {item.instructor && `· Instructor: ${item.instructor}`}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Topics Covered */}
                <div className="pt-4 mt-6 border-t border-cyber-border space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                    Key Topics Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.topics.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-[10px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
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
