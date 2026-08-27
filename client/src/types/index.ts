export interface PersonalInfo {
  name: string;
  titles: string[];
  location: string;
  phone: string;
  email: string;
  tagline: string;
  shortBio: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
  };
}

export interface ExperienceItem {
  _id?: string;
  title: string;
  company: string;
  period: string;
  location: string;
  roleType: 'DevOps' | 'Full Stack' | 'Mobile' | 'Cloud';
  description: string[];
  technologies: string[];
  order: number;
}

export interface ProjectItem {
  _id?: string;
  title: string;
  tagline: string;
  description: string;
  category: 'DevOps & Cloud' | 'Full Stack (MERN)' | 'Mobile (Flutter)' | 'Security & Automation';
  technologies: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  icon?: string;
  architectureBadge?: string;
}

export interface SkillItem {
  _id?: string;
  name: string;
  category: 'DevOps & Cloud' | 'Full Stack (MERN)' | 'Mobile Dev' | 'Firebase' | 'Tools & Practices';
  level: number;
  iconName: string;
  tags: string[];
  featuredIn3D?: boolean;
  order: number;
}

export interface CertificationItem {
  _id?: string;
  title: string;
  issuer: string;
  instructor?: string;
  period?: string;
  type: 'Certification' | 'Training' | 'Self-Directed' | 'Education';
  description: string;
  topics: string[];
  credentialUrl?: string;
  order: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  source?: string;
  data: T;
  error?: string;
}
