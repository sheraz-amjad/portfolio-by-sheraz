import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  Award,
  Cpu,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { PersonalInfo, ExperienceItem, ProjectItem, SkillItem, CertificationItem } from '../../types';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PersonalInfo;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  projects,
  skills,
  certifications,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
======================================================
${profile.name.toUpperCase()}
DevOps Engineer | Flutter Mobile Developer | MERN Stack
Location: ${profile.location} | Phone: ${profile.phone} | Email: ${profile.email}
GitHub: ${profile.links.github} | LinkedIn: ${profile.links.linkedin}
======================================================

SUMMARY:
${profile.shortBio}

WORK EXPERIENCE:
${experiences
  .map(
    (e) => `
* ${e.title} — ${e.company} (${e.period}) - ${e.location}
${e.description.map((d) => `  - ${d}`).join('\n')}
  Technologies: ${e.technologies.join(', ')}`
  )
  .join('\n')}

PROJECTS:
${projects
  .map(
    (p) => `
* ${p.title} (${p.category})
  ${p.description}
  Key Tech: ${p.technologies.join(', ')}
  Highlights:
${p.highlights.map((h) => `  - ${h}`).join('\n')}`
  )
  .join('\n')}

SKILLS:
${skills.map((s) => `${s.name} (${s.category})`).join(', ')}

EDUCATION & CERTIFICATIONS:
${certifications
  .map((c) => `* ${c.title} — ${c.issuer} (${c.period || 'Certified'})\n  ${c.description}`)
  .join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-card bg-cyber-bg/95 border border-cyber-border rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border bg-cyber-card/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center">
              <Briefcase size={16} className="text-cyber-cyan" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Curriculum Vitae</h3>
              <p className="text-xs font-mono text-cyber-cyan">Syed Sheraz Amjad · DevOps & Flutter</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border text-xs font-mono text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
              title="Copy as Plain Text"
            >
              {copied ? <Check size={14} className="text-cyber-green" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-green text-black font-semibold text-xs hover:opacity-90 transition-all"
              title="Print / Save as PDF"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all ml-2"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans text-slate-200 print:text-black print:bg-white">
          {/* Header CV Block */}
          <div className="border-b border-cyber-border pb-6 print:border-gray-300">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white print:text-black">
              {profile.name}
            </h1>
            <p className="text-sm sm:text-base font-mono text-cyber-cyan print:text-blue-700 font-semibold mt-1">
              DevOps Engineer · Flutter Mobile Developer · Full Stack MERN
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-slate-400 print:text-gray-600">
              <span className="flex items-center gap-1"><MapPin size={13} className="text-cyber-cyan" /> {profile.location}</span>
              <span className="flex items-center gap-1"><Phone size={13} className="text-cyber-green" /> {profile.phone}</span>
              <span className="flex items-center gap-1"><Mail size={13} className="text-cyber-purple" /> {profile.email}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-cyan print:text-blue-700 font-bold mb-2">
              Professional Summary
            </h4>
            <p className="text-sm leading-relaxed text-slate-300 print:text-gray-800">
              {profile.shortBio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-cyan print:text-blue-700 font-bold mb-4 flex items-center gap-2">
              <Briefcase size={14} />
              <span>Work Experience</span>
            </h4>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-cyber-cyan/40 pl-4 py-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h5 className="font-semibold text-white print:text-black text-sm">
                      {exp.title} <span className="text-cyber-cyan print:text-blue-600">— {exp.company}</span>
                    </h5>
                    <span className="text-xs font-mono text-slate-400 print:text-gray-600">{exp.period} | {exp.location}</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-300 print:text-gray-700 list-disc list-inside">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-border text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-green print:text-green-700 font-bold mb-4 flex items-center gap-2">
              <Cpu size={14} />
              <span>Featured Projects</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-cyber-card/60 border border-cyber-border print:border-gray-300">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white print:text-black text-xs">{proj.title}</h5>
                    <span className="text-[10px] font-mono text-cyber-cyan">{proj.architectureBadge}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{proj.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 5).map((t, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-purple print:text-purple-700 font-bold mb-3">
              Core Technical Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyber-card border border-cyber-border text-xs font-mono text-slate-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-cyan print:text-blue-700 font-bold mb-3 flex items-center gap-2">
              <Award size={14} />
              <span>Certifications & Education</span>
            </h4>
            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="text-xs">
                  <div className="font-semibold text-white print:text-black">
                    {cert.title} <span className="text-cyber-cyan">— {cert.issuer}</span> {cert.instructor && `(Instructor: ${cert.instructor})`}
                  </div>
                  <p className="text-slate-400 mt-0.5">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
