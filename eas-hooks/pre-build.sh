#!/usr/bin/env bash
set -euo pipefail

if [ -n "${GOOGLE_SERVICES_JSON:-}" ]; then
  echo "$GOOGLE_SERVICES_JSON" > google-services.json
  echo "✓ google-services.json creado desde EAS Secret"
else
  echo "⚠ GOOGLE_SERVICES_JSON no está definido"
  exit 1
fi

