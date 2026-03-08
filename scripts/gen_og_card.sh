#!/usr/bin/env bash
set -euo pipefail

title=""
subtitle=""
tag="samir-bettahar.dev"
out=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --title)
      title="${2:-}"
      shift 2
      ;;
    --subtitle)
      subtitle="${2:-}"
      shift 2
      ;;
    --tag)
      tag="${2:-}"
      shift 2
      ;;
    --out)
      out="${2:-}"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$title" || -z "$subtitle" || -z "$out" ]]; then
  echo "Usage: scripts/gen_og_card.sh --title \"...\" --subtitle \"...\" [--tag \"...\"] --out /abs/path.png" >&2
  exit 1
fi

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick 'magick' command is required." >&2
  exit 1
fi

mkdir -p "$(dirname "$out")"

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

bg="$tmp_dir/bg.png"
wrapped_title="$(printf '%s' "$title" | fold -s -w 24 | sed -n '1,2p')"
wrapped_subtitle="$(printf '%s' "$subtitle" | fold -s -w 46 | sed -n '1,2p')"

magick -size 1200x630 xc:"#020617" \
  -fill "#132d62" -draw "circle 1040,115 1040,245" \
  -fill "#102754" -draw "circle 170,560 170,740" \
  -fill "#11346f" -draw "circle 690,325 690,455" \
  -fill "#1b3f86" -draw "rectangle 0,545 1200,630" \
  -font "Helvetica" -pointsize 48 -fill "#93c5fd" \
  -gravity northwest -annotate +70+84 "$tag" \
  -font "Helvetica-Bold" -pointsize 80 -fill "#f8fafc" \
  -interline-spacing -8 -gravity northwest -annotate +70+240 "$wrapped_title" \
  -font "Helvetica" -pointsize 52 -fill "#b8c6dc" \
  -interline-spacing -4 -gravity northwest -annotate +70+430 "$wrapped_subtitle" \
  "$out"

echo "Generated $out"
