#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRAND_DIR="$ROOT_DIR/public/brand"

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick 'magick' command is required." >&2
  exit 1
fi

magick -background none "$BRAND_DIR/logo-mark.svg" -resize 512x512 "$BRAND_DIR/logo-mark-512.png"
magick -background none "$BRAND_DIR/logo-mark.svg" -resize 256x256 "$BRAND_DIR/logo-mark-256.png"
magick -background none "$BRAND_DIR/logo-mark.svg" -resize 128x128 "$BRAND_DIR/logo-mark-128.png"
magick -background none "$BRAND_DIR/logo-lockup-light.svg" -resize 1200x300 "$BRAND_DIR/logo-lockup-light-1200x300.png"
magick -background none "$BRAND_DIR/logo-lockup-dark.svg" -resize 1200x300 "$BRAND_DIR/logo-lockup-dark-1200x300.png"
magick -background none "$BRAND_DIR/favicon-brand.svg" -resize 64x64 "$BRAND_DIR/favicon-brand-64.png"

echo "Brand PNG assets generated in $BRAND_DIR"
