<<<<<<< HEAD
# 🚀 Syed Sheraz Amjad — 3D-Interactive MERN Portfolio

A modern, high-performance, 3D-interactive full-stack portfolio website for **Syed Sheraz Amjad** — DevOps Engineer & Flutter Mobile Developer — built with the complete **MERN stack** (MongoDB, Express.js, React + Vite + TypeScript, Node.js), Three.js / React Three Fiber interactive 3D pipelines, Tailwind CSS, PM2, and Nginx.

---

## 👤 Personal Information & Profile

- **Name**: Syed Sheraz Amjad
- **Titles**: DevOps Engineer | Flutter Mobile Developer | Full Stack MERN Engineer
- **Location**: Lahore, Pakistan
- **Contact**: +92 306 9275494 · [sherazamjad933@gmail.com](mailto:sherazamjad933@gmail.com)
- **Tagline**: *"Building, containerizing, and deploying scalable full-stack (MERN) applications end-to-end"*
- **GitHub**: [github.com/sherazamjad](https://github.com/sherazamjad)
- **LinkedIn**: [linkedin.com/in/syed-sheraz-amjad](https://www.linkedin.com/in/syed-sheraz-amjad)

---

## 🏗️ Architecture & Stack

```mermaid
graph TD
    Client[React + TypeScript + Vite + Three.js / R3F] -->|HTTP / REST API| Nginx[Nginx Reverse Proxy :80]
    Nginx -->|Static Assets| WebRoot[/var/www/portfolio]
    Nginx -->|/api/* Proxy| Express[Node.js + Express Server :5000 / PM2]
    Express -->|Mongoose ODM| Mongo[(MongoDB Local / Atlas)]
    Express -->|Notification| Mailer[Nodemailer]
```

- **Frontend (`/client`)**: React 18, TypeScript, Vite, Tailwind CSS, Three.js, `@react-three/fiber`, `@react-three/drei`, Lucide Icons, Framer Motion, Canvas Confetti.
- **Backend (`/server`)**: Node.js, Express.js (ESM), Mongoose ODM, Dotenv, Cors, Nodemailer.
- **Database (`MongoDB`)**: Experience, Project, Skill, Certification, ContactMessage schemas with pre-seeded CV data.
- **Production Server**: AWS EC2 Ubuntu instance (Public IP only, port 80), PM2 cluster manager, Nginx reverse proxy.

---

## 📂 Monorepo File Structure

```
portfolio/
├── client/                      # React + TypeScript + Vite + Three.js SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/              # Three.js 3D interactive pipeline network & fallback
│   │   │   ├── layout/          # Glassmorphic Navbar & Terminal Footer
│   │   │   ├── sections/        # Hero, About, PipelineSim, Experience, Projects, Skills, Certs, Contact
│   │   │   └── ui/              # Resume Modal, GlassCards, Toast alerts
│   │   ├── data/                # High-fidelity fallback & offline seed data
│   │   ├── services/            # REST API client connecting to Express
│   │   ├── types/               # TypeScript data interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css            # Cyber theme, glowing tokens, neon scrollbars
│   ├── vite.config.ts
│   └── package.json
├── server/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── config/              # MongoDB Mongoose connection handler
│   │   ├── controllers/         # REST API endpoints & fallback controllers
│   │   ├── models/              # Mongoose schemas (Experience, Project, Skill, Contact)
│   │   ├── routes/              # Express /api route definitions
│   │   ├── seed/                # Syed Sheraz Amjad pre-seeded CV dataset & seeder
│   │   └── server.js            # Express server entry point
│   └── package.json
├── nginx/
│   └── portfolio.conf           # Production Nginx reverse-proxy config (EC2 IP-only)
├── ecosystem.config.cjs         # PM2 production process configuration
├── deploy.sh                    # One-click AWS EC2 Ubuntu deployment script
├── package.json                 # Monorepo root with concurrently runner
└── README.md
```

---

## 🛠️ Local Development (Antigravity IDE)

### 1. Install All Dependencies
In the root directory, run:
```bash
npm run install:all
```
*(Or install in `/server` and `/client` individually)*

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in `server/`:
```bash
cp server/.env.example server/.env
```

### 3. Run Monorepo Dev Servers
Run both backend and frontend concurrently with one command:
```bash
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. (Optional) Standalone Database Seed
To manually reset and re-seed MongoDB with CV data:
```bash
npm run seed
```

---

## 🌐 AWS EC2 IP-Only Deployment Guide

This application is built specifically for **AWS EC2 Ubuntu (plain HTTP over Public IP, no domain or SSL required)**.

### 1. AWS EC2 Security Group Inbound Rules
Configure your EC2 Security Group with:
- **Port 80 (HTTP)**: Source `0.0.0.0/0`
- **Port 22 (SSH)**: Source `0.0.0.0/0` (or your IP)
- *(Keep Port 27017 and 5000 closed to the public internet)*

### 2. Connect to EC2 & Clone
```bash
ssh -i "your-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
sudo apt update && sudo apt install -y nodejs npm nginx git
git clone https://github.com/sherazamjad/portfolio.git /home/ubuntu/portfolio
cd /home/ubuntu/portfolio
```

### 3. Run One-Click Deployment Script
Make the deployment script executable and run it:
```bash
chmod +x deploy.sh
./deploy.sh
```

The script automatically:
1. Installs backend dependencies and PM2
2. Seeds MongoDB database collections
3. Builds the production React Vite bundle
4. Syncs static assets to `/var/www/portfolio`
5. Configures and reloads Nginx reverse proxy on port 80
6. Starts the backend API with PM2 (`portfolio-api`)

Your portfolio will be live at:
```
http://<YOUR_EC2_PUBLIC_IP>/
```

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health check, DB status, and uptime |
| `GET` | `/api/profile` | Personal info, tagline, social links |
| `GET` | `/api/experience` | Timeline work experience (Zemotify, Ebryx, Semicolon) |
| `GET` | `/api/projects` | Filterable project catalog with architecture tags |
| `GET` | `/api/skills` | Categorized tech stack & proficiencies |
| `GET` | `/api/certifications`| Certifications, Udemy training & BSCS education |
| `POST`| `/api/contact` | Submit contact message (persisted to MongoDB) |

---

## 🛡️ License
MIT License © Syed Sheraz Amjad.
=======
# portfolio-by-sheraz
>>>>>>> 7ae04899e537898e8052cd74ecea5757bdae67ce
