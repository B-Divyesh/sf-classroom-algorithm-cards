#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: ./verify-url.sh <url>" >&2
  exit 64
fi

node scripts/verify-url.mjs "$1"
