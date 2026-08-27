import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Container,
  Workflow,
  Database,
  Code,
  Cpu,
  Smartphone,
  Flame,
  GitBranch
} from 'lucide-react';

const nodes = [
  { id: 'aws', label: 'AWS EC2 / S3', icon: Cloud, color: '#00f0ff', x: 20, y: 30 },
  { id: 'docker', label: 'Docker Multi-stage', icon: Container, color: '#38bdf8', x: 50, y: 20 },
  { id: 'actions', label: 'GitHub Actions CI/CD', icon: Workflow, color: '#10b981', x: 80, y: 30 },
  { id: 'mern', label: 'MERN Stack', icon: Database, color: '#34d399', x: 25, y: 70 },
  { id: 'node', label: 'Node.js & Express', icon: Cpu, color: '#a855f7', x: 50, y: 55 },
  { id: 'react', label: 'React + Vite', icon: Code, color: '#00f0ff', x: 75, y: 70 },
  { id: 'flutter', label: 'Flutter Mobile', icon: Smartphone, color: '#38bdf8', x: 35, y: 85 },
  { id: 'firebase', label: 'Firebase Cloud', icon: Flame, color: '#f59e0b', x: 65, y: 85 },
];

export const SceneFallback: React.FC = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl glass-card border border-cyber-border overflow-hidden flex items-center justify-center bg-cyber-bg/60">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 bg-radial-glow opacity-80" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* SVG Connecting Pipelines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyber-cyan/30">
        <defs>
          <linearGradient id="cyanGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Pipeline connections */}
        <line x1="20%" y1="30%" x2="50%" y2="20%" stroke="url(#cyanGreen)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="20%" x2="80%" y2="30%" stroke="url(#cyanGreen)" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="50%" y1="20%" x2="50%" y2="55%" stroke="#00f0ff" strokeWidth="2" />
        <line x1="25%" y1="70%" x2="50%" y2="55%" stroke="#10b981" strokeWidth="2" />
        <line x1="50%" y1="55%" x2="75%" y2="70%" stroke="#00f0ff" strokeWidth="2" />
        <line x1="25%" y1="70%" x2="35%" y2="85%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 4" />
        <line x1="75%" y1="70%" x2="65%" y2="85%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 4" />
        <line x1="35%" y1="85%" x2="65%" y2="85%" stroke="#a855f7" strokeWidth="1.5" />
      </svg>

      {/* Animated Floating Nodes */}
      <div className="relative w-full h-full">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                },
                scale: { duration: 0.5, delay: i * 0.1 }
              }}
            >
              <div
                className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl border transition-all duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: 'rgba(10, 16, 31, 0.85)',
                  borderColor: `${node.color}66`,
                  boxShadow: `0 0 20px ${node.color}33`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: node.color }}
                />
                <Icon size={22} style={{ color: node.color }} />

                {/* Pulsing ring */}
                <span
                  className="absolute -inset-1 rounded-2xl animate-ping opacity-20 pointer-events-none"
                  style={{ borderColor: node.color, border: `1px solid ${node.color}` }}
                />
              </div>

              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-cyber-bg/90 border border-cyber-border text-[11px] font-mono text-slate-300 opacity-90 group-hover:opacity-100 group-hover:text-cyber-cyan transition-colors">
                {node.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Central Badge */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 px-3 py-1.5 rounded-lg glass-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan flex items-center gap-2">
        <GitBranch size={14} className="animate-spin-slow text-cyber-green" />
        <span>DevOps Pipeline Topology Active</span>
      </div>
    </div>
  );
};
