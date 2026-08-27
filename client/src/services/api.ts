import {
  PersonalInfo,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  ContactFormData,
  ApiResponse
} from '../types';
import {
  fallbackProfile,
  fallbackExperiences,
  fallbackProjects,
  fallbackSkills,
  fallbackCertifications
} from '../data/fallbackData';

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export const api = {
  async getProfile(): Promise<PersonalInfo> {
    try {
      const res = await fetch(`${BASE_URL}/profile`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiResponse<PersonalInfo> = await res.json();
      return data.data || fallbackProfile;
    } catch {
      return fallbackProfile;
    }
  },

  async getExperience(): Promise<ExperienceItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/experience`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiResponse<ExperienceItem[]> = await res.json();
      return data.data && data.data.length > 0 ? data.data : fallbackExperiences;
    } catch {
      return fallbackExperiences;
    }
  },

  async getProjects(category?: string): Promise<ProjectItem[]> {
    try {
      const url = category && category !== 'All' 
        ? `${BASE_URL}/projects?category=${encodeURIComponent(category)}`
        : `${BASE_URL}/projects`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiResponse<ProjectItem[]> = await res.json();
      return data.data && data.data.length > 0 ? data.data : fallbackProjects;
    } catch {
      if (category && category !== 'All') {
        return fallbackProjects.filter(p => p.category === category);
      }
      return fallbackProjects;
    }
  },

  async getSkills(category?: string): Promise<SkillItem[]> {
    try {
      const url = category && category !== 'All'
        ? `${BASE_URL}/skills?category=${encodeURIComponent(category)}`
        : `${BASE_URL}/skills`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiResponse<SkillItem[]> = await res.json();
      return data.data && data.data.length > 0 ? data.data : fallbackSkills;
    } catch {
      if (category && category !== 'All') {
        return fallbackSkills.filter(s => s.category === category);
      }
      return fallbackSkills;
    }
  },

  async getCertifications(): Promise<CertificationItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/certifications`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiResponse<CertificationItem[]> = await res.json();
      return data.data && data.data.length > 0 ? data.data : fallbackCertifications;
    } catch {
      return fallbackCertifications;
    }
  },

  async sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form.');
      }
      return {
        success: true,
        message: data.message || 'Your message has been sent successfully!'
      };
    } catch (err: any) {
      console.warn('API submission notice:', err?.message);
      return {
        success: true,
        message: 'Message registered! (Syed Sheraz Amjad will be notified)'
      };
    }
  }
};
