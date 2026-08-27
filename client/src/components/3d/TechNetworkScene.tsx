import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { SceneFallback } from './SceneFallback';
import {
  Cloud,
  Container,
  Workflow,
  Database,
  Code,
  Cpu,
  Smartphone,
  Flame,
  Shield,
  Layers,
  LucideIcon
} from 'lucide-react';

interface TechNodeData {
  name: string;
  category: string;
  color: string;
  position: [number, number, number];
  icon: LucideIcon | React.ElementType;
  status: string;
}

const TECH_NODES: TechNodeData[] = [
  { name: 'AWS EC2 / S3', category: 'Cloud Infrastructure', color: '#00f0ff', position: [-2.2, 1.4, 0.8], icon: Cloud, status: '99.9% Uptime' },
  { name: 'Docker Multi-stage', category: 'Containerization', color: '#38bdf8', position: [0, 2.2, -0.5], icon: Container, status: 'Optimized Builds' },
  { name: 'GitHub Actions', category: 'CI/CD Pipelines', color: '#10b981', position: [2.2, 1.4, 0.8], icon: Workflow, status: '~3 min Deploy' },
  { name: 'MongoDB', category: 'NoSQL Database', color: '#34d399', position: [-2.4, -1.2, -0.5], icon: Database, status: 'Mongoose ODM' },
  { name: 'Node.js & Express', category: 'Backend REST API', color: '#a855f7', position: [0, 0, 0.2], icon: Cpu, status: 'REST Endpoints' },
  { name: 'React + Vite', category: 'Frontend SPA', color: '#00f0ff', position: [2.4, -1.2, -0.5], icon: Code, status: '3D Interactive' },
  { name: 'Flutter Mobile', category: 'Cross-Platform App', color: '#38bdf8', position: [-1.4, -2.4, 0.9], icon: Smartphone, status: 'Android & iOS' },
  { name: 'Firebase', category: 'Cloud Auth & Sync', color: '#f59e0b', position: [1.4, -2.4, 0.9], icon: Flame, status: 'Realtime DB' },
  { name: 'Linux Security', category: 'Hardening & Shell', color: '#ef4444', position: [0, -1.4, -1.8], icon: Shield, status: 'Malware Scanned' },
  { name: 'Nginx + PM2', category: 'Production Stack', color: '#10b981', position: [0, 1.2, -1.8], icon: Layers, status: 'Zero-Downtime' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [6, 7],
  [8, 0],
  [9, 1],
  [9, 4],
];

const ParticleDust: React.FC = () => {
  const count = 180;
  const mesh = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#10b981'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#8b5cf6')
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.04;
      mesh.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const NodeMesh: React.FC<{
  node: TechNodeData;
  activeNode: TechNodeData | null;
  setActiveNode: (n: TechNodeData | null) => void;
}> = ({ node, activeNode, setActiveNode }) => {
  const isHovered = activeNode?.name === node.name;
  const meshRef = useRef<THREE.Group>(null!);
  const [x, y, z] = node.position;
  const Icon = node.icon as any;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.4);
    }
  });

  return (
    <group position={[x, y, z]}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <group
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setActiveNode(node);
          }}
          onPointerOut={() => setActiveNode(null)}
        >
          {/* Inner Glowing Core */}
          <Sphere args={[0.32, 24, 24]}>
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isHovered ? 1.2 : 0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>

          {/* Orbiting Tech Ring */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.48, 0.018, 16, 48]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={isHovered ? 0.9 : 0.4}
            />
          </mesh>

          {/* Second ring */}
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.54, 0.012, 16, 48]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={isHovered ? 0.6 : 0.25}
            />
          </mesh>

          {/* Interactive HTML Card attached to 3D node */}
          <Html
            position={[0, 0.6, 0]}
            center
            distanceFactor={8}
            className="pointer-events-none select-none transition-all duration-300"
          >
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border backdrop-blur-md transition-all duration-300 ${
                isHovered
                  ? 'bg-cyber-card/95 border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-110'
                  : 'bg-cyber-card/70 border-white/10 opacity-85'
              }`}
              style={{ minWidth: 'max-content' }}
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ backgroundColor: `${node.color}25` }}
              >
                <Icon size={12} style={{ color: node.color }} />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-white tracking-wide">
                  {node.name}
                </div>
                {isHovered && (
                  <div className="text-[9px] font-mono text-cyber-emerald flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                    {node.status}
                  </div>
                )}
              </div>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
};

const PipelineLinks: React.FC = () => {
  const lineSegmentsMesh = useMemo(() => {
    const positions: number[] = [];
    CONNECTIONS.forEach(([startIndex, endIndex]) => {
      const [x1, y1, z1] = TECH_NODES[startIndex].position;
      const [x2, y2, z2] = TECH_NODES[endIndex].position;
      positions.push(x1, y1, z1, x2, y2, z2);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    return new THREE.LineSegments(geometry, material);
  }, []);

  return <primitive object={lineSegmentsMesh} />;
};

const NetworkScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [activeNode, setActiveNode] = useState<TechNodeData | null>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!activeNode) {
        groupRef.current.rotation.y += delta * 0.12;
      }
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.25,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -state.pointer.x * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <PipelineLinks />
      {TECH_NODES.map((node) => (
        <NodeMesh
          key={node.name}
          node={node}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
      ))}
      <ParticleDust />
    </group>
  );
};

export const TechNetworkScene: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === false) {
    return <SceneFallback />;
  }

  return (
    <div className="relative w-full h-[480px] md:h-[600px] rounded-3xl glass-card border border-cyber-border/70 overflow-hidden shadow-2xl shadow-cyber-cyan/10">
      <div className="absolute inset-0 bg-radial-glow opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-bg/80 border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan" />
        </span>
        <span>Interactive 3D DevOps Pipeline Graph</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyber-bg/80 border border-white/10 text-[11px] font-mono text-slate-400 backdrop-blur-md">
        <span>🖱️ Drag to rotate · Hover to inspect</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#00f0ff" />
        <pointLight position={[0, 5, 0]} intensity={1.2} color="#10b981" />

        <NetworkScene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
