# ⚠️ PM2 Not Installed - Full EC2 Setup Guide

## 🚨 Root Cause of 502 Error

**PM2 not found = Backend is NOT running = Nginx has nothing to proxy to = 502 Bad Gateway**

---

## 🔧 Complete EC2 Setup (10 minutes)

### Step 1: Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Node.js & npm (if not already)
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 3: Install PM2 Globally
```bash
sudo npm install -g pm2

# Verify installation
pm2 --version

# Should show version number like: 5.x.x
```

### Step 4: Install MongoDB (if not already)
```bash
# Check if running
sudo systemctl status mongod

# If not installed, install it
sudo apt install -y mongodb

# Start it
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

---

## 📂 Step 5: Set Up Project Directory

```bash
# Go to project root
cd /var/www/portfolio

# Check if directories exist
ls -la
```

**Should see:**
- `server/` folder ✅
- `client/` folder ✅
- `deploy.sh` ✅
- `.github/` ✅

---

## 🛠️ Step 6: Install Backend Dependencies

```bash
cd /var/www/portfolio/server

# Install dependencies
npm install

# Verify node_modules created
ls -la node_modules | head -20
```

---

## 📝 Step 7: Create .env File

```bash
# Check if .env exists
cat /var/www/portfolio/server/.env

# If it doesn't exist, create it
sudo nano /var/www/portfolio/server/.env
```

**Add these lines:**
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=sherazamjad933@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_RECEIVER=sherazamjad933@gmail.com
```

**Save:** `Ctrl+X` → `Y` → `Enter`

---

## 🚀 Step 8: Start Backend with PM2

```bash
cd /var/www/portfolio

# Start using ecosystem.config.cjs
pm2 start ecosystem.config.cjs

# Wait 3 seconds
sleep 3

# Check status
pm2 status
```

**Should show:**
```
┌─────────────────────┬──────┬──────┬──────────┬───────┬─────────┐
│ Name                │ PID  │ Mode │ Status   │ Restarts │ Uptime  │
├─────────────────────┼──────┼──────┼──────────┼──────────┼─────────┤
│ portfolio-api       │ XXXX │ fork │ online   │ 0        │ 1m      │
└─────────────────────┴──────┴──────┴──────────┴──────────┴─────────┘
```

---

## 📊 Step 9: Verify Backend is Working

```bash
# Check logs
pm2 logs portfolio-api --lines 50

# Should show:
# ✅ MongoDB Connected successfully
# ✅ Portfolio Express Backend Started
# ✅ Port: 5000

# Test API
curl http://localhost:5000/api/health

# Should return JSON with status: "online"
```

---

## ✅ Step 10: Test Full Stack

```bash
# Test through Nginx
curl http://localhost/api/health

# Should work now
```

**Then visit:** `https://syedsheraz.me`

**502 error should be GONE!** ✅

---

## 🔄 Make PM2 Start on Reboot

```bash
# Save PM2 process list
pm2 save

# Create startup script
pm2 startup

# Run the command it outputs (looks like):
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

**Copy & run the exact command PM2 outputs above**

---

## 📋 Verification Checklist

After all steps, verify:

```bash
# 1. Node.js installed
node --version

# 2. PM2 installed
pm2 --version

# 3. Backend running
pm2 status
# Should show: portfolio-api → online

# 4. MongoDB running
sudo systemctl status mongod
# Should show: active (running)

# 5. .env file exists
cat /var/www/portfolio/server/.env
# Should show all your configuration

# 6. API responding
curl http://localhost:5000/api/health
# Should return JSON

# 7. Backend logs show no errors
pm2 logs portfolio-api --lines 50
# Should show MongoDB connected + Backend started

# 8. Website loading
# Visit: https://syedsheraz.me
# Should NOT show 502 error
```

---

## 🚨 If Still Having Issues

### Check Node Modules
```bash
ls -la /var/www/portfolio/server/node_modules

# If empty or missing, reinstall:
cd /var/www/portfolio/server
npm install
```

### Check .env is Loaded
```bash
pm2 show portfolio-api

# Look for "env" section
# Should show your EMAIL_USER, EMAIL_PASS, MONGO_URI, etc.
```

### Check MongoDB Connection
```bash
mongosh mongodb://127.0.0.1:27017/portfolio

# Type: db.adminCommand('ping')
# Should return: { ok: 1 }

# Type: exit
```

### View Full Startup Log
```bash
pm2 logs portfolio-api --lines 200
```

---

## ⚡ Quick Copy-Paste (Full Setup)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install MongoDB
sudo apt install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod

# Go to project
cd /var/www/portfolio

# Install backend dependencies
cd server && npm install && cd ..

# Create .env (edit after)
sudo nano server/.env

# Start backend
pm2 start ecosystem.config.cjs

# Wait & check
sleep 3
pm2 status
pm2 logs portfolio-api --lines 50

# Save for reboot
pm2 save
pm2 startup
# (Run the command that outputs)
```

---

## ✅ Expected Final State

After completing all steps:

```bash
ubuntu@ip-172-31-20-45:~$ pm2 status
┌─────────────────────┬──────┬──────┬──────────┬──────────┬────────┐
│ Name                │ PID  │ Mode │ Status   │ Restarts │ Uptime │
├─────────────────────┼──────┼──────┼──────────┼──────────┼────────┤
│ portfolio-api       │ 1234 │ fork │ online   │ 0        │ 2m     │
└─────────────────────┴──────┴──────┴──────────┴──────────┴────────┘
```

And:
```bash
ubuntu@ip-172-31-20-45:~$ curl http://localhost:5000/api/health
{"status":"online","timestamp":"2026-09-01T...","uptimeSeconds":120}
```

**This means 502 error is FIXED!** 🎉

---

## 📞 Need Help?

Run this diagnostic:
```bash
echo "=== Node.js ===" && node --version
echo "=== PM2 ===" && pm2 --version
echo "=== MongoDB ===" && sudo systemctl status mongod
echo "=== Backend ===" && pm2 status
echo "=== Logs ===" && pm2 logs portfolio-api --lines 30
```

Share the output if issues persist.
