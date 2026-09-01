#!/bin/bash

# 🔍 Portfolio Contact Form Diagnostics Script
# Run this on your EC2 to check all systems

echo "=========================================="
echo "📋 Contact Form Diagnostics"
echo "=========================================="
echo ""

# 1. Check Backend Running
echo "1️⃣  Checking Backend Server..."
if pm2 status | grep -q "portfolio-api"; then
  echo "✅ Backend is running"
  pm2 show portfolio-api | grep -E "status|uptime"
else
  echo "❌ Backend NOT running"
  echo "   Fix: pm2 start ecosystem.config.cjs"
fi
echo ""

# 2. Check MongoDB
echo "2️⃣  Checking MongoDB..."
if sudo systemctl is-active --quiet mongod; then
  echo "✅ MongoDB is running"
  MONGO_CHECK=$(mongosh --eval "db.adminCommand('ping')" --quiet 2>/dev/null | grep -c ok || echo "0")
  if [ "$MONGO_CHECK" -gt 0 ]; then
    echo "✅ MongoDB connection OK"
  else
    echo "⚠️  MongoDB not responding"
  fi
else
  echo "❌ MongoDB NOT running"
  echo "   Fix: sudo systemctl start mongod"
fi
echo ""

# 3. Check Port 5000
echo "3️⃣  Checking Port 5000..."
if lsof -i :5000 >/dev/null 2>&1; then
  echo "✅ Port 5000 is listening"
else
  echo "❌ Port 5000 NOT listening"
fi
echo ""

# 4. Check .env File
echo "4️⃣  Checking .env Configuration..."
ENV_FILE="/var/www/portfolio/server/.env"
if [ -f "$ENV_FILE" ]; then
  echo "✅ .env file exists"
  
  # Check critical variables
  if grep -q "EMAIL_USER=" "$ENV_FILE"; then
    EMAIL_USER=$(grep "EMAIL_USER=" "$ENV_FILE" | cut -d '=' -f2)
    echo "   EMAIL_USER: $EMAIL_USER"
  else
    echo "❌ EMAIL_USER not set"
  fi
  
  if grep -q "EMAIL_PASS=" "$ENV_FILE"; then
    EMAIL_PASS=$(grep "EMAIL_PASS=" "$ENV_FILE" | cut -d '=' -f2)
    if [ -z "$EMAIL_PASS" ]; then
      echo "❌ EMAIL_PASS is empty"
    else
      echo "✅ EMAIL_PASS is set (length: ${#EMAIL_PASS})"
    fi
  else
    echo "❌ EMAIL_PASS not set"
  fi
  
  if grep -q "MONGO_URI=" "$ENV_FILE"; then
    MONGO_URI=$(grep "MONGO_URI=" "$ENV_FILE" | cut -d '=' -f2)
    echo "   MONGO_URI: $MONGO_URI"
  else
    echo "❌ MONGO_URI not set"
  fi
else
  echo "❌ .env file NOT found at $ENV_FILE"
  echo "   Create it with: sudo nano $ENV_FILE"
fi
echo ""

# 5. Check ContactMessage Collection
echo "5️⃣  Checking Database Collections..."
COLLECTION_COUNT=$(mongosh mongodb://127.0.0.1:27017/portfolio --eval "db.contactmessages.countDocuments()" --quiet 2>/dev/null || echo "0")
echo "   ContactMessages in DB: $COLLECTION_COUNT"

if [ "$COLLECTION_COUNT" -gt 0 ]; then
  echo "✅ Messages are being saved to database"
  mongosh mongodb://127.0.0.1:27017/portfolio --eval "db.contactmessages.findOne()" --quiet
else
  echo "⚠️  No messages in database yet"
fi
echo ""

# 6. Test API Endpoint
echo "6️⃣  Testing API Endpoint..."
API_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health)
if [ "$API_TEST" = "200" ]; then
  echo "✅ API /api/health: OK (200)"
else
  echo "❌ API /api/health: Failed ($API_TEST)"
fi
echo ""

# 7. Test Contact Endpoint
echo "7️⃣  Testing Contact Endpoint..."
CONTACT_TEST=$(curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}' \
  -o /tmp/contact_response.json \
  -w "%{http_code}")

if [ "$CONTACT_TEST" = "201" ] || [ "$CONTACT_TEST" = "200" ]; then
  echo "✅ Contact endpoint: OK ($CONTACT_TEST)"
  echo "   Response: $(cat /tmp/contact_response.json | jq -r '.message' 2>/dev/null || cat /tmp/contact_response.json)"
else
  echo "❌ Contact endpoint: Failed ($CONTACT_TEST)"
  echo "   Response: $(cat /tmp/contact_response.json)"
fi
echo ""

echo "=========================================="
echo "📊 Diagnostics Complete"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Fix any ❌ issues above"
echo "2. Restart backend: pm2 restart portfolio-api"
echo "3. View logs: pm2 logs portfolio-api"
echo "4. Test form at: https://syedsheraz.me"
