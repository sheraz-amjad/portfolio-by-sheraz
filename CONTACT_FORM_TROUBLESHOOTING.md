# 🔧 Contact Form Troubleshooting Guide

## ❌ Issues Detected

1. **Database Not Connected** - ContactMessage collection not saving
2. **Email Not Sending** - Missing or incorrect Gmail credentials
3. **Server Might Not Be Running** - Check backend is active

---

## ✅ Diagnostic Checklist

### Step 1: Verify Backend Server is Running

**SSH into your EC2:**
```bash
ssh -i "your-key.pem" ubuntu@54.158.18.13
```

**Check if backend is running:**
```bash
# Check PM2 status
pm2 status

# Should show: portfolio-api online
# If offline, start it:
pm2 start ecosystem.config.cjs

# View logs
pm2 logs portfolio-api
```

**Or for development:**
```bash
cd /var/www/portfolio/server
npm run dev
```

---

### Step 2: Verify MongoDB Connection

**Check if MongoDB is running:**
```bash
# On EC2
sudo systemctl status mongod

# If stopped, start it:
sudo systemctl start mongod

# Check connection
mongosh mongodb://127.0.0.1:27017/portfolio
```

**Check database exists:**
```bash
mongosh
use portfolio
show collections
# Should include: contactmessages
```

---

### Step 3: Configure Email Credentials (CRITICAL)

**Check if .env file exists on EC2:**
```bash
cat /var/www/portfolio/server/.env
```

**If missing or incomplete, edit it:**
```bash
sudo nano /var/www/portfolio/server/.env
```

**Must contain these lines:**
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_RECEIVER=your_email@gmail.com
```

**Save with:** `Ctrl+X` → `Y` → `Enter`

---

### Step 4: Restart Backend After Changing .env

```bash
# If using PM2
pm2 restart portfolio-api

# Wait 3 seconds
sleep 3

# View logs
pm2 logs portfolio-api --lines 50
```

---

## 🧪 Test the Contact Form

### Option A: Test via Browser
1. Open `https://syedsheraz.me`
2. Scroll to Contact section
3. Fill form and submit
4. Watch for success/error toast message

### Option B: Test via Terminal (cURL)

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you, Syed Sheraz Amjad has received your message...",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "timestamp": "2026-09-01T10:30:00.000Z"
  }
}
```

---

## 🔍 Check Server Logs

**On EC2:**
```bash
# View real-time logs
pm2 logs portfolio-api

# Look for these messages (good signs):
# ✅ "📧 Notification email sent to sherazamjad933@gmail.com"
# ✅ "📧 Confirmation email sent to test@example.com"

# Or these errors (problems):
# ❌ "⚠️ Nodemailer dispatch warning:"
# ❌ "Error in submitContact:"
```

---

## 📊 Check Database for Saved Messages

**On EC2:**
```bash
mongosh

use portfolio

# View all contact messages
db.contactmessages.find().pretty()

# Count messages
db.contactmessages.countDocuments()

# Find specific message
db.contactmessages.findOne({ email: "test@example.com" })
```

---

## 🔐 Verify Gmail App Password

**Check if your Gmail App Password is correct:**

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Verify the password matches what's in `.env`
3. **Common mistakes:**
   - ❌ Using regular Gmail password instead of App Password
   - ❌ Spaces in the middle of password (if your password is `abcd efgh ijkl mnop`, remove the spaces)
   - ❌ 2FA not enabled on account

**To regenerate:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Delete old password
3. Create new one
4. Update `.env` on EC2
5. Restart server

---

## 🚨 Common Issues & Fixes

### Issue: "Email not sending but form saved to DB"
**Solution:**
- Check EMAIL_USER and EMAIL_PASS in `.env`
- Verify Gmail 2FA is enabled
- Check if using App Password (not regular password)

### Issue: "Form not saving to database"
**Solution:**
- Check MongoDB is running: `sudo systemctl status mongod`
- Check MONGO_URI in `.env`
- Verify database exists: `mongosh` → `use portfolio` → `show collections`

### Issue: "Success message but nothing happens"
**Solution:**
- Check backend logs: `pm2 logs portfolio-api`
- Verify .env file loaded: `pm2 show portfolio-api` (check env section)
- Restart: `pm2 restart portfolio-api`

### Issue: "Connection refused to localhost:5000"
**Solution:**
- Check server running: `pm2 status`
- Check port: `lsof -i :5000`
- Restart: `pm2 restart portfolio-api` or `pm2 start ecosystem.config.cjs`

---

## ✅ Quick Fix Commands (Copy & Paste)

**SSH into EC2:**
```bash
ssh -i "your-key.pem" ubuntu@54.158.18.13
```

**Fix and restart everything:**
```bash
# Edit .env
sudo nano /var/www/portfolio/server/.env

# Restart backend
pm2 restart portfolio-api

# Monitor logs
pm2 logs portfolio-api --lines 100
```

---

## 📧 What Should Happen

When a visitor submits the contact form:

1. **Frontend** sends POST to `/api/contact`
2. **Backend** validates form data
3. **Database** saves ContactMessage to MongoDB
4. **Email #1** sends to your Gmail (owner notification)
5. **Email #2** sends to visitor's email (confirmation)
6. **Frontend** shows success toast + confetti

---

**Still stuck?** Check these in this order:
1. Is backend running? (`pm2 status`)
2. Is MongoDB connected? (`mongosh`)
3. Is .env configured? (`cat /var/www/portfolio/server/.env`)
4. Are logs showing errors? (`pm2 logs portfolio-api`)
