#!/usr/bin/env bash
# Phase 1 — VPS security baseline verification
# Run on the VPS: bash scripts/vps-security/phase1-baseline.sh

set -euo pipefail

section() {
  echo ""
  echo "========================================"
  echo "$1"
  echo "========================================"
}

section "PM2"
pm2 list 2>/dev/null || echo "pm2 not available"

section "PUBLIC LISTENERS (excluding 127.0.0.1 / ::1)"
sudo ss -tlnp | grep LISTEN | grep -v '127.0.0.1\|::1' || echo "(none)"

section "UFW"
sudo ufw status verbose 2>/dev/null || echo "ufw status unavailable"

section "DOCKER"
docker ps --format "table {{.Names}}\t{{.Ports}}" 2>/dev/null || echo "docker not available"

section "CRONTAB (abiy)"
crontab -l 2>&1 || true

section "CRONTAB (root)"
sudo crontab -l 2>&1 || true

section "TOP CPU PROCESSES"
ps aux --sort=-%cpu | head -10

section "AUTHORIZED_KEYS"
cat ~/.ssh/authorized_keys 2>/dev/null || echo "(none)"

section "LD.SO.PRELOAD"
sudo cat /etc/ld.so.preload 2>/dev/null || echo "no ld.so.preload"

section "MALWARE GREP (cron + quarantine)"
grep -r "nullbyte\|xmrig\|cpu-logind" /etc/cron* ~/incident-quarantine/ 2>/dev/null | head -20 || echo "no matches"

section "PM2 BINDINGS (3000, 4000)"
sudo ss -tlnp | grep -E ':3000|:4000' || echo "(none)"

section "DOCKER SENSITIVE PORTS"
sudo ss -tlnp | grep -E ':5437|:5438|:6387|:6388|:8087|:8088|:5678|:5679' || echo "(none)"

echo ""
echo "Phase 1 complete."
