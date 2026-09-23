// Server-side seed data — single source of truth for API fallback and DB seeding.
// Keep in sync with client/src/data/fallbackData.ts

export const experiencesData = [
  {
    title: 'DevOps Engineer',
    company: 'Zemotify',
    period: 'Jun 2026 – Present',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 1,
    description: [
      'Led migration of company websites from a compromised server to a new, secure server after a major infrastructure security incident.',
      'Designed and managed CI/CD pipelines using GitHub Actions/Workflows for automated build, test, and deployment.',
      'Containerized and deployed applications using Docker; managed images, containers, volumes, and logs.',
      'Provisioned and managed cloud infrastructure as code using Terraform (IaC).',
      'Deployed and managed application workloads on Kubernetes, including pods, deployments, and services.',
      'Performed day-to-day Linux server administration — user access, packages, services, and system hardening.',
      'Wrote automated shell scripts for website and database backups (to remote storage) and for security scanning.',
      'Set up monitoring tools and alerting to reduce the risk of future incidents and ensure server uptime.',
      'Configured and managed a load balancer to distribute traffic across servers and improve availability.',
      'Coordinated DNS and server reconfiguration to ensure a smooth, low-downtime cutover to the new infrastructure.'
    ],
    technologies: ['GitHub Actions', 'Docker', 'Terraform', 'Kubernetes', 'Linux Admin', 'Shell Scripting', 'Monitoring Tools', 'Nginx']
  },
  {
    title: 'DevOps Intern',
    company: 'Ebryx (Pvt.) Ltd',
    period: 'Apr 27, 2026 – Jul 15, 2026',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 2,
    description: [
      'Worked alongside core DevOps teams setting up and managing infrastructure.',
      'Containerized applications using Docker, including multi-stage builds for smaller, optimized production images.',
      'Built and maintained CI/CD pipelines with GitHub Actions, cutting deployment time from roughly 10 minutes down to about 3 minutes.',
      'Managed Docker images, containers, volumes, and logs, and pushed images to Docker Hub.',
      'Tracked sprints and tasks in Jira and participated in Agile ceremonies and code reviews.',
      'Recognized by management as sincere, hardworking, technically sound, and result-oriented.'
    ],
    technologies: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux', 'Docker Hub', 'Jira', 'Agile']
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
      'Involved in UI development, state management, API integration, bug fixing, and testing; recognized for enthusiasm and dedication.'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Git', 'Android Studio', 'API Integration', 'Provider / BLoC']
  }
];

export const projectsData = [
  {
    title: 'Automated Media Streaming Pipeline',
    tagline: 'Containerized Streaming Platform with Automated CI/CD to AWS EC2',
    description: 'Developed an automated deployment pipeline for a media streaming platform. Containerized with Docker and implemented automated deployment to AWS EC2 via GitHub Actions CI/CD.',
    category: 'DevOps & Cloud',
    technologies: ['Docker', 'AWS EC2', 'GitHub Actions', 'Nginx', 'Linux'],
    highlights: [
      'Built a full CI/CD deployment pipeline triggering automated build, Docker image push to Docker Hub, and zero-downtime SSH deployment to AWS EC2.',
      'Docker multi-stage builds optimizing production bundle size by over 60%.',
      'Nginx reverse proxy with gzip compression, caching, and rate limiting configured on EC2.',
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
    tagline: 'Custom Shell Automation Engine for Incident Recovery, Security Audits & Low-Downtime Cutover',
    description: 'Comprehensive shell scripting automation suite designed to inspect file systems, isolate malicious patterns, sanitize databases, and orchestrate low-downtime server migrations for compromised production servers.',
    category: 'Security & Automation',
    technologies: ['Bash / Shell Scripting', 'Linux (Ubuntu)', 'Security Auditing', 'Nginx', 'Crontab', 'Regex Scanner'],
    highlights: [
      'Custom regex patterns detecting obfuscated eval(), base64 payloads, and backdoor webshells.',
      'Automated database sanitation pipelines removing injected script tags and corrupt payloads.',
      'Zero-loss data backup, directory synchronisation, and low-downtime DNS cutover orchestration.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 2,
    icon: 'ShieldCheck',
    architectureBadge: 'Shell & Security'
  },
  {
    title: 'Joya Hotel Mobile App',
    tagline: 'End-to-End Hospitality Booking & Reservation Mobile App with Real-Time Sync',
    description: 'Full-featured cross-platform mobile application for hotel room reservations, amenities exploration, interactive date pickers, and real-time reservation tracking powered by Flutter and Firebase.',
    category: 'Mobile (Flutter)',
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Provider / BLoC', 'Google Maps API'],
    highlights: [
      'Real-time room availability sync via Cloud Firestore snapshot listeners.',
      'Secure guest authentication with email/password and social login providers.',
      'Smooth custom UI transitions and interactive booking calendar widgets.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 3,
    icon: 'Smartphone',
    architectureBadge: 'Flutter + Firebase'
  },
  {
    title: 'Festival Rumours Mobile App',
    tagline: 'Event Discovery, Community Social Feeds & Interactive Schedules Mobile Platform',
    description: 'Interactive mobile application connecting festival goers with live event lineups, artist timetables, social feeds, community comments, and instant notifications.',
    category: 'Mobile (Flutter)',
    technologies: ['Flutter', 'Dart', 'Firebase FCM', 'Cloud Firestore', 'GetX', 'REST API'],
    highlights: [
      'Dynamic festival event feed with pagination, caching, and instant interaction modules.',
      'Push notification alerts via Firebase Cloud Messaging (FCM) for schedule changes.',
      'Offline-first caching mechanism for seamless offline schedule viewing.'
    ],
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 4,
    icon: 'Sparkles',
    architectureBadge: 'Flutter + FCM'
  }
];

export const skillsData = [
  // DevOps & Cloud
  { name: 'AWS (EC2, S3, Lambda, CLI)', category: 'DevOps & Cloud', level: 90, iconName: 'Cloud', tags: ['Cloud', 'EC2', 'S3', 'IAM'], featuredIn3D: false, order: 1 },
  { name: 'Microsoft Azure Administration', category: 'DevOps & Cloud', level: 85, iconName: 'Cloud', tags: ['Azure Admin', 'AZ-104'], featuredIn3D: false, order: 2 },
  { name: 'Docker (Compose, Multi-Stage, Hub)', category: 'DevOps & Cloud', level: 95, iconName: 'Container', tags: ['Containers', 'Compose', 'Multi-stage'], featuredIn3D: false, order: 3 },
  { name: 'Kubernetes (Pods, Deployments)', category: 'DevOps & Cloud', level: 85, iconName: 'Server', tags: ['Pods', 'Services', 'Ingress'], featuredIn3D: false, order: 4 },
  { name: 'CI/CD Automation (GitHub Actions)', category: 'DevOps & Cloud', level: 92, iconName: 'Workflow', tags: ['Automation', 'Pipelines', 'YAML'], featuredIn3D: false, order: 5 },
  { name: 'Terraform (IaC)', category: 'DevOps & Cloud', level: 85, iconName: 'Code2', tags: ['Infrastructure as Code', 'State', 'Modules'], featuredIn3D: false, order: 6 },
  { name: 'Linux Admin & Networking', category: 'DevOps & Cloud', level: 88, iconName: 'Terminal', tags: ['Ubuntu', 'Debian', 'Systemd', 'SSH'], featuredIn3D: false, order: 7 },
  { name: 'Shell Scripting', category: 'DevOps & Cloud', level: 90, iconName: 'Code', tags: ['Bash', 'Automation', 'Cron'], featuredIn3D: false, order: 8 },

  // Mobile Dev
  { name: 'Flutter Framework', category: 'Mobile Dev', level: 92, iconName: 'Smartphone', tags: ['Cross-Platform', 'Widgets', 'Canvas'], featuredIn3D: false, order: 9 },
  { name: 'Dart Language', category: 'Mobile Dev', level: 90, iconName: 'FileCode', tags: ['OOP', 'Async/Await', 'Streams'], featuredIn3D: false, order: 10 },
  { name: 'State Management (BLoC, Provider, GetX)', category: 'Mobile Dev', level: 88, iconName: 'Activity', tags: ['BLoC', 'Provider', 'GetX'], featuredIn3D: false, order: 11 },
  { name: 'Mobile UI/UX Implementation', category: 'Mobile Dev', level: 90, iconName: 'Layout', tags: ['Responsive', 'Animations', 'Material 3'], featuredIn3D: false, order: 12 },

  // Firebase
  { name: 'Firebase Authentication', category: 'Firebase', level: 92, iconName: 'Key', tags: ['OAuth', 'JWT', 'Security'], featuredIn3D: false, order: 13 },
  { name: 'Cloud Firestore', category: 'Firebase', level: 90, iconName: 'Database', tags: ['Realtime', 'Indexes', 'Rules'], featuredIn3D: false, order: 14 },
  { name: 'Cloud Messaging (FCM)', category: 'Firebase', level: 86, iconName: 'Bell', tags: ['Push Notifications', 'Topics'], featuredIn3D: false, order: 15 },

  // Tools & Practices
  { name: 'Git & GitHub', category: 'Tools & Practices', level: 95, iconName: 'GitBranch', tags: ['Branches', 'PRs', 'Actions'], featuredIn3D: false, order: 16 },
  { name: 'Jira & Agile/Scrum', category: 'Tools & Practices', level: 88, iconName: 'CheckSquare', tags: ['Sprints', 'Kanban', 'Estimations'], featuredIn3D: false, order: 17 },
  { name: 'VS Code, Android Studio & Xcode', category: 'Tools & Practices', level: 90, iconName: 'Monitor', tags: ['Emulators', 'Profiling', 'Debugger'], featuredIn3D: false, order: 18 }
];

export const certificationsData = [
  {
    title: 'Microsoft Certified: DevOps Engineer Expert',
    issuer: 'Microsoft',
    period: 'Earned Sep 15, 2026',
    type: 'Certification',
    order: 1,
    description: 'Credential ID 8410A366B8A7F000, Certification No. BCCAB4-H8D6D7 — Expires Sep 16, 2027.',
    topics: ['Azure DevOps', 'CI/CD', 'Infrastructure as Code', 'Kubernetes'],
    credentialUrl: 'https://learn.microsoft.com/en-us/users/syedsherazamjad/credentials'
  },
  {
    title: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    period: 'Earned Sep 15, 2026',
    type: 'Certification',
    order: 2,
    description: 'Credential ID 678FF686B7872ECA, Certification No. 3514C3-49E8D4 — Expires Sep 16, 2027.',
    topics: ['Azure Compute', 'Azure Storage', 'Azure Networking', 'Azure Security'],
    credentialUrl: 'https://learn.microsoft.com/en-us/users/syedsherazamjad/credentials'
  },
  {
    title: 'DevOps Training & Infrastructure Automation',
    issuer: 'Udemy',
    instructor: 'Imran Teli',
    period: '2025 – 2026',
    type: 'Training',
    order: 3,
    description: 'Comprehensive hands-on training covering Docker, Docker Compose, Linux internals, networking protocols, Git/GitHub, CI/CD automated deployment pipelines, and virtualization workflows.',
    topics: ['Docker & Compose', 'Linux Fundamentals', 'Networking', 'Git & CI/CD Pipelines', 'Deployment Workflows']
  },
  {
    title: 'Self-Directed DevOps & Cloud Architecture',
    issuer: 'Self-Directed Learning',
    instructor: 'Abhishek Veeramalla',
    period: '2025 – 2026',
    type: 'Self-Directed',
    order: 4,
    description: 'Deep-dive practical implementation of AWS cloud services, Kubernetes cluster administration, GitHub Actions automated CI/CD pipelines, and real-world DevOps production workflows.',
    topics: ['AWS (EC2, S3, IAM, VPC)', 'Kubernetes', 'CI/CD Pipelines', 'Production DevOps Projects']
  },
  {
    title: 'Bachelor of Science in Computer Science (BSCS)',
    issuer: 'National University of Modern Languages (NUML)',
    instructor: 'Faculty of CS',
    period: 'Oct 2021 – Sep 2025',
    type: 'Education',
    order: 5,
    description: 'Graduated with core foundations in Data Structures, Algorithms, Distributed Systems, Software Engineering, Database Systems, Computer Networks, and Mobile Application Development.',
    topics: ['Algorithms & Data Structures', 'Software Engineering', 'Database Management Systems', 'Networking & OS']
  },
  {
    title: 'Flutter Internship Certificate',
    issuer: 'Semicolons Tech',
    period: 'Sep 2025 – Feb 2026',
    type: 'Training',
    order: 6,
    description: 'Successfully completed 6-month internship in Flutter mobile application development.',
    topics: ['Flutter', 'Dart', 'Mobile Dev', 'Firebase'],
    credentialUrl: '/semicolons-cert.pdf'
  },
  {
    title: 'DevOps Internship Letter',
    issuer: 'Ebryx (Pvt.) Ltd',
    period: 'Apr 2026 – Jul 2026',
    type: 'Training',
    order: 7,
    description: 'Experience letter confirming DevOps internship completion at a leading cybersecurity firm.',
    topics: ['DevOps', 'Docker', 'GitHub Actions', 'CI/CD'],
    credentialUrl: '/ebryx-letter.pdf'
  }
];

export const personalInfoData = {
  name: 'Syed Sheraz Amjad',
  titles: ['DevOps Engineer', 'Flutter Mobile Developer'],
  location: 'Lahore, Pakistan',
  phone: '+92 306 9275494',
  email: 'sherazamjad933@gmail.com',
  tagline: 'Results-driven BSCS graduate and Microsoft Certified DevOps Engineer Expert',
  shortBio: 'Results-driven BSCS graduate and Microsoft Certified DevOps Engineer Expert, with hands-on experience across AWS (EC2, S3, Lambda, CLI), Microsoft Azure, Docker, Kubernetes, CI/CD automation (GitHub Actions), Terraform (IaC), Linux administration, and shell scripting. Currently working as a DevOps Engineer at Zemotify, leading server migrations and security remediation. Also experienced in Flutter mobile development, building production iOS and Android applications.',
  links: {
    github: 'https://github.com/sheraz-amjad',
    linkedin: 'https://www.linkedin.com/in/syed-sheraz-amjad',
    email: 'mailto:sherazamjad933@gmail.com',
    phone: 'tel:+923069275494'
  }
};
