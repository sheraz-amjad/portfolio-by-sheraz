# 🚀 Immediate Action Plan: Fix Contact Form

## ⚡ Do This Right Now (5 minutes)

### Step 1: SSH into EC2
```bash
ssh -i "your-key.pem" ubuntu@54.158.18.13
```

### Step 2: Check Current Status
```bash
# Check if backend is running
pm2 status

# Check logs
pm2 logs portfolio-api --lines 30
```

### Step 3: Verify .env File Exists
```bash
cat /var/www/portfolio/server/.env
```

**If empty or missing, create it:**
```bash
sudo nano /var/www/portfolio/server/.env
```

**Add these exact lines:**
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=sherazamjad933@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_RECEIVER=sherazamjad933@gmail.com
```

> **⚠️ Replace `your_16_character_app_password` with your actual Gmail app password from https://myaccount.google.com/apppasswords**

**Save:** `Ctrl+X` → `Y` → `Enter`

### Step 4: Restart Everything
```bash
# Stop old process
pm2 stop portfolio-api

# Start with fresh .env
pm2 start ecosystem.config.cjs

# Wait 3 seconds
sleep 3

# Check status
pm2 status

# View logs (should see MongoDB connected message)
pm2 logs portfolio-api --lines 50
```

### Step 5: Verify MongoDB
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# If not running:
sudo systemctl start mongod

# Test connection
mongosh mongodb://127.0.0.1:27017/portfolio
# Type: db.contactmessages.countDocuments()
# Should return: 0 or higher
# Type: exit
```

### Step 6: Test Contact Endpoint
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sheraz Test",
    "email": "test@example.com",
    "subject": "Testing Contact Form",
    "message": "This is a test message"
  }'
```

**Should return:**
```json
{
  "success": true,
  "message": "Thank you, Syed Sheraz Amjad has received your message...",
  "data": { ... }
}
```

### Step 7: Test From Website
1. Go to `https://syedsheraz.me`
2. Scroll to Contact section
3. Fill form with test data
4. Submit

**Check:**
- ✅ Success toast message appears
- ✅ Form clears
- ✅ Confetti animation
- ✅ Email arrives in your inbox

---

## 🔍 If Still Not Working

### Check Backend Logs
```bash
pm2 logs portfolio-api --lines 100

# Look for these good signs:
# ✅ "✅ MongoDB Connected successfully"
# ✅ "📧 Notification email sent to sherazamjad933@gmail.com"
# ✅ "📧 Confirmation email sent to test@example.com"

# Look for these bad signs:
# ❌ "⚠️ MongoDB connection warning"
# ❌ "⚠️ Nodemailer dispatch warning"
# ❌ "Error in submitContact"
```

### Check MongoDB
```bash
mongosh
use portfolio
db.contactmessages.find().pretty()
exit
```

### Check Email Configuration
```bash
# Verify EMAIL_USER and EMAIL_PASS loaded
pm2 show portfolio-api

# Should show in "env" section
```

### Restart All Services
```bash
# Full restart
pm2 kill
pm2 start ecosystem.config.cjs
sudo systemctl restart mongod

# Wait and check
sleep 5
pm2 logs portfolio-api --lines 50
```

---

## 📞 Need Help?

See full guide: [CONTACT_FORM_TROUBLESHOOTING.md](./CONTACT_FORM_TROUBLESHOOTING.md)

Or run diagnostics script:
```bash
chmod +x /var/www/portfolio/contact-form-diagnostics.sh
cd /var/www/portfolio
./contact-form-diagnostics.sh
```

---

## ✅ Verification Checklist

After following above steps, verify:

- [ ] Backend running (`pm2 status` shows portfolio-api online)
- [ ] MongoDB running (`sudo systemctl status mongod`)
- [ ] .env file exists with EMAIL credentials
- [ ] `pm2 logs` shows "MongoDB Connected"
- [ ] API health check works (`curl http://localhost:5000/api/health`)
- [ ] Test message saved to DB (`mongosh` → `db.contactmessages.countDocuments()`)
- [ ] Email received from contact form
- [ ] Website form works and shows success

If all ✅, contact form is fixed! 🎉
