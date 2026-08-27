export const experiencesData = [
  {
    title: 'DevOps Engineer',
    company: 'Zemotify',
    period: 'Jun 2026 – Present',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 1,
    description: [
      'Led the end-to-end migration of all company websites and microservices from a compromised server to a brand new, hardened production server following a major infrastructure security incident.',
      'Conducted extensive pre-migration forensic security audits and malware scans across hosted web applications, file directories, and backend databases.',
      'Authored custom, automated Bash/shell scripts to recursively inspect files, sanitize databases, and isolate suspicious malicious scripts before cutover.',
      'Hardened Linux OS configurations, applied firewall rules (UFW/iptables), set up log auditing, and implemented real-time monitoring and alerting.',
      'Coordinated DNS routing, SSL provisioning, and zero-downtime server reconfiguration for smooth production cutover.'
    ],
    technologies: ['Linux Administration', 'Shell Scripting', 'Server Security', 'Malware Scanning', 'DNS Management', 'Nginx', 'Monitoring']
  },
  {
    title: 'Full Stack Engineer (DevOps & MERN)',
    company: 'Ebryx',
    period: 'Mar 2026 – May 2026',
    location: 'Pakistan (3 Months)',
    roleType: 'Full Stack',
    order: 2,
    description: [
      'Engineered full-stack features across the MERN stack while taking direct ownership of DevOps workflows, containerization, and automated deployments.',
      'Containerized multi-service MERN applications using Docker, leveraging multi-stage builds to significantly shrink production image footprints and improve container startup times.',
      'Designed, built, and maintained robust CI/CD pipelines utilizing GitHub Actions, slashing deployment cycles from ~10 minutes down to ~3 minutes.',
      'Administered Docker containers, volumes, networks, health checks, and image registries (Docker Hub).',
      'Actively collaborated in Agile/Scrum ceremonies, code reviews, and tracked iterative deliverables in Jira.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'GitHub Actions', 'CI/CD', 'Jira', 'Agile']
  },
  {
    title: 'Flutter Developer',
    company: 'Semicolon',
    period: 'Sep 2025 – Feb 2026',
    location: 'Pakistan (6 Months)',
    roleType: 'Mobile',
    order: 3,
    description: [
      'Architected, enhanced, and maintained the production Joya Hotel App, implementing intuitive room booking workflows, sleek UI animations, and seamless in-app routing.',
      'Engineered the Festival Rumours App from concept to launch, incorporating dynamic event discovery feeds, interactive user commenting, and bookmarking modules.',
      'Integrated Firebase Authentication, Cloud Firestore real-time data sync, and Cloud Storage for media assets.',
      'Conducted profiling, memory leak detection, and UI rendering optimizations across diverse Android and iOS devices.',
      'Collaborated using Git/GitHub version control, following MVVM architecture and clean code standards.'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'MVVM', 'State Management', 'Android Studio', 'Git']
  }
];

export const projectsData = [
  {
    title: 'Netflix Clone (Full Stack + DevOps)',
    tagline: 'Containerized MERN Streaming Clone Deployed on AWS EC2 via Automated CI/CD',
    description: 'A full-stack media streaming web application built with the MERN stack. Fully containerized with Docker multi-stage builds and continuously deployed to AWS EC2 using automated GitHub Actions pipelines.',
    category: 'DevOps & Cloud',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'AWS EC2', 'GitHub Actions', 'Nginx', 'Tailwind CSS'],
    highlights: [
      'Automated CI/CD pipeline triggering automated build, test, Docker image push to Docker Hub, and zero-downtime SSH deployment to AWS EC2.',
      'Docker multi-stage builds optimizing production bundle size by over 60%.',
      'Nginx reverse proxy with gzip compression, caching, and rate limiting configured on EC2.',
      'Responsive video catalog UI with dynamic genre filtering and authentication.'
    ],
    githubUrl: 'https://github.com/sherazamjad',
    liveUrl: '',
    featured: true,
    order: 1,
    icon: 'Cloud',
    architectureBadge: 'AWS EC2 + CI/CD'
  },
  {
    title: 'Malware Scan & Automated Server Migration',
    tagline: 'Custom Shell Automation Engine for Incident Recovery, Security Audits & Low-Downtime Cutover',
    description: 'Comprehensive shell scripting automation suite designed to inspect file systems, isolate malicious patterns, sanitize databases, and orchestrate low-downtime server migrations for compromised production servers.',
    category: 'Security & Automation',
    technologies: ['Bash / Shell Scripting', 'Linux (Ubuntu/CentOS)', 'Security Auditing', 'Nginx', 'Crontab', 'Regex Scanner'],
    highlights: [
      'Custom regex patterns detecting obfuscated eval(), base64 payloads, and backdoor webshells.',
      'Automated database sanitation pipelines removing injected script tags and corrupt payloads.',
      'Zero-loss data backup, directory synchronisation, and low-downtime DNS cutover orchestration.'
    ],
    githubUrl: 'https://github.com/sherazamjad',
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
    githubUrl: 'https://github.com/sherazamjad',
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
    githubUrl: 'https://github.com/sherazamjad',
    liveUrl: '',
    featured: true,
    order: 4,
    icon: 'Sparkles',
    architectureBadge: 'Flutter + FCM'
  }
];

export const skillsData = [
  // DevOps & Cloud
  { name: 'AWS (EC2, S3, Lambda, CLI)', category: 'DevOps & Cloud', level: 90, iconName: 'Cloud', tags: ['Cloud', 'EC2', 'S3', 'IAM'], featuredIn3D: true, order: 1 },
  { name: 'Docker (Compose, Multi-Stage, Hub)', category: 'DevOps & Cloud', level: 95, iconName: 'Container', tags: ['Containers', 'Compose', 'Multi-stage'], featuredIn3D: true, order: 2 },
  { name: 'CI/CD (GitHub Actions)', category: 'DevOps & Cloud', level: 92, iconName: 'Workflow', tags: ['Automation', 'Pipelines', 'YAML'], featuredIn3D: true, order: 3 },
  { name: 'Linux Administration', category: 'DevOps & Cloud', level: 88, iconName: 'Terminal', tags: ['Ubuntu', 'Debian', 'Systemd', 'SSH'], featuredIn3D: true, order: 4 },
  { name: 'Networking & Security', category: 'DevOps & Cloud', level: 85, iconName: 'Shield', tags: ['DNS', 'Firewalls', 'Nginx', 'SSL/TLS'], featuredIn3D: false, order: 5 },
  { name: 'Shell / Bash Scripting', category: 'DevOps & Cloud', level: 90, iconName: 'Code2', tags: ['Automation', 'Malware Scan', 'Cron'], featuredIn3D: false, order: 6 },

  // Full Stack (MERN)
  { name: 'MongoDB & Mongoose', category: 'Full Stack (MERN)', level: 88, iconName: 'Database', tags: ['NoSQL', 'Aggregation', 'Atlas'], featuredIn3D: true, order: 7 },
  { name: 'Express.js', category: 'Full Stack (MERN)', level: 90, iconName: 'Server', tags: ['REST API', 'Middleware', 'Auth'], featuredIn3D: true, order: 8 },
  { name: 'React.js & TypeScript', category: 'Full Stack (MERN)', level: 92, iconName: 'Code', tags: ['Hooks', 'Vite', 'State'], featuredIn3D: true, order: 9 },
  { name: 'Node.js', category: 'Full Stack (MERN)', level: 90, iconName: 'Cpu', tags: ['Event Loop', 'Streams', 'Async'], featuredIn3D: true, order: 10 },
  { name: 'REST APIs & Webhooks', category: 'Full Stack (MERN)', level: 92, iconName: 'Network', tags: ['JSON', 'CORS', 'HTTP/2'], featuredIn3D: false, order: 11 },
  { name: 'Containerized App Deployment', category: 'Full Stack (MERN)', level: 94, iconName: 'Layers', tags: ['PM2', 'Nginx', 'Microservices'], featuredIn3D: false, order: 12 },

  // Mobile Dev
  { name: 'Flutter Framework', category: 'Mobile Dev', level: 92, iconName: 'Smartphone', tags: ['Cross-Platform', 'Widgets', 'Canvas'], featuredIn3D: true, order: 13 },
  { name: 'Dart Language', category: 'Mobile Dev', level: 90, iconName: 'FileCode', tags: ['OOP', 'Async/Await', 'Streams'], featuredIn3D: false, order: 14 },
  { name: 'State Management (BLoC, Provider, GetX)', category: 'Mobile Dev', level: 88, iconName: 'Activity', tags: ['BLoC', 'Provider', 'GetX'], featuredIn3D: false, order: 15 },
  { name: 'Mobile UI/UX Implementation', category: 'Mobile Dev', level: 90, iconName: 'Layout', tags: ['Responsive', 'Animations', 'Material 3'], featuredIn3D: false, order: 16 },

  // Firebase
  { name: 'Firebase Authentication', category: 'Firebase', level: 92, iconName: 'Key', tags: ['OAuth', 'JWT', 'Security'], featuredIn3D: true, order: 17 },
  { name: 'Cloud Firestore', category: 'Firebase', level: 90, iconName: 'Database', tags: ['Realtime', 'Indexes', 'Rules'], featuredIn3D: false, order: 18 },
  { name: 'Cloud Messaging (FCM)', category: 'Firebase', level: 86, iconName: 'Bell', tags: ['Push Notifications', 'Topics'], featuredIn3D: false, order: 19 },
  { name: 'Firebase Storage', category: 'Firebase', level: 88, iconName: 'Folder', tags: ['Media Assets', 'Buckets'], featuredIn3D: false, order: 20 },

  // Tools & Practices
  { name: 'Git & GitHub', category: 'Tools & Practices', level: 95, iconName: 'GitBranch', tags: ['Branches', 'PRs', 'Actions'], featuredIn3D: true, order: 21 },
  { name: 'Jira & Agile / Scrum', category: 'Tools & Practices', level: 88, iconName: 'CheckSquare', tags: ['Sprints', 'Kanban', 'Estimations'], featuredIn3D: false, order: 22 },
  { name: 'SDLC & CI/CD Workflows', category: 'Tools & Practices', level: 90, iconName: 'Sliders', tags: ['DevSecOps', 'Testing', 'Deployment'], featuredIn3D: false, order: 23 },
  { name: 'VS Code, Android Studio & Xcode', category: 'Tools & Practices', level: 90, iconName: 'Monitor', tags: ['Emulators', 'Profiling', 'Debugger'], featuredIn3D: false, order: 24 }
];

export const certificationsData = [
  {
    title: 'DevOps Training & Infrastructure Automation',
    issuer: 'Udemy',
    instructor: 'Imran Teli',
    period: '2025 – 2026',
    type: 'Training',
    order: 1,
    description: 'Comprehensive hands-on training covering Docker, Docker Compose, Linux internals, networking protocols, Git/GitHub, CI/CD automated deployment pipelines, and virtualization workflows.',
    topics: ['Docker & Compose', 'Linux Fundamentals', 'Networking', 'Git & CI/CD Pipelines', 'Deployment Workflows']
  },
  {
    title: 'Self-Directed DevOps & Cloud Architecture',
    issuer: 'Self-Directed Learning',
    instructor: 'Abhishek Veeramalla',
    period: '2025 – 2026',
    type: 'Self-Directed',
    order: 2,
    description: 'Deep-dive practical implementation of AWS cloud services, Kubernetes cluster administration, GitHub Actions automated CI/CD pipelines, and real-world DevOps production workflows.',
    topics: ['AWS (EC2, S3, IAM, VPC)', 'Kubernetes', 'CI/CD Pipelines', 'Production DevOps Projects']
  },
  {
    title: 'Bachelor of Science in Computer Science (BSCS)',
    issuer: 'National University of Modern Languages (NUML)',
    instructor: 'Faculty of CS',
    period: 'Oct 2021 – Sep 2025',
    type: 'Education',
    order: 3,
    description: 'Graduated with core foundations in Data Structures, Algorithms, Distributed Systems, Software Engineering, Database Systems, Computer Networks, and Mobile Application Development.',
    topics: ['Algorithms & Data Structures', 'Software Engineering', 'Database Management Systems', 'Networking & OS']
  }
];

export const personalInfoData = {
  name: 'Syed Sheraz Amjad',
  titles: ['DevOps Engineer', 'Flutter Mobile Developer', 'MERN Full Stack Engineer'],
  location: 'Lahore, Pakistan',
  phone: '+92 306 9275494',
  email: 'sherazamjad933@gmail.com',
  tagline: 'Building, containerizing, and deploying scalable full-stack (MERN) applications end-to-end',
  shortBio: 'BSCS graduate specializing in DevOps and Full Stack Engineering with hands-on Flutter mobile development experience. Skilled in AWS, Docker, CI/CD (GitHub Actions), Linux administration, networking, and shell scripting for automated security and malware scanning.',
  links: {
    github: 'https://github.com/sherazamjad',
    linkedin: 'https://www.linkedin.com/in/syed-sheraz-amjad',
    email: 'mailto:sherazamjad933@gmail.com',
    phone: 'tel:+923069275494'
  }
};
