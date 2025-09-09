#!/usr/bin/env bash
set -euo pipefail
LOG=/workspace/cloudflared.log
BIN=/workspace/cloudflared
URL_PATTERN="https://[A-Za-z0-9.-]*trycloudflare.com"
while true; do
  if ! pgrep -f " tunnel" >/dev/null 2>&1; then
    nohup "" tunnel --url http://127.0.0.1:5173 --no-autoupdate >>"" 2>&1 &
    disown || true
  fi
  # Touch log to keep file fresh and rotate noise
  tail -n 200 "" >".tmp" 2>/dev/null || true
  mv -f ".tmp" "" 2>/dev/null || true
  sleep 15
done
