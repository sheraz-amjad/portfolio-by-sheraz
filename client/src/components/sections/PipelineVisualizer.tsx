import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Container,
  ShieldCheck,
  GitCommit,
  Terminal,
  Clock,
  Cpu,
  LucideIcon
} from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  command: string;
  icon: LucideIcon | React.ElementType;
  color: string;
  duration: string;
  output: string[];
}

const STAGES: Stage[] = [
  {
    id: 1,
    name: '1. Source Trigger',
    command: 'git push origin main',
    icon: GitCommit,
    color: '#00f0ff',
    duration: '0.4s',
    output: [
      '[+] Commit pushed: 9f2a41d (feat: optimized multi-stage docker)',
      '[+] GitHub Actions workflow triggered: .github/workflows/deploy.yml',
      '[+] Runner assigned: ubuntu-latest (AWS EC2 targeted)'
    ]
  },
  {
    id: 2,
    name: '2. Lint & Test',
    command: 'npm run lint && npm run test',
    icon: CheckCircle2,
    color: '#10b981',
    duration: '1.2s',
    output: [
      '[+] Checking TypeScript typing: 0 errors',
      '[+] Running ESLint rules: passed cleanly',
      '[+] Validating API controller endpoints and schemas: OK'
    ]
  },
  {
    id: 3,
    name: '3. Docker Multi-Stage Build',
    command: 'docker build -t app:prod --target runner .',
    icon: Container,
    color: '#38bdf8',
    duration: '2.1s',
    output: [
      '[+] Stage 1 (builder): node:24-alpine installed dependencies',
      '[+] Stage 2 (static): Compiled Vite bundle to /dist',
      '[+] Stripping devDependencies: Image size reduced from 850MB to 78MB',
      '[+] Image tagged and pushed to Docker Hub registry'
    ]
  },
  {
    id: 4,
    name: '4. Malware & Security Scan',
    command: './scripts/security_audit.sh --strict',
    icon: ShieldCheck,
    color: '#a855f7',
    duration: '1.5s',
    output: [
      '[+] Scanning filesystem for suspicious obfuscation / eval patterns',
      '[+] Inspecting database schemas for injected script tags',
      '[+] Vulnerability check: 0 critical vulnerabilities found',
      '[+] Server security compliance: PASSED'
    ]
  },
  {
    id: 5,
    name: '5. AWS EC2 Zero-Downtime Deploy',
    command: 'ssh ubuntu@ec2-ip "pm2 reload ecosystem.config.cjs && nginx -s reload"',
    icon: Server,
    color: '#10b981',
    duration: '1.8s',
    output: [
      '[+] Connecting to AWS EC2 instance over secure SSH',
      '[+] Synced static assets to /var/www/portfolio',
      '[+] PM2 process [portfolio-api] reloaded in cluster mode (0 downtime)',
      '[+] Nginx reverse-proxy reloaded successfully on port 80',
      '[✓] DEPLOYMENT COMPLETE! Total pipeline elapsed: ~3.2m (down from ~10m)'
    ]
  }
];

export const PipelineVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const startPipeline = () => {
    setIsRunning(true);
    setCompletedStages([]);
    setActiveStage(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (activeStage < STAGES.length) {
      const timer = setTimeout(() => {
        setCompletedStages((prev) => [...prev, activeStage]);
        setActiveStage((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, activeStage]);

  return (
    <section id="pipeline" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-green/30 text-xs font-mono text-cyber-green">
            <Workflow size={13} />
            <span>INTERACTIVE DEVOPS CI/CD WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Automated CI/CD Pipeline <br />
            <span className="cyber-gradient-text">Live Architecture Simulator</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Experience how code travels from GitHub commit to AWS EC2 production in under 3 minutes with Docker and shell security audits.
          </p>
        </div>

        {/* Pipeline Container */}
        <div className="glass-card rounded-2xl border border-cyber-border overflow-hidden p-6 sm:p-8 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-cyber-border">
            <div className="flex items-center gap-3">
              <button
                onClick={startPipeline}
                disabled={isRunning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-green text-black font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <Play size={14} className={isRunning ? 'animate-spin' : ''} />
                <span>{isRunning ? 'Pipeline Executing...' : 'Run Pipeline Simulation'}</span>
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setActiveStage(0);
                  setCompletedStages([0, 1, 2, 3, 4]);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyber-card border border-cyber-border text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                <RotateCcw size={13} />
                <span>Show Complete</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-cyber-cyan" />
                Pipeline Speed: <strong className="text-white">~3 mins</strong>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-cyber-green" />
                Security Guardrails: <strong className="text-cyber-green">Active</strong>
              </span>
            </div>
          </div>

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon as any;
              const isCurrent = isRunning && activeStage === idx;
              const isCompleted = completedStages.includes(idx) || (completedStages.length === 5);

              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    if (!isRunning) setActiveStage(idx);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-cyber-surface border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-105'
                      : isCompleted
                      ? 'bg-cyber-card/90 border-cyber-green/40'
                      : 'bg-cyber-card/40 border-cyber-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${stage.color}20`,
                        color: stage.color
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-cyber-green" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">#{stage.id}</span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white mb-1 truncate">{stage.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">{stage.duration}</div>
                </div>
              );
            })}
          </div>

          {/* Terminal Console Output */}
          <div className="terminal-window rounded-xl border border-cyber-border overflow-hidden">
            <div className="px-4 py-2 bg-[#050811] border-b border-cyber-border flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-cyber-cyan" />
                <span>Runner Terminal: stage_{Math.min(activeStage + 1, STAGES.length)}.log</span>
              </div>
              <span className="text-[10px] text-cyber-green">● LIVE AGENT STREAM</span>
            </div>

            <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-2 bg-[#080d1a] min-h-[160px]">
              {(() => {
                const targetIdx = Math.min(activeStage, STAGES.length - 1);
                const currentStageObj = STAGES[targetIdx];
                return (
                  <div>
                    <div className="flex items-center gap-2 text-cyber-cyan mb-2">
                      <span>$</span>
                      <span className="font-bold text-white">{currentStageObj.command}</span>
                    </div>
                    <div className="space-y-1 pl-4 text-slate-300">
                      {currentStageObj.output.map((line, lIdx) => (
                        <div key={lIdx} className={line.startsWith('[✓]') ? 'text-cyber-green font-bold' : ''}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
