import React, { useEffect, useRef } from 'react';
import { SkillItem } from '../../types';

interface SkillsProps {
  skills: SkillItem[];
}

// Tech stack data matching reference site layout
const TECH_CATEGORIES = [
  {
    name: 'DEVOPS & CLOUD',
    color: 'yellow' as const,
    pills: [
      'AWS (EC2, S3, Lambda, IAM)',
      'Microsoft Azure',
      'Docker & Docker Compose',
      'Kubernetes (Pods, Deployments)',
      'CI/CD (GitHub Actions)',
      'Terraform (IaC)',
      'Linux Administration',
      'Shell / Bash Scripting',
      'Nginx Reverse Proxy',
      'Monitoring Tools',
    ],
  },
  {
    name: 'MOBILE & FIREBASE',
    color: 'blue' as const,
    pills: [
      'Flutter & Dart',
      'MVVM Architecture',
      'State Management (BLoC/GetX/Provider)',
      'UI/UX Implementation',
      'Firebase Authentication',
      'Firestore & Storage',
      'Cloud Messaging (FCM)',
      'API Integration',
      'Android Studio',
      'Cross-Platform Development',
    ],
  },
  {
    name: 'SECURITY & TOOLS',
    color: 'green' as const,
    pills: [
      'Linux Hardening (UFW/SSH)',
      'Malware Shell Scanners',
      'Server Security Audits',
      'Git & GitHub',
      'Jira & Agile / Scrum',
      'VS Code & IDEs',
      'Load Balancer Config',
      'DNS Management',
      'Backup Automation',
      'Incident Response',
    ],
  },
];

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-scroll]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const dotColor = {
    yellow: '#f59e0b',
    blue: '#38bdf8',
    green: '#10b981',
  };

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="py-28 relative"
      style={{ background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div data-scroll="slide-left" className="mb-14">
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
            TECH STACK <span className="text-[#f59e0b]">⚡</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">The tools and technologies I use to build, deploy, and scale.</p>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              data-scroll="roll-3d"
              data-delay={`${(idx + 1) * 100}` as any}
              className="p-6 rounded-2xl border border-white/8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#f59e0b]/30 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.12)]"
              style={{ background: 'rgba(15, 20, 40, 0.7)' }}
            >
              {/* Card Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: dotColor[cat.color], boxShadow: `0 0 8px ${dotColor[cat.color]}` }}
                />
                <h3 className="font-mono text-[0.7rem] font-semibold tracking-[0.1em] text-slate-400">{cat.name}</h3>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2">
                {cat.pills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[0.75rem] text-slate-300 transition-all duration-200 cursor-default hover:text-[#f59e0b]"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60"
                      style={{ background: dotColor[cat.color] }}
                    />
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
