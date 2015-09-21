#!/bin/sh

set -e

echo "=== Installing dependencies ==="
npm install
echo

echo "=== Setting up database ==="
./resources/setup-database.js
echo

if [ ! -f .env ]; then
  echo "=== Establishing environment variables ==="
  cp .sample.env .env
  echo ".sample.env copied to .env. Please open this file and fill in any missing values."
fi
