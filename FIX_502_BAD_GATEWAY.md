# 🔴 502 Bad Gateway - Troubleshooting Guide

## What Does This Mean?

**502 Bad Gateway** = Nginx is running ✅ but **cannot reach your backend (Express server on port 5000)** ❌

---

## ⚡ Quick Fix (2 minutes)

### Step 1: SSH into EC2
```bash
ssh -i "your-key.pem" ubuntu@54.158.18.13
```

### Step 2: Check if Backend is Running
```bash
pm2 status
```

**You should see:** `portfolio-api` → `online`

**If you see:** `portfolio-api` → `stopped` or `crashed`:
```bash
# Start it
pm2 start ecosystem.config.cjs

# Wait 3 seconds
sleep 3

# Check status
pm2 status
```

### Step 3: Check Logs for Errors
```bash
pm2 logs portfolio-api --lines 50
```

**Look for these:**
- ✅ `✅ MongoDB Connected successfully` - DB is connected
- ✅ `🚀 Portfolio Express Backend Started` - Server is running
- ✅ `Port: 5000` - Listening on correct port

**If you see errors:**
- ❌ `⚠️ MongoDB connection warning` - Database not running
- ❌ `Error in submitContact` - Form submission failed
- ❌ `listen EADDRINUSE: address already in use :::5000` - Port in use

### Step 4: Test Backend is Responding
```bash
curl -s http://localhost:5000/api/health | jq .
```

**Should return:**
```json
{
  "status": "online",
  "timestamp": "...",
  "uptimeSeconds": ...
}
```

If not responding, see fixes below.

---

## 🔧 Common Causes & Fixes

### Cause 1: Backend Not Running

**Check:**
```bash
pm2 status
```

**Fix:**
```bash
# Start it
pm2 start ecosystem.config.cjs

# Or if ecosystem.config.cjs not working
cd /var/www/portfolio/server
npm start
```

---

### Cause 2: Backend Crashed (Exit Code 1)

**Check logs:**
```bash
pm2 logs portfolio-api --lines 100
```

**Most likely:** Missing `.env` file or MongoDB not running

**Fix:**
```bash
# 1. Check if .env exists
cat /var/www/portfolio/server/.env

# 2. If missing, create it
sudo nano /var/www/portfolio/server/.env
# Add: PORT=5000, NODE_ENV=production, MONGO_URI, EMAIL_* vars

# 3. Check MongoDB
sudo systemctl status mongod

# 4. Start MongoDB if stopped
sudo systemctl start mongod

# 5. Restart backend
pm2 restart portfolio-api
sleep 3
pm2 logs portfolio-api --lines 50
```

---

### Cause 3: MongoDB Not Connected

**Check if running:**
```bash
sudo systemctl status mongod
```

**If stopped:**
```bash
sudo systemctl start mongod
```

**Verify connection:**
```bash
mongosh mongodb://127.0.0.1:27017/portfolio
# Type: exit
```

**Then restart backend:**
```bash
pm2 restart portfolio-api
pm2 logs portfolio-api --lines 50
```

---

### Cause 4: .env File Missing or Incomplete

**Check what's configured:**
```bash
cat /var/www/portfolio/server/.env
```

**Should contain (at minimum):**
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
```

**If missing, create it:**
```bash
sudo nano /var/www/portfolio/server/.env
```

Add:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=sherazamjad933@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_RECEIVER=sherazamjad933@gmail.com
```

Save: `Ctrl+X` → `Y` → `Enter`

**Restart:**
```bash
pm2 restart portfolio-api
sleep 3
pm2 logs portfolio-api --lines 50
```

---

### Cause 5: Port 5000 Already in Use

**Check:**
```bash
lsof -i :5000
```

**If something else is using it:**
```bash
# Kill existing process
sudo kill -9 <PID>

# Or restart PM2
pm2 kill
pm2 start ecosystem.config.cjs
```

---

### Cause 6: Node Modules Missing

**Check:**
```bash
ls /var/www/portfolio/server/node_modules
```

**If not found:**
```bash
cd /var/www/portfolio/server
npm install

# Then start
cd /var/www/portfolio
pm2 start ecosystem.config.cjs
```

---

## 🧪 Full Diagnostic (Copy & Paste)

Run this entire sequence:

```bash
# 1. Check PM2
echo "=== PM2 Status ==="
pm2 status

# 2. Check MongoDB
echo "=== MongoDB Status ==="
sudo systemctl status mongod

# 3. Check if port 5000 is listening
echo "=== Port 5000 ==="
lsof -i :5000

# 4. Check if .env exists
echo "=== .env File ==="
cat /var/www/portfolio/server/.env

# 5. View backend logs
echo "=== Backend Logs (Last 50 lines) ==="
pm2 logs portfolio-api --lines 50

# 6. Test API
echo "=== API Health Check ==="
curl -s http://localhost:5000/api/health | jq .

# 7. Test API from Nginx perspective
echo "=== Nginx Health Check ==="
curl -s http://localhost/api/health | jq .
```

---

## ✅ If Backend Starts Working

Once backend is running and responding:

1. **Refresh your browser:**
   ```
   https://syedsheraz.me/
   ```

2. **502 error should be gone** ✅

3. **Website should load** ✅

4. **Test contact form** to verify everything works

---

## 🚨 Still Getting 502?

Run these in order:

```bash
# 1. Full restart
pm2 kill
sudo systemctl restart mongod
sleep 2
pm2 start ecosystem.config.cjs

# 2. Wait for startup
sleep 5

# 3. Check status
pm2 status
pm2 logs portfolio-api --lines 100

# 4. Test locally
curl http://localhost:5000/api/health

# 5. Test from Nginx
curl http://localhost/api/health

# 6. Verify Nginx config
sudo nginx -t

# 7. Reload Nginx if needed
sudo systemctl reload nginx
```

---

## 📞 Detailed Logs to Check

**If still failing, check:**

```bash
# Backend logs
pm2 logs portfolio-api --lines 200

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u mongod --lines 50
```

---

## 📋 Checklist

- [ ] Backend running? (`pm2 status`)
- [ ] MongoDB running? (`sudo systemctl status mongod`)
- [ ] .env file exists? (`cat /var/www/portfolio/server/.env`)
- [ ] API responds locally? (`curl http://localhost:5000/api/health`)
- [ ] Node modules installed? (`ls /var/www/portfolio/server/node_modules`)
- [ ] No errors in logs? (`pm2 logs portfolio-api --lines 100`)
- [ ] Port 5000 listening? (`lsof -i :5000`)
- [ ] Nginx config OK? (`sudo nginx -t`)

All ✅ = **502 error should be fixed!**

---

## 🎯 Next Steps

1. SSH into EC2
2. Run: `pm2 status`
3. If offline, run: `pm2 start ecosystem.config.cjs`
4. Run: `pm2 logs portfolio-api --lines 50`
5. Share what you see in logs (if still having issues)

**Most common fix:** Backend was stopped. Restart with `pm2 start ecosystem.config.cjs`
