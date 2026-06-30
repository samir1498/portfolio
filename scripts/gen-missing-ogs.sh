#!/usr/bin/env bash
set -euo pipefail

if ! command -v magick &>/dev/null; then
  echo "ImageMagick not found — skipping OG generation" >&2
  exit 0
fi

root="$(cd "$(dirname "$0")/.." && pwd)"
missing=0

scan_dir() {
  local src_dir="$1"
  local public_base="$2"
  for f in "$src_dir"/*.mdx; do
    [ -f "$f" ] || continue
    # skip drafts
    grep -q '^draft: true' "$f" && continue
    og=$(grep 'ogImage:' "$f" | head -1 | sed "s/.*ogImage: *['\"]//;s/['\"].*//")
    [ -z "$og" ] && continue

    fullpath="$root/public${og}"
    if [ ! -f "$fullpath" ]; then
      title=$(grep '^title:' "$f" || true | head -1 | sed 's/^title: *//;s/^["\x27"]//;s/["\x27"]$//')
      subtitle=$(grep 'subtitle:' "$f" || true | head -1 | sed 's/^subtitle: *//;s/^["\x27"]//;s/["\x27"]$//')
      desc=$(grep 'description:' "$f" || true | head -1 | sed 's/^description: *//;s/^["\x27"]//;s/["\x27"]$//')
      sub="${subtitle:-$desc}"
      sub="${sub:-$title}"  # fallback
      sub="$(echo "$sub" | cut -c1-60)"
      echo "Generating $og → $title"
      bash "$root/scripts/gen_og_card.sh" --title "$title" --subtitle "$sub" --out "$fullpath"
      ((missing++))
    fi
  done
}

scan_dir "$root/src/content/blog" "/og/blog"
scan_dir "$root/src/content/projects" "/og/projects"

[ "$missing" -gt 0 ] && echo "Generated $missing missing OG images" || echo "All OG images present"
