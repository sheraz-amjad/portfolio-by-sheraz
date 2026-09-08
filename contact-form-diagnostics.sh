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
  echo "   Fix: pm2 start ecosystem.config.cjs --env production"
fi
echo ""

# 2. Check MySQL
echo "2️⃣  Checking MySQL..."
if sudo systemctl is-active --quiet mysql; then
  echo "✅ MySQL is running"
  MYSQL_CHECK=$(mysqladmin ping -h 127.0.0.1 2>/dev/null | grep -c "mysqld is alive" || echo "0")
  if [ "$MYSQL_CHECK" -gt 0 ]; then
    echo "✅ MySQL connection OK"
  else
    echo "⚠️  MySQL not responding to ping"
  fi
else
  echo "❌ MySQL NOT running"
  echo "   Fix: sudo systemctl start mysql"
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

# 4. Check ecosystem.config.cjs Configuration
echo "4️⃣  Checking Environment Configuration..."
ECOSYSTEM_FILE="/var/www/portfolio/ecosystem.config.cjs"
if [ -f "$ECOSYSTEM_FILE" ]; then
  echo "✅ ecosystem.config.cjs exists"

  if grep -q "EMAIL_USER" "$ECOSYSTEM_FILE"; then
    EMAIL_USER=$(grep "EMAIL_USER" "$ECOSYSTEM_FILE" | head -1 | sed -E 's/.*EMAIL_USER["'"'"']?\s*:\s*["'"'"']?([^"'"'"',]*).*/\1/')
    echo "   EMAIL_USER: $EMAIL_USER"
  else
    echo "❌ EMAIL_USER not set"
  fi

  if grep -q "EMAIL_PASS" "$ECOSYSTEM_FILE"; then
    EMAIL_PASS=$(grep "EMAIL_PASS" "$ECOSYSTEM_FILE" | head -1 | sed -E 's/.*EMAIL_PASS["'"'"']?\s*:\s*["'"'"']?([^"'"'"',]*).*/\1/')
    if [ -z "$EMAIL_PASS" ]; then
      echo "❌ EMAIL_PASS is empty"
    else
      echo "✅ EMAIL_PASS is set (length: ${#EMAIL_PASS})"
    fi
  else
    echo "❌ EMAIL_PASS not set"
  fi

  if grep -q "DATABASE_URL" "$ECOSYSTEM_FILE"; then
    DB_URL=$(grep "DATABASE_URL" "$ECOSYSTEM_FILE" | head -1 | sed -E 's#.*(mysql://[^"'"'"']*).*#\1#')
    # Mask the password before printing
    DB_URL_MASKED=$(echo "$DB_URL" | sed -E 's#(mysql://[^:]+:)[^@]+(@)#\1****\2#')
    echo "   DATABASE_URL: $DB_URL_MASKED"
    if echo "$DB_URL" | grep -q "postgres://"; then
      echo "❌ WARNING: DATABASE_URL still points to postgres:// — should be mysql://"
    fi
  else
    echo "❌ DATABASE_URL not set"
  fi
else
  echo "❌ ecosystem.config.cjs NOT found at $ECOSYSTEM_FILE"
fi
echo ""

# 5. Check contact_messages Table
echo "5️⃣  Checking Database Table..."
DB_NAME="portfolio"
DB_USER="portfolio"
read -s -p "   Enter MySQL password for user '$DB_USER' (input hidden): " DB_PASS
echo ""

ROW_COUNT=$(mysql -h 127.0.0.1 -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -N -e "SELECT COUNT(*) FROM contact_messages;" 2>/dev/null)

if [ -n "$ROW_COUNT" ]; then
  echo "   ContactMessages in DB: $ROW_COUNT"
  if [ "$ROW_COUNT" -gt 0 ]; then
    echo "✅ Messages are being saved to database"
    mysql -h 127.0.0.1 -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "SELECT * FROM contact_messages ORDER BY id DESC LIMIT 1\G" 2>/dev/null
  else
    echo "⚠️  No messages in database yet"
  fi
else
  echo "❌ Could not query contact_messages table (check credentials or table name)"
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
echo "2. Restart backend: pm2 restart portfolio-api --update-env"
echo "3. View logs: pm2 logs portfolio-api"
echo "4. Test form at: https://syedsheraz.me"