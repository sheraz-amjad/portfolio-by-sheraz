# ⚡ EC2 Deployment Quick Reference

## 🎯 Correct Paths on Your EC2

```
54.158.18.13 (Elastic IP)
├── /var/www/portfolio/                    ← Main project directory
│   ├── server/                            ← Backend (Express.js)
│   │   ├── .env                           ← Configuration (CRITICAL)
│   │   ├── src/
│   │   │   ├── server.js
│   │   │   ├── controllers/apiControllers.js
│   │   │   ├── models/ContactMessage.js
│   │   │   └── config/db.js
│   │   └── ecosystem.config.cjs           ← PM2 configuration
│   │
│   ├── client/                            ← Frontend (React)
│   │   └── dist/                          ← Built files served by Nginx
│   │
│   └── contact-form-diagnostics.sh        ← Diagnostics script
│
├── /etc/nginx/sites-available/portfolio   ← Nginx configuration
├── /etc/letsencrypt/live/syedsheraz.me/   ← SSL certificates
└── /var/log/pm2/                          ← PM2 logs
```

---

## 🔧 Essential Commands

### SSH into EC2
```bash
ssh -i "your-key.pem" ubuntu@54.158.18.13
```

### Check Backend Status
```bash
pm2 status
pm2 logs portfolio-api --lines 50
```

### View/Edit .env Configuration
```bash
cat /var/www/portfolio/server/.env
sudo nano /var/www/portfolio/server/.env
```

### Restart Backend After Changing .env
```bash
pm2 restart portfolio-api
pm2 logs portfolio-api --lines 50
```

### Check MongoDB
```bash
sudo systemctl status mongod
mongosh mongodb://127.0.0.1:27017/portfolio
db.contactmessages.countDocuments()
exit
```

### Test Contact Form API
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

### Run Diagnostics
```bash
cd /var/www/portfolio
chmod +x contact-form-diagnostics.sh
./contact-form-diagnostics.sh
```

---

## 📋 .env File Location & Requirements

**Location:** `/var/www/portfolio/server/.env`

**Required Variables:**
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=sherazamjad933@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_RECEIVER=sherazamjad933@gmail.com
```

**Steps to Update:**
1. SSH into EC2
2. `sudo nano /var/www/portfolio/server/.env`
3. Add/update values
4. `Ctrl+X` → `Y` → `Enter`
5. `pm2 restart portfolio-api`
6. `pm2 logs portfolio-api --lines 50` (verify)

---

## 🌐 Your Domain & Deployment

| Item | Value |
|------|-------|
| Domain | `https://syedsheraz.me` |
| Elastic IP | `54.158.18.13` |
| Region | us-east-1 |
| Project Root | `/var/www/portfolio` |
| Frontend Port | 80/443 (Nginx) |
| Backend Port | 5000 (Express) |
| Database | MongoDB on localhost:27017 |
| SSL Provider | Let's Encrypt (auto-renew) |

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Contact form not saving to DB | MongoDB offline: `sudo systemctl start mongod` |
| Emails not sending | `.env` missing EMAIL vars or Gmail 2FA not enabled |
| Backend offline | `pm2 status` → `pm2 start ecosystem.config.cjs` |
| Port 5000 refused | Backend not running: `pm2 logs portfolio-api` |
| Changes not taking effect | Edit `/var/www/portfolio/server/.env` then `pm2 restart portfolio-api` |

---

## 📚 Documentation

- **Quick Fix:** [CONTACT_FORM_QUICK_FIX.md](./CONTACT_FORM_QUICK_FIX.md)
- **Full Troubleshooting:** [CONTACT_FORM_TROUBLESHOOTING.md](./CONTACT_FORM_TROUBLESHOOTING.md)
- **Domain Setup:** [DOMAIN_DEPLOYMENT.md](./DOMAIN_DEPLOYMENT.md)
- **Gmail Setup:** [GMAIL_SETUP.md](./GMAIL_SETUP.md)

---

## ✅ Deployment Verification

After making changes, verify with:

```bash
# 1. Backend running
pm2 status

# 2. MongoDB connected
mongosh mongodb://127.0.0.1:27017/portfolio

# 3. .env loaded correctly
pm2 show portfolio-api

# 4. Check logs
pm2 logs portfolio-api --lines 100

# 5. Test API
curl http://localhost:5000/api/health

# 6. Test contact endpoint
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

All should return ✅ status!
