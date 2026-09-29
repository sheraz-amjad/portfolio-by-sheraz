import React, { useState } from 'react';
import { GitBranch, Box, CheckCircle2, CloudUpload, Activity, ChevronRight, Terminal, Shield, Zap } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  shortCode: string;
  icon: React.ElementType;
  status: string;
  statusColor: string;
  tools: string[];
  summary: string;
  commandSnippet: string;
  logOutputs: string[];
}

const STAGES: Stage[] = [
  {
    id: 'code',
    name: 'Code & Version',
    shortCode: '01. CODE',
    icon: GitBranch,
    status: 'Merged & Tagged',
    statusColor: '#38bdf8',
    tools: ['Git', 'GitHub Actions', 'Azure Repos'],
    summary: 'Feature branch push triggers automated webhook with branch protection and semantic commit analysis.',
    commandSnippet: 'git checkout -b release/v2.4.0 && git push origin main',
    logOutputs: [
      '[git] Branch: main (commit 8f9a2bc)',
      '[pr] Status: All 14 PR review checks passed',
      '[hook] Webhook dispatched to GitHub Actions runner'
    ]
  },
  {
    id: 'build',
    name: 'Build & Package',
    shortCode: '02. BUILD',
    icon: Box,
    status: 'Docker Multi-Stage',
    statusColor: '#f59e0b',
    tools: ['Docker', 'Multi-Stage', 'Docker Hub'],
    summary: 'Compiles production assets and packages multi-stage Alpine Docker container images with layer caching.',
    commandSnippet: 'docker build --target production -t app:v2.4.0 .',
    logOutputs: [
      '[docker] Step 1/6: FROM node:22-alpine AS builder',
      '[docker] Step 4/6: RUN npm run build --prefix client',
      '[docker] Image optimized: 62% reduction (38.4MB)',
      '[registry] Pushed digest sha256:7d8a4 to Docker Hub'
    ]
  },
  {
    id: 'test',
    name: 'Test & Security',
    shortCode: '03. TEST',
    icon: Shield,
    status: '100% Passed',
    statusColor: '#10b981',
    tools: ['Linters', 'Unit Tests', 'Security Scans'],
    summary: 'Automated test suite executes unit validations, vulnerability sweeps, and credential leak scans.',
    commandSnippet: 'npm run test && bash scripts/security-audit.sh',
    logOutputs: [
      '[test] Unit tests: 48 passed, 0 failed (1.8s)',
      '[security] Vulnerability scan: 0 critical, 0 high',
      '[audit] SSH key-only policies & permissions verified'
    ]
  },
  {
    id: 'deploy',
    name: 'Deploy & Cutover',
    shortCode: '04. DEPLOY',
    icon: CloudUpload,
    status: 'Zero-Downtime',
    statusColor: '#a855f7',
    tools: ['AWS EC2', 'Azure', 'Kubernetes', 'Nginx'],
    summary: 'Automated release deployment via SSH keyscan with zero-downtime Nginx reload and Kubernetes rollout.',
    commandSnippet: 'ssh deploy@ec2 "rsync -avz && sudo systemctl reload nginx"',
    logOutputs: [
      '[ssh] Host verified via known_hosts fingerprint',
      '[release] Synchronizing static artifacts to /var/www/portfolio',
      '[nginx] Test config syntax ok; graceful reload complete',
      '[deploy] Zero-downtime cutover successful (elapsed: 29s)'
    ]
  },
  {
    id: 'monitor',
    name: 'Monitor & Uptime',
    shortCode: '05. MONITOR',
    icon: Activity,
    status: '99.9% Uptime',
    statusColor: '#10b981',
    tools: ['Uptime Checks', 'Cron Backups', 'Certbot SSL'],
    summary: 'Proactive endpoint probing, automated daily encrypted backups, and SSL/TLS auto-renewal monitoring.',
    commandSnippet: 'curl -ILs https://syedsheraz.me && bash scripts/backup.sh',
    logOutputs: [
      '[health] HTTP/2 200 OK — TTFB: 210ms',
      '[ssl] Certbot TLS certificate valid (auto-renew active)',
      '[cron] Encrypted daily backup snapshot uploaded to S3',
      '[sla] Status: 100% healthy, 0 alerts active'
    ]
  }
];

export const PipelineFlow: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('deploy');
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[3];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0c1222]/90 backdrop-blur-xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_10px_#f59e0b] animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
            CI/CD Deployment Architecture
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            Automated Pipeline
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span>Target: <strong className="text-amber-400">AWS EC2 / Azure</strong></span>
          <span className="text-white/20">•</span>
          <span>SLA: <strong className="text-emerald-400">99.9%</strong></span>
        </div>
      </div>

      {/* Pipeline Visual Stages Flow */}
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`relative flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 ${
                  isSelected
                    ? 'bg-[#152038] border-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.25)] -translate-y-1'
                    : 'bg-white/[0.03] border-white/8 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
                aria-label={`Inspect ${stage.name} pipeline stage`}
              >
                {/* Connecting arrow indicator for desktop */}
                {idx < STAGES.length - 1 && (
                  <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600 group-hover:text-amber-400 transition-colors">
                    <ChevronRight size={14} />
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400 font-semibold tracking-wider">
                    {stage.shortCode}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: stage.statusColor, boxShadow: `0 0 6px ${stage.statusColor}` }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ background: `${stage.statusColor}18`, color: stage.statusColor }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-white font-sans group-hover:text-[#f59e0b] transition-colors leading-tight">
                    {stage.name}
                  </span>
                </div>

                <div className="mt-auto pt-2 border-t border-white/6 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{stage.status}</span>
                  <span className="text-emerald-400 font-bold">✓</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Inspector Output */}
      <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-[#080d1a] shadow-inner">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#050811] border-b border-white/8 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-slate-300 font-semibold">
              pipeline-runner.sh // stage: {activeStage.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded border border-[#f59e0b]/30">
              Status: {activeStage.status}
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-3">
          {/* Command execution simulation */}
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-slate-200">{activeStage.commandSnippet}</span>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-[11px] leading-relaxed font-sans bg-white/[0.02] p-2.5 rounded-lg border border-white/6">
            <strong className="text-slate-200 font-mono">Stage Goal:</strong> {activeStage.summary}
          </p>

          {/* Log Lines */}
          <div className="space-y-1 pt-1 text-[11px]">
            {activeStage.logOutputs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-[#f59e0b] select-none">›</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          {/* Tools pill row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/6">
            <span className="text-[10px] text-slate-400 font-sans">Active Toolchain:</span>
            {activeStage.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/25"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
