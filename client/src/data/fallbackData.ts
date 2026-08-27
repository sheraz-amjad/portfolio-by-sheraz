import {
  PersonalInfo,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem
} from '../types';

export const fallbackProfile: PersonalInfo = {
  name: 'Syed Sheraz Amjad',
  titles: ['DevOps Engineer', 'Flutter Mobile Developer', 'Full Stack MERN Engineer'],
  location: 'Lahore, Pakistan',
  phone: '+92 306 9275494',
  email: 'sherazamjad933@gmail.com',
  tagline: 'Building, containerizing, and deploying scalable full-stack (MERN) applications end-to-end',
  shortBio: 'BSCS graduate transitioning into DevOps and Full Stack Engineering, with hands-on Flutter mobile development experience. Skilled in AWS, Docker, CI/CD (GitHub Actions), Linux administration, networking, and shell scripting for automated security/malware scanning.',
  links: {
    github: 'https://github.com/sherazamjad',
    linkedin: 'https://www.linkedin.com/in/syed-sheraz-amjad',
    email: 'mailto:sherazamjad933@gmail.com',
    phone: 'tel:+923069275494'
  }
};

export const fallbackExperiences: ExperienceItem[] = [
  {
    title: 'DevOps Engineer',
    company: 'Zemotify',
    period: 'Jun 2026 – Present',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 1,
    description: [
      'Led migration of company websites from a compromised server to a new, secure server after an attack.',
      'Performed security and malware scans across all hosted websites prior to migration.',
      'Wrote custom shell scripts to automatically scan files/databases for malware and suspicious code.',
      'Hardened server configuration and set up monitoring and continuous logs auditing.',
      'Coordinated DNS and server reconfiguration for low-downtime cutover.'
    ],
    technologies: ['Linux Administration', 'Shell Scripting', 'Server Hardening', 'Malware Scanning', 'DNS Management', 'Nginx']
  },
  {
    title: 'Full Stack Engineer (DevOps & MERN)',
    company: 'Ebryx',
    period: 'Mar 2026 – May 2026',
    location: 'Pakistan (3 Months)',
    roleType: 'Full Stack',
    order: 2,
    description: [
      'Worked across the MERN stack alongside core DevOps responsibilities.',
      'Containerized MERN applications with Docker, including multi-stage builds for optimized production images.',
      'Built and maintained CI/CD pipelines with GitHub Actions, cutting deployment time from ~10 minutes to ~3 minutes.',
      'Managed Docker images, containers, volumes, and logs; pushed images to Docker Hub.',
      'Tracked sprints in Jira, participated in Agile ceremonies and code reviews.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'GitHub Actions', 'Jira', 'Agile']
  },
  {
    title: 'Flutter Developer',
    company: 'Semicolon',
    period: 'Sep 2025 – Feb 2026',
    location: 'Pakistan (6 Months)',
    roleType: 'Mobile',
    order: 3,
    description: [
      'Developed and maintained the Joya Hotel App (full booking flow, UI enhancements, in-app navigation).',
      'Built the Festival Rumours App (event-based data display, user interaction modules).',
      'Improved UI/UX and performed debugging/performance optimization across devices.',
      'Worked with Flutter, Dart, Firebase, Git/GitHub, Android Studio.'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'MVVM', 'Android Studio', 'Git']
  }
];

export const fallbackProjects: ProjectItem[] = [
  {
    title: 'Netflix Clone (Full Stack + DevOps)',
    tagline: 'Containerized MERN Streaming Platform with Automated CI/CD to AWS EC2',
    description: 'Full-stack media streaming platform clone. Containerized with Docker multi-stage builds and automated deployment to AWS EC2 via GitHub Actions CI/CD.',
    category: 'DevOps & Cloud',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'AWS EC2', 'GitHub Actions', 'Nginx'],
    highlights: [
      'Automated CI/CD with GitHub Actions cutting deployment cycle down to ~3 minutes.',
      'Multi-stage Docker builds reducing production container size significantly.',
      'Nginx reverse proxy with caching and gzip compression configured on EC2.',
      'Full authentication and responsive media player UI.'
    ],
    githubUrl: 'https://github.com/sherazamjad',
    liveUrl: '',
    featured: true,
    order: 1,
    icon: 'Cloud',
    architectureBadge: 'AWS EC2 + CI/CD'
  },
  {
    title: 'Malware Scan & Server Migration',
    tagline: 'Automated Shell Scripting Engine for Incident Response & Low-Downtime Migration',
    description: 'Custom shell scripts to automatically scan files and databases for malware post-attack; hardened Linux configurations and migrated production sites with minimal downtime.',
    category: 'Security & Automation',
    technologies: ['Shell Scripting', 'Linux Admin', 'Server Hardening', 'Regex Scanners', 'DNS Cutover'],
    highlights: [
      'Custom regex patterns detecting obfuscated eval(), webshells, and backdoors.',
      'Database sanitization pipelines isolating malicious payloads.',
      'Smooth server cutover with near-zero downtime.'
    ],
    githubUrl: 'https://github.com/sherazamjad',
    liveUrl: '',
    featured: true,
    order: 2,
    icon: 'ShieldCheck',
    architectureBadge: 'Shell & Security'
  },
  {
    title: 'Joya Hotel App',
    tagline: 'Cross-Platform Hospitality Reservation App with Real-Time Booking',
    description: 'Hospitality booking mobile app with real-time reservations via Firebase Firestore, guest authentication, and custom interactive UI navigation.',
    category: 'Mobile (Flutter)',
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Provider', 'UI/UX'],
    highlights: [
      'Complete booking flow with interactive room calendars and amenity selectors.',
      'Real-time Firestore listeners ensuring synced room availability.',
      'Optimized 60fps animations and responsive UI across tablet and phone screens.'
    ],
    githubUrl: 'https://github.com/sherazamjad',
    liveUrl: '',
    featured: true,
    order: 3,
    icon: 'Smartphone',
    architectureBadge: 'Flutter + Firebase'
  },
  {
    title: 'Festival Rumours App',
    tagline: 'Event Discovery, Live Schedules & Interactive Social Feeds Platform',
    description: 'Event-based discovery mobile application with feeds, user likes/comments, dynamic content loading, and real-time push notifications.',
    category: 'Mobile (Flutter)',
    technologies: ['Flutter', 'Dart', 'Firebase FCM', 'Cloud Firestore', 'GetX', 'REST API'],
    highlights: [
      'Dynamic festival event feed with pagination, caching, and instant interaction modules.',
      'Push notification alerts via Firebase Cloud Messaging (FCM).',
      'Offline-first caching mechanism for festival timetables.'
    ],
    githubUrl: 'https://github.com/sherazamjad',
    liveUrl: '',
    featured: true,
    order: 4,
    icon: 'Sparkles',
    architectureBadge: 'Flutter + FCM'
  }
];

export const fallbackSkills: SkillItem[] = [
  // DevOps & Cloud
  { name: 'AWS (EC2, S3, Lambda, CLI)', category: 'DevOps & Cloud', level: 90, iconName: 'Cloud', tags: ['EC2', 'S3', 'Lambda', 'IAM'], featuredIn3D: true, order: 1 },
  { name: 'Docker (Compose, Multi-Stage, Hub)', category: 'DevOps & Cloud', level: 95, iconName: 'Container', tags: ['Containers', 'Compose', 'Multi-stage'], featuredIn3D: true, order: 2 },
  { name: 'CI/CD (GitHub Actions)', category: 'DevOps & Cloud', level: 92, iconName: 'Workflow', tags: ['Automation', 'Pipelines', 'YAML'], featuredIn3D: true, order: 3 },
  { name: 'Linux Administration', category: 'DevOps & Cloud', level: 88, iconName: 'Terminal', tags: ['Ubuntu', 'Systemd', 'SSH'], featuredIn3D: true, order: 4 },
  { name: 'Networking & Firewalls', category: 'DevOps & Cloud', level: 85, iconName: 'Shield', tags: ['DNS', 'Nginx', 'UFW', 'Ports'], featuredIn3D: false, order: 5 },
  { name: 'Shell Scripting', category: 'DevOps & Cloud', level: 90, iconName: 'Code2', tags: ['Bash', 'Automation', 'Malware Scan'], featuredIn3D: false, order: 6 },

  // Full Stack (MERN)
  { name: 'MongoDB & Mongoose', category: 'Full Stack (MERN)', level: 88, iconName: 'Database', tags: ['NoSQL', 'Atlas', 'Schemas'], featuredIn3D: true, order: 7 },
  { name: 'Express.js', category: 'Full Stack (MERN)', level: 90, iconName: 'Server', tags: ['REST API', 'Routing', 'Middleware'], featuredIn3D: true, order: 8 },
  { name: 'React.js & TypeScript', category: 'Full Stack (MERN)', level: 92, iconName: 'Code', tags: ['Hooks', 'Vite', 'State'], featuredIn3D: true, order: 9 },
  { name: 'Node.js', category: 'Full Stack (MERN)', level: 90, iconName: 'Cpu', tags: ['Event Loop', 'Async', 'NPM'], featuredIn3D: true, order: 10 },
  { name: 'REST APIs', category: 'Full Stack (MERN)', level: 92, iconName: 'Network', tags: ['JSON', 'HTTP/2', 'CORS'], featuredIn3D: false, order: 11 },
  { name: 'Containerized Deployment', category: 'Full Stack (MERN)', level: 94, iconName: 'Layers', tags: ['PM2', 'Nginx', 'EC2'], featuredIn3D: false, order: 12 },

  // Mobile Dev
  { name: 'Flutter Framework', category: 'Mobile Dev', level: 92, iconName: 'Smartphone', tags: ['Cross-Platform', 'Widgets', 'Canvas'], featuredIn3D: true, order: 13 },
  { name: 'Dart Language', category: 'Mobile Dev', level: 90, iconName: 'FileCode', tags: ['OOP', 'Async', 'Null Safety'], featuredIn3D: false, order: 14 },
  { name: 'State Management (BLoC/Provider/GetX)', category: 'Mobile Dev', level: 88, iconName: 'Activity', tags: ['BLoC', 'Provider', 'GetX'], featuredIn3D: false, order: 15 },
  { name: 'Mobile UI/UX Implementation', category: 'Mobile Dev', level: 90, iconName: 'Layout', tags: ['Responsive', 'Animations'], featuredIn3D: false, order: 16 },

  // Firebase
  { name: 'Firebase Authentication', category: 'Firebase', level: 92, iconName: 'Key', tags: ['OAuth', 'Security Rules'], featuredIn3D: true, order: 17 },
  { name: 'Cloud Firestore', category: 'Firebase', level: 90, iconName: 'Database', tags: ['Real-time', 'NoSQL'], featuredIn3D: false, order: 18 },
  { name: 'Cloud Messaging (FCM)', category: 'Firebase', level: 86, iconName: 'Bell', tags: ['Push Notifications'], featuredIn3D: false, order: 19 },
  { name: 'Firebase Storage', category: 'Firebase', level: 88, iconName: 'Folder', tags: ['Cloud Buckets', 'Uploads'], featuredIn3D: false, order: 20 },

  // Tools & Practices
  { name: 'Git & GitHub', category: 'Tools & Practices', level: 95, iconName: 'GitBranch', tags: ['PRs', 'Actions', 'Git Flow'], featuredIn3D: true, order: 21 },
  { name: 'Jira & Agile / Scrum', category: 'Tools & Practices', level: 88, iconName: 'CheckSquare', tags: ['Sprints', 'Code Review'], featuredIn3D: false, order: 22 },
  { name: 'SDLC & CI/CD Pipelines', category: 'Tools & Practices', level: 90, iconName: 'Sliders', tags: ['DevSecOps', 'Automation'], featuredIn3D: false, order: 23 },
  { name: 'VS Code, Android Studio & Xcode', category: 'Tools & Practices', level: 90, iconName: 'Monitor', tags: ['IDE', 'Emulators'], featuredIn3D: false, order: 24 }
];

export const fallbackCertifications: CertificationItem[] = [
  {
    title: 'DevOps Training',
    issuer: 'Udemy',
    instructor: 'Imran Teli',
    period: '2025 – 2026',
    type: 'Training',
    order: 1,
    description: 'Docker, Docker Compose, Linux Fundamentals, Networking, Git/GitHub, CI/CD, virtualization, deployment workflows.',
    topics: ['Docker & Compose', 'Linux Fundamentals', 'Networking', 'Git & CI/CD', 'Deployment Workflows']
  },
  {
    title: 'Self-Directed DevOps & Cloud Engineering',
    issuer: 'YouTube / Hands-on Lab',
    instructor: 'Abhishek Veeramalla',
    period: '2025 – 2026',
    type: 'Self-Directed',
    order: 2,
    description: 'AWS, Kubernetes, CI/CD pipelines, Docker, real-world enterprise DevOps projects and zero-downtime releases.',
    topics: ['AWS (EC2, S3, IAM)', 'Kubernetes', 'CI/CD Pipelines', 'Real-world Projects']
  },
  {
    title: 'Bachelor of Science in Computer Science (BSCS)',
    issuer: 'National University of Modern Languages',
    instructor: 'Faculty of Computer Science',
    period: 'Oct 2021 – Sep 2025',
    type: 'Education',
    order: 3,
    description: 'BSCS graduate with comprehensive study in algorithms, data structures, network security, operating systems, full-stack architecture, and mobile systems.',
    topics: ['Computer Science', 'Distributed Systems', 'Software Engineering', 'Algorithms']
  }
];
