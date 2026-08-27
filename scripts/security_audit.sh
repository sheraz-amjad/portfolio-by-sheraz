#!/usr/bin/env bash
# ==============================================================================
# Linux Server Automated Malware Scan & Security Hardening Script
# Author: Syed Sheraz Amjad (DevOps Engineer)
# Description: Automated security scanner for compromised Linux servers & databases
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

TARGET_DIR="${1:-.}"

echo -e "${CYAN}================================================================${NC}"
echo -e "${CYAN}🛡️  Starting Automated Linux Malware & Security Audit Engine${NC}"
echo -e "${CYAN}🎯 Target Directory: $TARGET_DIR${NC}"
echo -e "${CYAN}================================================================${NC}"

# 1. Check for suspicious PHP / Webshell execution patterns
echo -e "\n${YELLOW}[+] Phase 1: Scanning for obfuscated eval() / base64 payloads...${NC}"
SUSPICIOUS_PATTERNS=(
    "eval(base64_decode"
    "eval(gzinflate"
    "passthru("
    "shell_exec("
    "system($_GET"
    "c99shell"
    "r57shell"
    "WSO_VERSION"
    "/bin/sh -i"
    "curl -s http.*|sh"
)

FOUND_THREATS=0

for pattern in "${SUSPICIOUS_PATTERNS[@]}"; do
    MATCHES=$(grep -rnI --exclude-dir={node_modules,.git,dist} "$pattern" "$TARGET_DIR" 2>/dev/null || true)
    if [ -n "$MATCHES" ]; then
        echo -e "${RED}[ALERT] Found potential malicious signature: '$pattern'${NC}"
        echo "$MATCHES" | head -n 5
        FOUND_THREATS=$((FOUND_THREATS + 1))
    fi
done

if [ "$FOUND_THREATS" -eq 0 ]; then
    echo -e "${GREEN}[✓] Clean: No common obfuscated webshell signatures detected.${NC}"
fi

# 2. Check for hidden executable files in writable web directories
echo -e "\n${YELLOW}[+] Phase 2: Inspecting suspicious executable permissions in public assets...${NC}"
WRITABLE_EXECS=$(find "$TARGET_DIR" -type f \( -name "*.php" -o -name "*.sh" -o -name "*.py" \) -perm -u+x 2>/dev/null | grep -v "node_modules" | grep -v "\.git" || true)

if [ -n "$WRITABLE_EXECS" ]; then
    echo -e "${YELLOW}[!] Warning: Found executable scripts in directory:${NC}"
    echo "$WRITABLE_EXECS"
else
    echo -e "${GREEN}[✓] Clean: No unauthorized executable scripts detected.${NC}"
fi

# 3. Check for listening network ports and open sockets (Linux only)
echo -e "\n${YELLOW}[+] Phase 3: Inspecting open network listeners...${NC}"
if command -v ss &> /dev/null; then
    ss -tulpn | grep LISTEN || true
elif command -v netstat &> /dev/null; then
    netstat -tuln | grep LISTEN || true
else
    echo -e "${CYAN}[i] Network socket inspector skipped (ss/netstat not found in this environment).${NC}"
fi

# 4. Summary Output
echo -e "\n${CYAN}================================================================${NC}"
if [ "$FOUND_THREATS" -eq 0 ]; then
    echo -e "${GREEN}🎉 SECURITY AUDIT PASSED! System files are verified and sanitized.${NC}"
else
    echo -e "${RED}⚠️  SECURITY AUDIT FLAGGED $FOUND_THREATS ISSUE(S). Please inspect logs above.${NC}"
fi
echo -e "${CYAN}================================================================${NC}"
