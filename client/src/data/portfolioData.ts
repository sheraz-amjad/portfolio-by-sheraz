import {
  PersonalInfo,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem
} from '../types';

export const portfolioProfile: PersonalInfo = {
  name: 'Syed Sheraz Amjad',
  titles: ['DevOps Engineer', 'Flutter Mobile Developer'],
  location: 'Lahore, Pakistan',
  phone: '+92 306 9275494',
  email: 'sherazamjad933@gmail.com',
  tagline: 'Results-driven BSCS graduate and Microsoft Certified DevOps Engineer Expert',
  shortBio: 'Results-driven BSCS graduate and Microsoft Certified DevOps Engineer Expert, with hands-on experience across AWS (EC2, S3, Lambda, CLI), Microsoft Azure, Docker, Kubernetes, CI/CD automation (GitHub Actions/Workflows), Terraform (IaC), Linux administration, networking, monitoring tools, and shell scripting. Currently working as a DevOps Engineer at Zemotify, where I led a full server migration and security remediation effort. Also experienced in Flutter mobile development, with a track record of building, containerizing, and deploying scalable applications end-to-end.',
  links: {
    github: 'https://github.com/sheraz-amjad',
    linkedin: 'https://www.linkedin.com/in/syed-sheraz-amjad',
    email: 'mailto:sherazamjad933@gmail.com',
    phone: 'tel:+923069275494'
  }
};

export const portfolioExperiences: ExperienceItem[] = [
  {
    title: 'DevOps Engineer',
    company: 'Zemotify',
    period: 'Jun 2026 – Present',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 1,
    description: [
      'Led migration of company websites from a compromised server to a new, secure server after the previous server was attacked.',
      'Designed and managed CI/CD pipelines using GitHub Actions/Workflows for automated build, test, and deployment.',
      'Containerized and deployed applications using Docker; managed images, containers, volumes, and logs.',
      'Provisioned and managed cloud infrastructure as code using Terraform (IaC).',
      'Deployed and managed application workloads on Kubernetes, including pods, deployments, and services.',
      'Performed day-to-day Linux server administration and management — user access, packages, services, and system hardening.',
      'Wrote automated shell scripts for website and database backups (to remote storage) and for security scanning.',
      'Set up monitoring tools and alerting to reduce the risk of future incidents and ensure server uptime.',
      'Configured and managed a load balancer to distribute traffic across servers and improve availability.',
      'Coordinated DNS and server reconfiguration to ensure a smooth, low-downtime cutover to the new infrastructure.'
    ],
    technologies: ['GitHub Actions', 'Docker', 'Terraform', 'Kubernetes', 'Linux Admin', 'Shell Scripting', 'Monitoring Tools']
  },
  {
    title: 'DevOps Intern',
    company: 'Ebryx (Pvt.) Ltd',
    period: 'Apr 27, 2026 – Jul 15, 2026',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 2,
    description: [
      'Worked alongside core DevOps teams setting up infrastructure.',
      'Containerized applications using Docker, including multi-stage builds for smaller, optimized production images.',
      'Built and maintained CI/CD pipelines with GitHub Actions, cutting deployment time from roughly 10 minutes down to about 0.5 minutes.',
      'Managed Docker images, containers, volumes, and logs, and pushed images to Docker Hub.',
      'Tracked sprints and tasks in Jira and participated in Agile ceremonies and code reviews.',
      'Recognized by management as sincere, hardworking, technically sound, and result-oriented.'
    ],
    technologies: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'Azure', 'GitHub Actions', 'Jira']
  },
  {
    title: 'Flutter Intern',
    company: 'Semicolons Tech',
    period: 'Sep 05, 2025 – Feb 05, 2026',
    location: 'Lahore, Pakistan',
    roleType: 'Mobile',
    order: 3,
    description: [
      'Developed and maintained the Joya Hotel App — implemented the full booking flow, UI enhancements, and smooth in-app navigation for hospitality users.',
      'Built the Festival Rumours App, handling event-based data display and user interaction modules.',
      'Improved UI/UX design across both applications and performed debugging and performance optimization.',
      'Worked with Flutter, Dart, Firebase, Git/GitHub, and Android Studio throughout the development lifecycle.',
      'Involved in UI development, state management, API integration, bug fixing, and testing; recognized for enthusiasm, dedication, and willingness to learn.'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Git', 'Android Studio', 'API Integration']
  }
];

export const portfolioProjects: ProjectItem[] = [
  {
    title: 'Automated Media Streaming Pipeline',
    tagline: 'Containerized Streaming Platform with Automated CI/CD to AWS EC2',
    description: 'Developed an automated deployment pipeline for a media streaming platform. Containerized with Docker and implemented automated deployment to AWS EC2 via GitHub Actions CI/CD.',
    category: 'DevOps & Cloud',
    technologies: ['Docker', 'AWS EC2', 'GitHub Actions', 'Linux'],
    highlights: [
      'Built a full deployment pipeline for a complex streaming application.',
      'Containerized the application with Docker and deployed it to an AWS EC2 instance.',
      'Implemented a CI/CD pipeline with GitHub Actions for automated build, test, and deployment.',
      'Applied DevOps practices end-to-end: containerization, CI/CD automation, and cloud hosting.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 1,
    icon: 'Cloud',
    architectureBadge: 'Docker + EC2'
  },
  {
    title: 'Security Scan & Server Migration',
    tagline: 'Automated Shell Scripting Engine for Incident Response',
    description: 'Authored custom shell scripts to automatically scan files and databases for suspicious code post-attack, and migrated production sites with minimal downtime.',
    category: 'DevOps & Cloud',
    technologies: ['Shell Scripting', 'Linux Admin', 'Server Administration', 'Nginx'],
    highlights: [
      'Authored shell scripts to automatically scan website files and databases for suspicious code following a server attack.',
      'Migrated multiple production websites to a new server with minimal downtime.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 2,
    icon: 'ShieldCheck',
    architectureBadge: 'Shell & Linux'
  },
  {
    title: 'Joya Hotel App',
    tagline: 'Hospitality Booking App with Real-Time Reservations',
    description: 'Full hospitality booking app enabling guests to browse rooms, make reservations, and manage bookings in real time using Firebase Firestore and Auth.',
    category: 'Mobile (Flutter)',
    technologies: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Git'],
    highlights: [
      'Full hospitality booking app enabling guests to browse rooms, make reservations, and manage bookings in real time.',
      'Integrated Firebase Firestore and Auth for seamless backend services.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 3,
    icon: 'Smartphone',
    architectureBadge: 'Flutter + Firebase'
  },
  {
    title: 'Festival Rumours App',
    tagline: 'Event Discovery and Interactive Social Feeds Platform',
    description: 'Lifestyle and events discovery app with event feeds, likes/comments, and dynamic content powered by Firebase.',
    category: 'Mobile (Flutter)',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    highlights: [
      'Lifestyle and events discovery app with event feeds, likes/comments.',
      'Dynamic content powered by Firebase backend.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 4,
    icon: 'Sparkles',
    architectureBadge: 'Flutter + Firebase'
  }
];

export const portfolioSkills: SkillItem[] = [
  // DevOps & Cloud
  { name: 'AWS (EC2, S3, Lambda, CLI)', category: 'DevOps & Cloud', level: 90, iconName: 'Cloud', tags: ['EC2', 'S3', 'Lambda', 'CLI'], featuredIn3D: true, order: 1 },
  { name: 'Microsoft Azure Administration', category: 'DevOps & Cloud', level: 85, iconName: 'Cloud', tags: ['Azure Admin'], featuredIn3D: false, order: 2 },
  { name: 'Docker (Compose, Multi-stage, Hub)', category: 'DevOps & Cloud', level: 95, iconName: 'Container', tags: ['Dockerize', 'Volumes', 'Logs'], featuredIn3D: true, order: 3 },
  { name: 'Kubernetes (Pods, Deployments)', category: 'DevOps & Cloud', level: 85, iconName: 'Server', tags: ['Pods', 'Services'], featuredIn3D: true, order: 4 },
  { name: 'CI/CD Automation (GitHub Actions)', category: 'DevOps & Cloud', level: 92, iconName: 'Workflow', tags: ['Automation', 'Workflows', 'YAML'], featuredIn3D: true, order: 5 },
  { name: 'Terraform (IaC)', category: 'DevOps & Cloud', level: 85, iconName: 'Code2', tags: ['IaC', 'State', 'Modules'], featuredIn3D: false, order: 6 },
  { name: 'Linux Admin & Networking', category: 'DevOps & Cloud', level: 88, iconName: 'Terminal', tags: ['Ubuntu', 'Systemd', 'SSH'], featuredIn3D: true, order: 7 },
  { name: 'Shell Scripting', category: 'DevOps & Cloud', level: 90, iconName: 'Code', tags: ['Bash', 'Automation', 'Cron'], featuredIn3D: false, order: 8 },

  // Mobile Dev
  { name: 'Flutter Framework', category: 'Mobile Dev', level: 92, iconName: 'Smartphone', tags: ['Cross-Platform', 'Widgets'], featuredIn3D: true, order: 9 },
  { name: 'Dart Language', category: 'Mobile Dev', level: 90, iconName: 'FileCode', tags: ['OOP', 'Async', 'Streams'], featuredIn3D: false, order: 10 },
  { name: 'State Management (BLoC, Provider, GetX)', category: 'Mobile Dev', level: 88, iconName: 'Activity', tags: ['BLoC', 'Provider', 'GetX'], featuredIn3D: false, order: 11 },
  { name: 'Mobile UI/UX Implementation', category: 'Mobile Dev', level: 90, iconName: 'Layout', tags: ['Responsive', 'Animations'], featuredIn3D: false, order: 12 },

  // Firebase
  { name: 'Firebase Authentication', category: 'Firebase', level: 92, iconName: 'Key', tags: ['OAuth', 'JWT', 'Security'], featuredIn3D: false, order: 13 },
  { name: 'Cloud Firestore', category: 'Firebase', level: 90, iconName: 'Database', tags: ['Realtime', 'Indexes', 'Rules'], featuredIn3D: false, order: 14 },
  { name: 'Cloud Messaging (FCM)', category: 'Firebase', level: 86, iconName: 'Bell', tags: ['Push Notifications', 'Topics'], featuredIn3D: false, order: 15 },

  // Tools & Practices
  { name: 'Git & GitHub', category: 'Tools & Practices', level: 95, iconName: 'GitBranch', tags: ['Branches', 'PRs', 'Actions'], featuredIn3D: false, order: 16 },
  { name: 'Nginx Configuration', category: 'Tools & Practices', level: 85, iconName: 'Cpu', tags: ['Reverse Proxy', 'SSL', 'Gzip'], featuredIn3D: false, order: 17 },
  { name: 'Monitoring & Alerting', category: 'Tools & Practices', level: 82, iconName: 'Shield', tags: ['Uptime', 'Logs', 'Metrics'], featuredIn3D: false, order: 18 }
];

export const portfolioCertifications: CertificationItem[] = [
  {
    title: 'Microsoft Certified: DevOps Engineer Expert (AZ-400)',
    issuer: 'Microsoft',
    period: 'Sep 2026',
    type: 'Certification',
    order: 1,
    description: 'Expert-level certification validating deep expertise in designing and implementing DevOps practices for version control, compliance, infrastructure as code, build, release, and testing.',
    topics: ['CI/CD Pipelines', 'Infrastructure as Code', 'Azure DevOps', 'Continuous Feedback', 'Security & Compliance'],
    credentialUrl: 'https://learn.microsoft.com/en-us/users/syedsherazamjad-7601/credentials/certification/devops-engineer?tab=credentials-tab',
    downloadUrl: '/AZ-400_DevOps_Engineer_Expert.pdf'
  },
  {
    title: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
    issuer: 'Microsoft',
    period: 'Sep 2026',
    type: 'Certification',
    order: 2,
    description: 'Associate-level certification validating expertise in implementing, managing, and monitoring identity, governance, storage, compute, and virtual networks in cloud environments.',
    topics: ['Azure Cloud', 'Virtual Networks', 'Identity & Governance', 'Storage & Compute'],
    credentialUrl: 'https://learn.microsoft.com/en-us/users/syedsherazamjad-7601/credentials/certification/azure-administrator?tab=credentials-tab',
    downloadUrl: '/AZ-104_Azure_Administrator_Associate.pdf'
  },
  {
    title: 'Experience Letter',
    issuer: 'DevOps & Software Engineering',
    period: '2026',
    type: 'Training',
    order: 3,
    description: 'Official Experience Letter validating hands-on accomplishments in DevOps engineering, server infrastructure migration, CI/CD automation, and cloud deployments.',
    topics: ['DevOps', 'Docker', 'GitHub Actions', 'Server Migration', 'Linux Administration'],
    downloadUrl: '/syed_sheraz_experience_letter.pdf'
  },
  {
    title: 'Bachelor of Science in Computer Science (BSCS)',
    issuer: 'National University of Modern Languages (NUML)',
    period: 'Oct 2021 – Sep 2025',
    type: 'Education',
    order: 4,
    description: 'Graduated with core foundations in Data Structures, Algorithms, Distributed Systems, Software Engineering, Database Systems, Computer Networks, and Mobile Application Development.',
    topics: ['Algorithms & Data Structures', 'Software Engineering', 'Database Management Systems', 'Networking & OS']
  }
];

// Backwards compatibility alias
export const fallbackProfile = portfolioProfile;
export const fallbackExperiences = portfolioExperiences;
export const fallbackProjects = portfolioProjects;
export const fallbackSkills = portfolioSkills;
export const fallbackCertifications = portfolioCertifications;
