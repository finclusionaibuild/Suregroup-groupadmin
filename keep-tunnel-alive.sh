#!/usr/bin/env bash
set -euo pipefail
LOG=/workspace/cloudflared.log
BIN=/workspace/cloudflared
PROTO_ARGS="--protocol http2"
while true; do
  if ! pgrep -f " tunnel" >/dev/null 2>&1; then
    nohup "" tunnel --url http://127.0.0.1:5173 --no-autoupdate  >>"" 2>&1 &
    disown || true
  fi
  tail -n 200 "" >".tmp" 2>/dev/null || true
  mv -f ".tmp" "" 2>/dev/null || true
  sleep 10
done
