import {
  PersonalInfo,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem
} from '../types';

export const portfolioProfile: PersonalInfo = {
  name: 'Syed Sheraz Amjad',
  titles: [
    'DevOps Engineer (AZ-400 Expert)',
    'Cloud & Infrastructure Specialist',
    'Azure & AWS Solutions Architect'
  ],
  location: 'Lahore, Pakistan',
  phone: '+92 306 9275494',
  email: 'sherazamjad933@gmail.com',
  tagline: 'Microsoft Certified DevOps Engineer Expert (AZ-400) & Cloud Solutions Architect',
  shortBio: 'Results-oriented Senior DevOps Engineer and Microsoft Certified DevOps Engineer Expert (AZ-400) with deep hands-on expertise across AWS (EC2, S3, Lambda, IAM, CLI), Microsoft Azure, Docker containerization, Kubernetes cluster management, CI/CD automation (GitHub Actions & Azure DevOps), Terraform Infrastructure as Code (IaC), hardened Linux administration, and network security. Proven track record leading emergency incident recovery, zero-downtime production server migrations, and reducing CI/CD deployment cycle times by 95%.',
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
      'Spearheaded full production migration of mission-critical company applications to hardened Linux infrastructure following a security breach on the previous host, achieving **zero downtime cutover**.',
      'Designed, orchestrated, and maintained automated multi-stage CI/CD pipelines using **GitHub Actions & Workflows** for zero-downtime builds, automated testing, and production rollouts.',
      'Containerized legacy and microservice architectures with **Docker & Docker Compose**; configured volumes, health-checks, automated log rotation, and secure registry pushing.',
      'Provisioned and declared reproducible cloud infrastructure using **Terraform (IaC)**, implementing modular templates and remote state locking.',
      'Managed container workloads on **Kubernetes**, configuring resilient pods, deployments, service definitions, and ingress routing.',
      'Conducted end-to-end Linux server hardening: user access controls, **SSH key-only authentication**, **UFW firewall rules**, **Fail2ban intrusion prevention**, and system audit logging.',
      'Engineered automated Bash shell scripts for daily database dumps and web asset backups to offsite remote storage, backed by scheduled **cron automation**.',
      'Configured **Nginx reverse proxies** with Certbot automated SSL/TLS certificate renewal, HTTP/2 termination, Gzip compression, and rate limiting.',
      'Coordinated DNS propagation, upstream load balancer routing, and zero-downtime cutover transitions.',
      'Established system monitoring, uptime tracking, and real-time alerting to prevent infrastructure failures.'
    ],
    technologies: ['GitHub Actions', 'Docker', 'Terraform', 'Kubernetes', 'Linux Admin', 'Nginx', 'Bash Scripting', 'UFW/Fail2ban', 'Monitoring']
  },
  {
    title: 'DevOps Intern',
    company: 'Ebryx (Pvt.) Ltd',
    period: 'Apr 27, 2026 – Jul 15, 2026',
    location: 'Lahore, Pakistan',
    roleType: 'DevOps',
    order: 2,
    description: [
      'Collaborated closely with enterprise DevOps teams provisioning and monitoring cloud infrastructure across **AWS** and **Azure** environments.',
      'Containerized multi-tier backend and frontend applications using Docker, implementing **multi-stage builds** that reduced image sizes by over 60%.',
      'Built, optimized, and maintained automated CI/CD pipelines via **GitHub Actions**, slashing end-to-end deployment cycles from ~10 minutes down to ~30 seconds (95% speedup).',
      'Managed AWS cloud services including **EC2 instances**, **S3 storage buckets**, **AWS Lambda serverless functions**, and **IAM security roles**.',
      'Maintained image repositories on Docker Hub with automated semantic tagging and security vulnerability checks.',
      'Operated within Agile/Scrum sprints tracked via Jira, participating in daily standups, code reviews, and CI/CD post-mortems.',
      'Recognized by engineering leadership for outstanding technical initiative, sincere problem-solving, and reliable delivery.'
    ],
    technologies: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'Microsoft Azure', 'GitHub Actions', 'Jira', 'Linux'],
    downloadUrl: '/syed_sheraz_experience_letter.pdf'
  },
  {
    title: 'Flutter Intern',
    company: 'Semicolons Tech',
    period: 'Sep 05, 2025 – Feb 05, 2026',
    location: 'Lahore, Pakistan',
    roleType: 'Mobile',
    order: 3,
    description: [
      'Engineered and supported production mobile applications including the **Joya Hotel App** (hospitality booking flow) and the **Festival Rumours App** (event feeds).',
      'Architected end-to-end backend integrations utilizing **Firebase Firestore realtime databases**, **Firebase Authentication**, and **Cloud Messaging (FCM)**.',
      'Created custom responsive UI widgets, state management architectures (Provider, BLoC), and RESTful API client synchronization.',
      'Automated app build variants, testing, and store-readiness preparation using Git and Android Studio.',
      'Demonstrated cross-functional agility bridging front-end client applications with cloud backend services.'
    ],
    technologies: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Git', 'Android Studio', 'REST APIs'],
    downloadUrl: '/semicolons_flutter_internship_certificate.pdf'
  }
];

export const portfolioProjects: ProjectItem[] = [
  {
    title: 'Zero-Downtime Server Migration & Infrastructure Hardening',
    tagline: 'Emergency Incident Response, Security Hardening & Zero-Downtime Linux Cutover',
    description: 'Spearheaded critical server migration and emergency security remediation after a host breach, restoring 100% service uptime with zero data loss.',
    category: 'CI/CD & Cloud Infrastructure',
    technologies: ['Linux (Ubuntu)', 'Bash Scripting', 'Nginx', 'UFW & Fail2ban', 'SSL/TLS', 'DNS', 'Cron Backups'],
    highlights: [
      'Neutralized server threat via automated shell scripts scanning malicious code and unauthorized crontabs.',
      'Provisioned brand-new hardened Linux environment with SSH key-only access, UFW firewall, and Fail2ban.',
      'Configured Nginx reverse proxy with Certbot SSL/TLS auto-renewal and Gzip compression.',
      'Executed coordinated DNS record cutover and live database synchronization with zero downtime.'
    ],
    caseStudy: {
      problem: 'A production server hosting commercial web applications suffered a security breach, leaving it vulnerable to malicious script injections and risking severe downtime and data compromise.',
      solution: 'Conducted emergency forensic triage, wrote custom Bash shell scripts to isolate and scan compromised assets, provisioned a brand-new hardened production Linux server with strict firewall policies and Nginx reverse proxying, and orchestrated an automated DNS cutover.',
      tools: ['Ubuntu Linux', 'Nginx Reverse Proxy', 'Bash Shell Scripting', 'Certbot (SSL/TLS)', 'UFW Firewall', 'Fail2ban', 'Cron Automation'],
      result: 'Restored 100% application uptime with zero data loss or customer disruption, eliminated all known attack vectors, and instituted automated daily encrypted offsite backups.',
      metrics: [
        { label: 'Migration Downtime', value: '0 min' },
        { label: 'Data Loss', value: '0%' },
        { label: 'Backup Automation', value: 'Daily Encrypted' }
      ]
    },
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 1,
    icon: 'ShieldCheck',
    architectureBadge: 'Linux Hardening + DNS'
  },
  {
    title: 'High-Velocity Automated CI/CD Deployment Pipeline',
    tagline: 'Multi-Stage Docker Containerization & Automated GitHub Actions Workflows',
    description: 'Architected and automated continuous deployment workflows that slashed release duration by 95% while eliminating production configuration drift.',
    category: 'CI/CD & Cloud Infrastructure',
    technologies: ['GitHub Actions', 'Docker', 'AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker Hub', 'Linux'],
    highlights: [
      'Built multi-stage Dockerfiles optimizing production image footprints by over 60%.',
      'Configured automated CI/CD pipeline triggers on push/pull requests with linting and unit testing gates.',
      'Automated secure deployment to AWS EC2 using SSH keyscan and zero-downtime container replacement.',
      'Cut deployment cycle from ~10 minutes down to ~30 seconds.'
    ],
    caseStudy: {
      problem: 'Engineering teams spent 10+ minutes per manual release over fragile SSH commands, leading to configuration drift, deployment anxiety, and release delays.',
      solution: 'Engineered a declarative CI/CD pipeline in GitHub Actions with multi-stage Docker build caching, automated test gates, semantic image tagging pushed to Docker Hub, and automated SSH-based deployment to AWS EC2.',
      tools: ['GitHub Actions CI/CD', 'Docker Multi-Stage', 'AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker Hub Registry', 'Linux Shell'],
      result: 'Deployment time reduced from 10 minutes to ~30 seconds (95% speedup), ensuring deterministic, repeatable releases with zero configuration drift.',
      metrics: [
        { label: 'Deployment Time', value: '~30 sec' },
        { label: 'Cycle Speedup', value: '95%' },
        { label: 'Image Size Reduction', value: '60%' }
      ]
    },
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 2,
    icon: 'Workflow',
    architectureBadge: 'GitHub Actions + Docker'
  },
  {
    title: 'Automated Media Streaming Cloud Infrastructure (Netflix Clone)',
    tagline: 'Containerized Microservices Architecture with Automated Deployment to AWS EC2',
    description: 'End-to-end containerized full-stack streaming platform with automated GitHub Actions CI/CD, Nginx reverse proxying, and AWS EC2 hosting.',
    category: 'CI/CD & Cloud Infrastructure',
    technologies: ['Docker Compose', 'AWS EC2', 'GitHub Actions', 'Nginx', 'Linux', 'Node.js'],
    highlights: [
      'Containerized full-stack client, backend APIs, and database with Docker Compose.',
      'Automated build, test, and container rollout to AWS EC2 instances via GitHub Actions.',
      'Configured reverse proxying, SSL encryption, and health checks for production traffic routing.'
    ],
    caseStudy: {
      problem: 'Deploying a complex streaming platform with multiple microservices, video streaming assets, and databases required reproducible environment isolation and automated updates.',
      solution: 'Engineered a multi-container Docker Compose architecture hosted on AWS EC2, fronted by an Nginx reverse proxy, and integrated with GitHub Actions CI/CD workflows for hands-free rollouts.',
      tools: ['Docker Compose', 'AWS EC2', 'GitHub Actions', 'Nginx Reverse Proxy', 'Ubuntu Linux', 'Node.js'],
      result: 'Automated 100% of the build and deployment lifecycle with instantaneous rollout verification and automated health-check monitoring.',
      metrics: [
        { label: 'Rollout Automation', value: '100%' },
        { label: 'Architecture', value: 'Microservices' },
        { label: 'Cloud Hosting', value: 'AWS EC2' }
      ]
    },
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: true,
    order: 3,
    icon: 'Cloud',
    architectureBadge: 'Docker + AWS EC2'
  },
  {
    title: 'Enterprise Cross-Platform Mobile Applications & Cloud Backend',
    tagline: 'Hospitality & Event Discovery Apps with Real-Time Firebase Synchronization',
    description: 'Production Flutter applications serving hospitality and lifestyle users with real-time Firestore database synchronization and automated build automation.',
    category: 'Mobile & Cloud Integration',
    technologies: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'FCM', 'Git', 'Android Studio'],
    highlights: [
      'Developed Joya Hotel App with comprehensive real-time room booking and reservation workflows.',
      'Built Festival Rumours App with dynamic interactive feeds and push notifications via FCM.',
      'Implemented clean MVVM architecture, state management, and sub-100ms Firebase database queries.'
    ],
    caseStudy: {
      problem: 'Hospitality and lifestyle clients needed cross-platform apps with real-time room availability, instantaneous reservations, and low-latency notifications across Android & iOS.',
      solution: 'Engineered high-performance Flutter mobile applications integrated with Firebase Firestore realtime streams, Firebase Authentication, Cloud Messaging, and automated build scripts.',
      tools: ['Flutter Framework', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Cloud Messaging (FCM)', 'Android Studio', 'Git'],
      result: 'Delivered production apps with real-time booking synchronization, 99.9% crash-free sessions, and instant user push alerts.',
      metrics: [
        { label: 'Crash-Free Rate', value: '99.9%' },
        { label: 'Sync Latency', value: '< 100ms' },
        { label: 'Platforms', value: 'Android & iOS' }
      ]
    },
    githubUrl: 'https://github.com/sheraz-amjad',
    liveUrl: '',
    featured: false,
    order: 4,
    icon: 'Smartphone',
    architectureBadge: 'Flutter + Firebase'
  }
];

// Organized by core DevOps disciplines matching requirements:
// CI/CD, Cloud, Containers, IaC, Monitoring, Scripting + Mobile/APIs
export interface SkillCategoryGroup {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  description: string;
  skills: { name: string; level: number; tags: string[]; isKey?: boolean }[];
}

export const portfolioSkillGroups: SkillCategoryGroup[] = [
  {
    id: 'cicd',
    title: 'CI/CD Pipelines & Automation',
    shortTitle: 'CI/CD',
    icon: 'Workflow',
    color: '#f59e0b',
    description: 'Designing automated pipelines for automated build, test, multi-stage packaging, and continuous delivery.',
    skills: [
      { name: 'GitHub Actions & Workflows', level: 95, tags: ['CI/CD', 'YAML', 'Runners'], isKey: true },
      { name: 'Azure DevOps Pipelines', level: 90, tags: ['AZ-400', 'Releases', 'Boards'], isKey: true },
      { name: 'Automated Test & Lint Gates', level: 88, tags: ['Quality Gates', 'Unit Tests'] },
      { name: 'Multi-Stage Build Automation', level: 92, tags: ['Optimization', 'Docker'] },
      { name: 'Semantic Release & Versioning', level: 86, tags: ['Changelogs', 'Tags'] }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Platforms (AWS & Azure)',
    shortTitle: 'Cloud',
    icon: 'Cloud',
    color: '#38bdf8',
    description: 'Architecting secure, highly available, and scalable infrastructure on Microsoft Azure and Amazon Web Services.',
    skills: [
      { name: 'Microsoft Azure (AZ-400 / AZ-104)', level: 92, tags: ['Azure DevOps', 'VNets', 'IAM', 'VMs'], isKey: true },
      { name: 'Amazon Web Services (AWS)', level: 90, tags: ['EC2', 'S3', 'Lambda', 'IAM', 'CLI'], isKey: true },
      { name: 'Cloud Networking & DNS', level: 88, tags: ['VPC', 'Subnets', 'Route53', 'Cloudflare'] },
      { name: 'Load Balancing & Auto-Scaling', level: 85, tags: ['ALB', 'High Availability'] },
      { name: 'Cloud Security & IAM Policies', level: 90, tags: ['Least Privilege', 'RBAC', 'MFA'] }
    ]
  },
  {
    id: 'containers',
    title: 'Containers & Orchestration',
    shortTitle: 'Containers',
    icon: 'Boxes',
    color: '#10b981',
    description: 'Packaging microservices into lightweight immutable containers and orchestrating container workloads.',
    skills: [
      { name: 'Docker & Multi-Stage Builds', level: 95, tags: ['Dockerfile', 'Alpine', 'Optimization'], isKey: true },
      { name: 'Docker Compose', level: 92, tags: ['Microservices', 'Networking', 'Volumes'] },
      { name: 'Kubernetes Workloads', level: 85, tags: ['Pods', 'Deployments', 'Services', 'K8s'], isKey: true },
      { name: 'Container Registry Management', level: 88, tags: ['Docker Hub', 'ACR', 'ECR'] },
      { name: 'Container Log Rotation & Limits', level: 87, tags: ['Healthchecks', 'Resource Limits'] }
    ]
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code (IaC)',
    shortTitle: 'IaC',
    icon: 'Code2',
    color: '#f97316',
    description: 'Declaring, versioning, and managing infrastructure reproducibility using declarative code.',
    skills: [
      { name: 'Terraform (HCL)', level: 88, tags: ['IaC', 'Modules', 'State Locking', 'Providers'], isKey: true },
      { name: 'Nginx Reverse Proxy & Load Balancing', level: 90, tags: ['Reverse Proxy', 'SSL/TLS', 'Gzip'], isKey: true },
      { name: 'Modular Infrastructure Blueprints', level: 85, tags: ['Templates', 'Environments'] },
      { name: 'CloudFormation & ARM/Bicep Basics', level: 80, tags: ['Declarative', 'Templates'] }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring, Security & Observability',
    shortTitle: 'Monitoring',
    icon: 'Activity',
    color: '#a855f7',
    description: 'Proactive metrics collection, system uptime alerting, log aggregation, and zero-trust security hardening.',
    skills: [
      { name: 'Linux System Hardening', level: 92, tags: ['SSH Key-Only', 'UFW Firewall', 'Fail2ban'], isKey: true },
      { name: 'Uptime Monitoring & Health Checks', level: 90, tags: ['Alerts', 'Endpoints', 'SLA 99.9%'], isKey: true },
      { name: 'SSL/TLS Encryption & Auto-Renewal', level: 94, tags: ['Certbot', 'Let\'s Encrypt', 'HSTS'] },
      { name: 'Incident Response & Post-Mortem', level: 88, tags: ['Malware Scanners', 'Audit Logs'] },
      { name: 'Log Rotation & Centralization', level: 86, tags: ['Systemd Logs', 'Disk Quotas'] }
    ]
  },
  {
    id: 'scripting',
    title: 'Scripting & Automation',
    shortTitle: 'Scripting',
    icon: 'Terminal',
    color: '#eab308',
    description: 'Automating repetitive operational tasks, server backups, security sweeps, and scheduled background jobs.',
    skills: [
      { name: 'Bash & Shell Scripting', level: 92, tags: ['Automation', 'CLI', 'Text Processing'], isKey: true },
      { name: 'Cron Scheduling & Automated Backups', level: 94, tags: ['Remote Dumps', 'Encrypted Backups'], isKey: true },
      { name: 'Linux System Administration', level: 90, tags: ['Ubuntu', 'Debian', 'Systemctl', 'Processes'] },
      { name: 'Git & Version Control Workflows', level: 95, tags: ['Gitflow', 'Hooks', 'Rebase'] }
    ]
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile & Cloud APIs',
    shortTitle: 'Mobile/APIs',
    icon: 'Smartphone',
    color: '#06b6d4',
    description: 'Full-stack mobility and cloud database integration powering modern mobile experiences.',
    skills: [
      { name: 'Flutter Framework & Dart', level: 90, tags: ['Cross-Platform', 'State Management'] },
      { name: 'Firebase Cloud Backend', level: 90, tags: ['Firestore', 'Auth', 'FCM Push'] },
      { name: 'REST APIs & Webhooks', level: 88, tags: ['JSON', 'HTTP/2', 'Authentication'] }
    ]
  }
];

export const portfolioSkills: SkillItem[] = [
  // DevOps & Cloud
  { name: 'AWS (EC2, S3, Lambda, CLI)', category: 'DevOps & Cloud', level: 90, iconName: 'Cloud', tags: ['EC2', 'S3', 'Lambda', 'CLI'], featuredIn3D: true, order: 1 },
  { name: 'Microsoft Azure (AZ-400 / AZ-104)', category: 'DevOps & Cloud', level: 92, iconName: 'Cloud', tags: ['Azure DevOps', 'VNets', 'IAM'], featuredIn3D: true, order: 2 },
  { name: 'Docker & Multi-Stage Builds', category: 'DevOps & Cloud', level: 95, iconName: 'Container', tags: ['Dockerize', 'Volumes', 'Alpine'], featuredIn3D: true, order: 3 },
  { name: 'Kubernetes (Pods, Deployments)', category: 'DevOps & Cloud', level: 85, iconName: 'Server', tags: ['Pods', 'Services', 'K8s'], featuredIn3D: true, order: 4 },
  { name: 'CI/CD Automation (GitHub Actions)', category: 'DevOps & Cloud', level: 95, iconName: 'Workflow', tags: ['Automation', 'Workflows', 'YAML'], featuredIn3D: true, order: 5 },
  { name: 'Terraform (IaC)', category: 'DevOps & Cloud', level: 88, iconName: 'Code2', tags: ['IaC', 'State', 'Modules'], featuredIn3D: true, order: 6 },
  { name: 'Linux Hardening & Networking', category: 'DevOps & Cloud', level: 92, iconName: 'Terminal', tags: ['Ubuntu', 'SSH', 'UFW', 'Fail2ban'], featuredIn3D: true, order: 7 },
  { name: 'Bash Scripting & Cron Backups', category: 'DevOps & Cloud', level: 94, iconName: 'Code', tags: ['Bash', 'Automation', 'Cron'], featuredIn3D: true, order: 8 },

  // Tools & Security
  { name: 'Nginx Reverse Proxy & SSL/TLS', category: 'Tools & Practices', level: 90, iconName: 'Cpu', tags: ['Reverse Proxy', 'SSL', 'Certbot'], featuredIn3D: false, order: 9 },
  { name: 'Monitoring & Uptime Alerting', category: 'Tools & Practices', level: 88, iconName: 'Shield', tags: ['Uptime', 'Logs', 'Metrics'], featuredIn3D: false, order: 10 },
  { name: 'Git & GitHub Workflows', category: 'Tools & Practices', level: 95, iconName: 'GitBranch', tags: ['Branches', 'PRs', 'Actions'], featuredIn3D: false, order: 11 },

  // Mobile Dev & Firebase
  { name: 'Flutter Framework & Dart', category: 'Mobile Dev', level: 90, iconName: 'Smartphone', tags: ['Cross-Platform', 'Widgets'], featuredIn3D: false, order: 12 },
  { name: 'Firebase (Firestore, Auth, FCM)', category: 'Firebase', level: 90, iconName: 'Database', tags: ['Realtime', 'OAuth', 'Notifications'], featuredIn3D: false, order: 13 }
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
    title: 'DevOps Experience Letter',
    issuer: 'DevOps & Software Engineering',
    period: '2026',
    type: 'Training',
    order: 3,
    description: 'Official Experience Letter validating hands-on accomplishments in DevOps engineering, server infrastructure migration, CI/CD automation, and cloud deployments.',
    topics: ['DevOps', 'Docker', 'GitHub Actions', 'Server Migration', 'Linux Administration'],
    downloadUrl: '/syed_sheraz_experience_letter.pdf'
  },
  {
    title: 'Flutter Mobile Developer Internship Certificate',
    issuer: 'Semicolons Tech',
    period: 'Sep 2025 – Feb 2026',
    type: 'Training',
    order: 4,
    description: 'Official Certificate of Internship Completion for Flutter Mobile Application Development, validating UI development, state management, API integration, and app performance optimization.',
    topics: ['Flutter', 'Dart', 'Mobile Dev', 'Firebase', 'State Management', 'API Integration'],
    downloadUrl: '/semicolons_flutter_internship_certificate.pdf'
  },
  {
    title: 'Bachelor of Science in Computer Science (BSCS)',
    issuer: 'National University of Modern Languages (NUML)',
    period: 'Oct 2021 – Sep 2025',
    type: 'Education',
    order: 5,
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
