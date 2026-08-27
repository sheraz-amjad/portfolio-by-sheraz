import React from 'react';
import {
  Terminal,
  ShieldCheck,
  Cloud,
  Smartphone,
  Cpu,
  Database,
  Workflow,
  MapPin,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { PersonalInfo } from '../../types';

interface AboutProps {
  profile: PersonalInfo;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const pillars = [
    {
      title: 'DevOps & Cloud Infrastructure',
      icon: Cloud,
      color: '#00f0ff',
      description: 'Architecting AWS EC2 & S3 environments, crafting multi-stage Docker builds, orchestrating zero-downtime GitHub Actions CI/CD pipelines, and managing production Nginx reverse proxies.'
    },
    {
      title: 'Full Stack MERN Engineering',
      icon: Database,
      color: '#10b981',
      description: 'Developing high-throughput REST APIs with Node.js and Express, architecting MongoDB schemas with Mongoose ODM, and building modern React SPAs with TypeScript.'
    },
    {
      title: 'Flutter Mobile Engineering',
      icon: Smartphone,
      color: '#38bdf8',
      description: 'Building production iOS and Android apps with Flutter & Dart, implementing clean MVVM architectures, and integrating Firebase Auth, Firestore real-time sync, and FCM push notifications.'
    },
    {
      title: 'Security Audits & Shell Automation',
      icon: ShieldCheck,
      color: '#ef4444',
      description: 'Writing custom Bash/Shell scripts for recursive malware scanning, sanitizing databases post-incident, Linux server hardening (UFW/SSH), and low-downtime DNS cutovers.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Terminal size={13} />
            <span>SYSTEM_PROFILE // ABOUT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Engineering Scalable, Secure & <br />
            <span className="cyber-gradient-text">Containerized Solutions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
            BSCS graduate combining deep DevOps automation with hands-on MERN full-stack and Flutter mobile application engineering.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Terminal View (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Bio Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-cyber-border space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Professional Background</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {profile.shortBio}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-cyber-border">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-cyber-cyan" />
                  <span>Based in Lahore, Pakistan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-cyber-green" />
                  <span>BSCS Graduate (NUML)</span>
                </span>
              </div>
            </div>

            {/* Interactive Terminal Window */}
            <div className="rounded-2xl terminal-window border border-cyber-border overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#050811] border-b border-cyber-border text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-slate-300 font-mono">sheraz@devops-node:~$</span>
                </div>
                <span className="text-[10px] text-cyber-cyan">bash v5.2</span>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-2.5 bg-[#080d1a]">
                <div className="flex items-center gap-2 text-cyber-cyan">
                  <span>$</span>
                  <span className="text-white">cat /etc/sheraz-skills.spec</span>
                </div>
                <div className="pl-4 text-slate-400 space-y-1">
                  <div><span className="text-cyber-green">INFRA:</span> AWS EC2, S3, IAM, VPC, Nginx Reverse Proxy</div>
                  <div><span className="text-cyber-cyan">CONTAINERS:</span> Docker, Docker Compose, Multi-stage builds</div>
                  <div><span className="text-cyber-purple">PIPELINES:</span> GitHub Actions CI/CD (10m -&gt; 3m cut)</div>
                  <div><span className="text-cyber-blue">MOBILE:</span> Flutter, Dart, MVVM, Firebase Auth &amp; Firestore</div>
                  <div><span className="text-cyber-emerald">SECURITY:</span> Malware Shell Scanners, Linux Hardening, UFW</div>
                </div>

                <div className="flex items-center gap-2 text-cyber-cyan pt-2">
                  <span>$</span>
                  <span className="text-white">docker run -d --name mern-portfolio -p 80:80</span>
                </div>
                <div className="pl-4 text-cyber-green text-[11px]">
                  [✓] Status: Container running · Health: healthy · Port: 80 -&gt; 5000 proxy
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover p-5 rounded-2xl border border-cyber-border flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 border"
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        borderColor: `${pillar.color}40`,
                        color: pillar.color,
                        boxShadow: `0 0 15px ${pillar.color}20`
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h4 className="font-bold text-white text-base mb-2 font-display">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
