import React, { useEffect, useRef } from 'react';
import { PersonalInfo } from '../../types';
import { PipelineFlow } from '../ui/PipelineFlow';
import { ShieldCheck, Cpu, GitMerge, Server } from 'lucide-react';

interface AboutProps {
  profile: PersonalInfo;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
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

  const expertiseTags = [
    'CI/CD AUTOMATION', 'AZURE DEVOPS', 'DOCKER MULTI-STAGE', 'KUBERNETES',
    'TERRAFORM (IaC)', 'AWS (EC2, S3, LAMBDA)', 'MICROSOFT AZURE',
    'LINUX HARDENING (UFW/SSH)', 'BASH AUTOMATION', 'CRON BACKUPS', 'NGINX REVERSE PROXY'
  ];

  return (
    <section id="about" ref={sectionRef} className="pt-4 sm:pt-8 pb-20 sm:pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/4 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

          {/* Left: Display Title & DevOps Pillars */}
          <div data-scroll="slide-left" className="space-y-6">
            <div className="w-12 h-1.5 bg-[#f59e0b] rounded-full" />
            <h2
              className="font-display font-extrabold text-white leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
            >
              DEVOPS &amp;<br />
              <span className="text-[#f59e0b]">CLOUD ARCHITECTURE</span>
            </h2>
            <p className="text-slate-300 font-mono text-xs uppercase tracking-widest">
              // BSCS Graduate · Microsoft Certified DevOps Engineer Expert (AZ-400)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { icon: GitMerge, title: 'Continuous Integration', desc: 'Automated test gates & fast multi-stage container builds' },
                { icon: Server, title: 'Zero-Downtime Rollouts', desc: 'Predictable releases on AWS, Azure, & Linux clusters' },
                { icon: ShieldCheck, title: 'Infrastructure Security', desc: 'Hardened SSH, UFW firewalls, Fail2ban, and SSL/TLS' },
                { icon: Cpu, title: 'Infrastructure as Code', desc: 'Declarative Terraform blueprints and reproducible states' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#f59e0b]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5 text-[#f59e0b]">
                      <Icon size={16} />
                      <span className="text-xs font-bold text-white font-sans">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Bio + Core Expertise */}
          <div data-scroll="slide-right" className="space-y-6">
            <p className="text-[1.05rem] text-slate-200 leading-[1.8] font-medium">
              Specialized in engineering robust delivery pipelines, automating cloud infrastructure, and securing production environments. Passionate about eliminating release friction and replacing manual operations with declarative code.
            </p>
            <p className="text-[0.9rem] text-slate-300 leading-[1.85]">
              {profile.shortBio}
            </p>

            {/* Core Expertise Tags */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold tracking-[0.12em] text-[#f59e0b] uppercase">
                Core DevOps Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30 font-mono text-[0.72rem] font-semibold text-[#f59e0b] tracking-wide hover:bg-[#f59e0b]/20 hover:border-[#f59e0b]/60 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <span>📍 Lahore, Pakistan</span>
              <span>🎓 NUML University · BSCS</span>
              <span>🏆 AZ-400 &amp; AZ-104 Certified</span>
            </div>
          </div>

        </div>

        {/* Visual: Pipeline Flow Component */}
        <div data-scroll="slide-up" className="mt-8">
          <PipelineFlow />
        </div>
      </div>
    </section>
  );
};

