#!/usr/bin/env bash
set -euo pipefail

REPORT="${1:-.unlighthouse-ci/ci-result.json}"
OUT_DIR="${2:-.unlighthouse-ci/analysis}"
PERF_MIN="${PERF_MIN:-80}"
SEO_MIN="${SEO_MIN:-90}"
A11Y_MIN="${A11Y_MIN:-90}"

usage() {
  cat <<USAGE
Usage:
  $(basename "$0") [report.json] [output_dir]

Defaults:
  report.json  .unlighthouse-ci/ci-result.json
  output_dir   .unlighthouse-ci/analysis

Environment thresholds:
  PERF_MIN (default: 80)
  SEO_MIN (default: 90)
  A11Y_MIN (default: 90)
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required but was not found in PATH" >&2
  exit 1
fi

if [[ ! -f "$REPORT" ]]; then
  echo "Missing report: $REPORT" >&2
  echo "Run: pnpm run audit:ci --site <url>" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

jq --argjson perf "$PERF_MIN" --argjson seo "$SEO_MIN" --argjson a11y "$A11Y_MIN" '
  def pct(v): ((v // 0) * 100 | round);
  {
    generatedAt: (now | todateiso8601),
    thresholds: {
      performance: $perf,
      seo: $seo,
      accessibility: $a11y
    },
    totals: {
      routes: (.routes | length),
      performanceBelow: ([.routes[] | select(pct(.categories.performance.score) < $perf)] | length),
      seoBelow: ([.routes[] | select(pct(.categories.seo.score) < $seo)] | length),
      accessibilityBelow: ([.routes[] | select(pct(.categories.accessibility.score) < $a11y)] | length)
    },
    averages: {
      overall: pct(.summary.score),
      performance: pct(.summary.categories.performance.score),
      seo: pct(.summary.categories.seo.score),
      accessibility: pct(.summary.categories.accessibility.score)
    },
    worstRoutes: (
      [.routes[]
        | {
            path,
            overall: pct(.score),
            performance: pct(.categories.performance.score),
            seo: pct(.categories.seo.score),
            accessibility: pct(.categories.accessibility.score),
            lcpMs: (.metrics["largest-contentful-paint"].numericValue // null),
            cls: (.metrics["cumulative-layout-shift"].numericValue // null),
            tbtMs: (.metrics["total-blocking-time"].numericValue // null),
            floor: ([pct(.categories.performance.score), pct(.categories.seo.score), pct(.categories.accessibility.score)] | min)
          }
      ]
      | sort_by(.floor, .overall)
      | .[:5]
    )
  }
' "$REPORT" > "$OUT_DIR/summary.json"

jq -r '
  def pct(v): ((v // 0) * 100 | round);
  [
    .routes[]
    | {
        path,
        overall: pct(.score),
        performance: pct(.categories.performance.score),
        seo: pct(.categories.seo.score),
        accessibility: pct(.categories.accessibility.score),
        floor: ([pct(.categories.performance.score), pct(.categories.seo.score), pct(.categories.accessibility.score)] | min)
      }
  ]
  | sort_by(.floor, .overall)
  | .[:10]
  | (["path", "overall", "performance", "seo", "accessibility"] | @tsv),
    (.[] | [.path, (.overall|tostring), (.performance|tostring), (.seo|tostring), (.accessibility|tostring)] | @tsv)
' "$REPORT" > "$OUT_DIR/worst-routes.tsv"

jq -r --argjson perf "$PERF_MIN" --argjson seo "$SEO_MIN" --argjson a11y "$A11Y_MIN" '
  def pct(v): ((v // 0) * 100 | round);
  def list_paths(paths):
    if (paths | length) == 0 then "- none"
    else (paths | map("- `" + . + "`") | join("\n"))
    end;

  ([.routes[]
    | select((.path == "/" or .path == "/blog") and (
        pct(.categories.performance.score) < $perf or
        pct(.categories.seo.score) < $seo or
        pct(.categories.accessibility.score) < $a11y
      ))
    | .path
  ] | unique) as $coreFails
  | ([.routes[] | select(pct(.categories.performance.score) < $perf) | .path] | unique) as $perfFails
  | ([.routes[] | select(pct(.categories.seo.score) < $seo) | .path] | unique) as $seoFails
  | ([.routes[] | select(pct(.categories.accessibility.score) < $a11y) | .path] | unique) as $a11yFails
  | ([.routes[] | select((.metrics["largest-contentful-paint"].numericValue // 0) > 2500) | .path] | unique) as $lcpSlow
  | ([.routes[] | select((.metrics["cumulative-layout-shift"].numericValue // 0) > 0.10) | .path] | unique) as $clsHigh
  | ([.routes[] | select((.metrics["total-blocking-time"].numericValue // 0) > 200) | .path] | unique) as $tbtHigh
  |
  "# Unlighthouse Fix Plan\n\n"
  + "- Routes scanned: \(.routes | length)\n"
  + "- Thresholds: Performance >= \($perf), SEO >= \($seo), Accessibility >= \($a11y)\n\n"
  + "## P0: Core routes below threshold\n"
  + list_paths($coreFails)
  + "\n\n## P1: Repeated category failures\n"
  + (if ($perfFails | length) > 0 then "- Performance below threshold on \($perfFails | length) route(s). Fix: optimize hero media/fonts, trim JS, and strengthen caching.\n" else "" end)
  + (if ($seoFails | length) > 0 then "- SEO below threshold on \($seoFails | length) route(s). Fix: unique title/description, canonical tags, and crawlable internal links.\n" else "" end)
  + (if ($a11yFails | length) > 0 then "- Accessibility below threshold on \($a11yFails | length) route(s). Fix: contrast, labels, alt text, and heading hierarchy.\n" else "" end)
  + (if ($perfFails | length) == 0 and ($seoFails | length) == 0 and ($a11yFails | length) == 0 then "- none\n" else "" end)
  + "\n## P2: Metric hotspots\n"
  + (if ($lcpSlow | length) > 0 then "- LCP > 2.5s on \($lcpSlow | length) route(s). Prioritize image sizing/compression and critical asset preload.\n" else "" end)
  + (if ($clsHigh | length) > 0 then "- CLS > 0.10 on \($clsHigh | length) route(s). Reserve layout space and avoid late style/DOM shifts.\n" else "" end)
  + (if ($tbtHigh | length) > 0 then "- TBT > 200ms on \($tbtHigh | length) route(s). Break up long tasks and defer non-critical JS.\n" else "" end)
  + (if ($lcpSlow | length) == 0 and ($clsHigh | length) == 0 and ($tbtHigh | length) == 0 then "- none\n" else "" end)
  + "\n## Re-test\n```bash\npnpm run audit:ci --site <url>\npnpm run audit:analyze\n```\n"
' "$REPORT" > "$OUT_DIR/fix-plan.md"

echo "Wrote $OUT_DIR/summary.json"
echo "Wrote $OUT_DIR/worst-routes.tsv"
echo "Wrote $OUT_DIR/fix-plan.md"
