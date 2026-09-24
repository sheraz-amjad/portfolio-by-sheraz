import React, { useEffect, useRef } from 'react';
import { PersonalInfo } from '../../types';

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
    'AWS', 'AZURE', 'DOCKER', 'KUBERNETES',
    'CI/CD AUTOMATION', 'TERRAFORM (IaC)',
    'FLUTTER', 'FIREBASE', 'LINUX ADMIN', 'SHELL SCRIPTING',
  ];

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/4 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: Huge Display Title */}
          <div data-scroll="slide-left" className="space-y-6">
            <div className="w-12 h-1.5 bg-[#f59e0b] rounded-full" />
            <h2
              className="font-display font-extrabold text-white leading-tight relative"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
              data-text="DEVOPS & MOBILE."
            >
              DEVOPS<br />&amp; MOBILE.
            </h2>
            <p className="text-slate-300 font-mono text-xs uppercase tracking-widest">
              // BSCS Graduate · Microsoft Certified
            </p>

            {/* CI/CD Terminal Visual */}
            <div className="rounded-xl overflow-hidden border border-[#1e2a45] shadow-xl shadow-black/40 mt-6 bg-[#080d1a]">
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#050811] border-b border-white/8 font-mono text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-slate-300">pipeline.yml — GitHub Actions</span>
                </div>
                <span className="text-[10px] text-[#f59e0b]">CI/CD Automated</span>
              </div>
              <div className="p-4 font-mono text-[11px] text-slate-300 space-y-1.5">
                <div className="text-slate-500"># Automated multi-tier pipeline</div>
                <div className="flex items-center justify-between">
                  <span><span className="text-[#f59e0b]">build-and-test</span>:</span>
                  <span className="text-emerald-400 font-semibold">passed ✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span><span className="text-[#f59e0b]">docker-containerize</span>:</span>
                  <span className="text-emerald-400 font-semibold">built &amp; pushed ✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span><span className="text-[#f59e0b]">k8s-cluster-deploy</span>:</span>
                  <span className="text-emerald-400 font-semibold">live on AWS ✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span><span className="text-[#f59e0b]">flutter-mobile-build</span>:</span>
                  <span className="text-emerald-400 font-semibold">synced ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio + Tags */}
          <div data-scroll="slide-right" className="space-y-6">
            <p className="text-[1.05rem] text-slate-200 leading-[1.8] font-medium">
              Passionate about DevOps and Mobile development — building CI/CD pipelines that automatically
              handle builds, tests, and deployments, and crafting Flutter apps that run flawlessly across platforms.
              A natural problem-solver committed to continuous improvement.
            </p>
            <p className="text-[0.9rem] text-slate-400 leading-[1.85]">
              {profile.shortBio}
            </p>

            {/* Core Expertise Tags */}
            <div className="space-y-3">
              <span className="font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-[#f59e0b] uppercase">
                Core Expertise
              </span>
              <div className="flex flex-wrap gap-2">
                {expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/25 font-mono text-[0.72rem] font-semibold text-[#f59e0b] tracking-wide hover:bg-[#f59e0b]/18 hover:border-[#f59e0b]/50 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-500 border-t border-white/8 pt-4">
              <span>📍 Lahore, Pakistan</span>
              <span>🎓 NUML University · BSCS</span>
              <span>🏆 AZ-400 Certified</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
