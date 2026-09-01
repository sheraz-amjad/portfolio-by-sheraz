# 🌐 Domain Deployment Guide: syedsheraz.me

Deploy your portfolio to your custom domain **`syedsheraz.me`** with automatic HTTPS/SSL.

---

## 📋 Prerequisites

- ✅ AWS EC2 instance running (with deployed portfolio)
- ✅ Domain registered (e.g., Namecheap, GoDaddy, Route53)
- ✅ Your EC2 **Public IP Address** (elastic or standard)
- ✅ SSH access to EC2 instance

---

## 🔧 Step-by-Step Deployment

### Step 1: Point Your Domain to EC2 IP

1. **Get Your EC2 Public IP**:
   ```bash
   ssh -i "your-key.pem" ubuntu@<EC2_IP>
   curl http://checkip.amazonaws.com
   ```
   Write this down — e.g., `54.123.45.67`

2. **Configure DNS Records**:
   
   Log into your domain registrar (Namecheap, GoDaddy, Route53, etc.) and set:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | `A` | `syedsheraz.me` | `54.123.45.67` | 3600 |
   | `A` | `www` | `54.123.45.67` | 3600 |
   | `CNAME` | `www.syedsheraz.me` | `syedsheraz.me` | 3600 |

   **Example (Namecheap)**:
   - Go to Domain → Advanced DNS
   - Add A record: Host `@`, Value `54.123.45.67`
   - Add A record: Host `www`, Value `54.123.45.67`

   **Wait 5-10 minutes** for DNS to propagate (check with: `nslookup syedsheraz.me`)

---

### Step 2: Install Certbot for Free SSL Certificate

Connect to your EC2 instance and install Certbot:

```bash
ssh -i "your-key.pem" ubuntu@54.123.45.67
```

Then run:

```bash
# Update system packages
sudo apt update && sudo apt install -y certbot python3-certbot-nginx

# Generate SSL certificate for your domain
sudo certbot certonly --nginx \
  -d syedsheraz.me \
  -d www.syedsheraz.me \
  --agree-tos \
  --non-interactive \
  -m sherazamjad933@gmail.com
```

✅ Certificates saved in: `/etc/letsencrypt/live/syedsheraz.me/`

---

### Step 3: Update Nginx Configuration

Update the Nginx config to use your domain and SSL:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Replace with this config:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name syedsheraz.me www.syedsheraz.me;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server Block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name syedsheraz.me www.syedsheraz.me;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/syedsheraz.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/syedsheraz.me/privkey.pem;

    # SSL Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Root directory for static React SPA build
    root /var/www/portfolio;
    index index.html index.htm;

    # Client body size limit
    client_max_body_size 10M;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;
    gzip_disable "MSIE [1-6]\.";

    # Reverse proxy for Backend REST API
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static frontend SPA routing (fallback to index.html for client-side routing)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff|woff2|ttf|eot|webp)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, max-age=15552000, immutable";
    }

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

Save with `Ctrl+X`, then `Y`, then `Enter`.

---

### Step 4: Test & Enable Nginx Configuration

```bash
# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

---

### Step 5: Verify Deployment

✅ Visit your domain in a browser:
```
https://syedsheraz.me
```

You should see:
- 🔒 Green HTTPS lock icon
- ✨ Your 3D portfolio website
- 📧 Contact form working

---

### Step 6: Auto-Renew SSL Certificate

Certbot automatically renews certificates 30 days before expiry. Verify:

```bash
sudo certbot renew --dry-run
```

If successful, the auto-renewal is configured. ✅

---

## 🐛 Troubleshooting

### Domain not resolving?
```bash
# Test DNS
nslookup syedsheraz.me
dig syedsheraz.me

# Should show your EC2 IP: 54.123.45.67
```

### Nginx showing "default site"?
```bash
# Check symlink
sudo ls -la /etc/nginx/sites-enabled/

# If portfolio symlink missing, create it:
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL certificate not found?
```bash
# List issued certificates
sudo certbot certificates

# If missing, re-issue:
sudo certbot certonly --nginx \
  -d syedsheraz.me \
  -d www.syedsheraz.me \
  --agree-tos -m sherazamjad933@gmail.com
```

### Mixed content warning (HTTP content on HTTPS)?
Ensure all frontend API calls use `/api/` (relative path) instead of `http://localhost:5000`.

Check in [client/src/services/api.ts](../client/src/services/api.ts) — it should use relative paths.

---

## 🔒 Security Checklist

- ✅ HTTPS/SSL enabled
- ✅ Auto-redirect HTTP → HTTPS
- ✅ HSTS header configured
- ✅ Security group allows ports 80, 443 (and 22 for SSH)
- ✅ No hardcoded IPs in frontend
- ✅ Environment variables secured in `.env`

---

## 🔄 Continuous Deployment

Your GitHub Actions CI/CD pipeline already deploys to EC2. After DNS/SSL is configured:

1. Push code to `main` branch
2. GitHub Actions builds Docker images
3. `deploy.sh` pulls latest images and restarts containers
4. Nginx routes traffic through HTTPS to your new domain

No additional configuration needed! 🚀

---

## 📞 Need Help?

- **Certbot Issues**: `sudo certbot logs`
- **Nginx Issues**: `sudo nginx -t` + `sudo journalctl -u nginx`
- **DNS Issues**: Wait 10-15 min, then `nslookup syedsheraz.me`
- **Contact Form Emails**: Check [GMAIL_SETUP.md](./GMAIL_SETUP.md)

---

**Your portfolio is now live at `https://syedsheraz.me` with professional HTTPS! 🎉**
