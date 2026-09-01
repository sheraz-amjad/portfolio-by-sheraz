# 📧 Gmail Email Notifications Setup Guide

This portfolio automatically sends **emails to your Gmail** when visitors submit the contact form. Both you and the visitor receive confirmation emails.

---

## 🔧 Step-by-Step Gmail Configuration

### 1. **Enable 2-Factor Authentication on Your Gmail Account**
   1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
   2. Click on **2-Step Verification** (on the left sidebar)
   3. Follow the prompts to enable it
   4. Confirm your phone number

### 2. **Generate an App Password**
   1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   2. Select **Mail** from the "Select the app" dropdown
   3. Select **Windows PC** (or your device type) from the "Select the device" dropdown
   4. Click **Generate**
   5. Google will display a **16-character password** — copy this

   > **Example**: `abcd efgh ijkl mnop`

### 3. **Configure Environment Variables**

Edit your `.env` file in the `server/` directory and add:

```env
# Email Notification Settings
EMAIL_SERVICE=gmail
EMAIL_USER=sherazamjad933@gmail.com
EMAIL_PASS=vvug lueu rodh xwsu
EMAIL_RECEIVER=sherazamjad933@gmail.com
```

Replace:
- `sherazamjad933@gmail.com` → Your actual Gmail address
- `vvug lueu rodh xwsu` → The 16-character App Password from Step 2

### 4. **Restart Your Backend Server**

```bash
# Development mode
npm run server:dev

# Production (with PM2)
pm2 restart portfolio-api
```

---

## ✅ Testing Email Notifications

1. Open your portfolio website
2. Fill out the **Contact Form** with a test message
3. Submit the form

You should receive **2 emails**:

### Email 1: Notification to You (Portfolio Owner)
- **To**: sherazamjad933@gmail.com
- **Subject**: `⚡ [Portfolio Message] from {Visitor Name}: {Subject}`
- **Contains**: Visitor's message, email, and contact details

### Email 2: Confirmation to Visitor
- **To**: visitor's_email@gmail.com
- **Subject**: `✅ Message Received - {Visitor Name}, Thanks for reaching out!`
- **Contains**: A professional acknowledgment message

---

## 🛡️ Security Tips

- **Never commit** `.env` files to Git — use `.env.example` instead
- **Keep your App Password** secure — treat it like a password
- **Use a dedicated Gmail** account or create a "noreply" Gmail for this
- For production, store environment variables in AWS EC2 Parameter Store or use GitHub Secrets

---

## 🐛 Troubleshooting

### Emails Not Sending?

1. **Check environment variables**:
   ```bash
   echo $EMAIL_USER
   echo $EMAIL_PASS
   ```

2. **View server logs**:
   ```bash
   # Development
   npm run server:dev
   
   # Production (PM2)
   pm2 logs portfolio-api
   ```

3. **Verify Gmail allows "Less Secure Apps"**:
   - Go to [https://www.google.com/settings/security/lesssecureapps](https://www.google.com/settings/security/lesssecureapps)
   - Toggle **Allow less secure apps** ON (if using App Password, this isn't needed)

4. **Test Nodemailer directly**:
   ```bash
   node -e "
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your_email@gmail.com',
       pass: 'abcd efgh ijkl mnop'
     }
   });
   transporter.sendMail({
     from: 'your_email@gmail.com',
     to: 'test@example.com',
     subject: 'Test Email',
     text: 'If you see this, Gmail is working!'
   }, (err, info) => {
     console.log(err || info);
   });
   "
   ```

---

## 📝 Environment Variables Reference

| Variable | Example | Description |
|----------|---------|-------------|
| `EMAIL_SERVICE` | `gmail` | Email service provider (default: gmail) |
| `EMAIL_USER` | `sherazamjad933@gmail.com` | Your Gmail address (sender) |
| `EMAIL_PASS` | `abcd efgh ijkl mnop` | 16-char App Password from Google |
| `EMAIL_RECEIVER` | `sherazamjad933@gmail.com` | Where notifications are sent (can be different) |

---

## 🎯 Features

✅ **Visitor emails are logged to MongoDB** `ContactMessage` collection  
✅ **Email to portfolio owner** with all contact details  
✅ **Auto-confirmation email** sent to the visitor  
✅ **Fallback handling** if email fails (message still saved to DB)  
✅ **Professional HTML emails** with styling  
✅ **Reply-To header** set to visitor's email for easy responses  

---

Need help? Check server logs or contact Syed Sheraz Amjad at sherazamjad933@gmail.com
