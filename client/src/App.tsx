import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import {
  PersonalInfo,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem
} from './types';
import {
  fallbackProfile,
  fallbackExperiences,
  fallbackProjects,
  fallbackSkills,
  fallbackCertifications
} from './data/fallbackData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { PipelineVisualizer } from './components/sections/PipelineVisualizer';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { ResumeViewerModal } from './components/ui/ResumeViewerModal';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastState {
  message: string;
  type: 'success' | 'error';
  id: number;
}

export function App() {
  const [profile, setProfile] = useState<PersonalInfo>(fallbackProfile);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(fallbackExperiences);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [skills, setSkills] = useState<SkillItem[]>(fallbackSkills);
  const [certifications, setCertifications] = useState<CertificationItem[]>(fallbackCertifications);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Fetch from API (falls back gracefully to pre-seeded static data if offline)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, expData, projData, skillData, certData] = await Promise.all([
          api.getProfile(),
          api.getExperience(),
          api.getProjects(),
          api.getSkills(),
          api.getCertifications(),
        ]);

        if (profData) setProfile(profData);
        if (expData && expData.length > 0) setExperiences(expData);
        if (projData && projData.length > 0) setProjects(projData);
        if (skillData && skillData.length > 0) setSkills(skillData);
        if (certData && certData.length > 0) setCertifications(certData);
      } catch (err) {
        console.warn('Connected to fallback offline data store.');
      }
    };

    fetchData();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-slate-100 font-sans selection:bg-cyber-cyan selection:text-black">
      {/* Fixed Ambient Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-radial-glow opacity-40 pointer-events-none z-0" />

      {/* Global Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          profile={profile}
          onNavigate={scrollToSection}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        <About profile={profile} />

        <PipelineVisualizer />

        <Experience experiences={experiences} />

        <Projects projects={projects} />

        <Skills skills={skills} />

        <Certifications certifications={certifications} />

        <Contact
          profile={profile}
          onShowToast={showToast}
        />
      </main>

      {/* Global Footer */}
      <Footer
        profile={profile}
        onNavigate={scrollToSection}
      />

      {/* Resume Modal */}
      <ResumeViewerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={profile}
        experiences={experiences}
        projects={projects}
        skills={skills}
        certifications={certifications}
      />

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all animate-fadeIn ${
              toast.type === 'success'
                ? 'bg-cyber-card/95 border-cyber-green text-slate-100 shadow-cyber-green/20'
                : 'bg-cyber-card/95 border-red-500 text-slate-100 shadow-red-500/20'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} className="text-cyber-green flex-shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            )}
            <span className="text-xs font-mono">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
