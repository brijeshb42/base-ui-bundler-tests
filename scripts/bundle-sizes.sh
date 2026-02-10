#!/bin/bash

# Bundle Size Analysis Script
# Run from the root of the base-ui-bundler-tests directory

cd "$(dirname "$0")/.." || exit 1

# Colors for output
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper function to get file size in bytes
get_size() {
  if [[ -f "$1" ]]; then
    stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null
  else
    echo "0"
  fi
}

# Helper function to get gzipped size
get_gzip_size() {
  if [[ -f "$1" ]]; then
    gzip -c "$1" 2>/dev/null | wc -c | tr -d ' '
  else
    echo "0"
  fi
}

# Helper function to format size in KB with one decimal
format_kb() {
  local bytes=$1
  echo "scale=1; $bytes / 1024" | bc
}

echo -e "${BOLD}${CYAN}=== Bundle Size Analysis ===${NC}"
echo ""

# Check if dist directories exist
if [[ ! -d "vite-app/dist" ]]; then
  echo -e "${YELLOW}Warning: Build outputs not found. Run 'pnpm build' first.${NC}"
  exit 1
fi

echo -e "${BOLD}Minified Sizes:${NC}"
echo "┌─────────────────┬───────────┬─────────────────┬─────────────┬─────────────┐"
echo "│ Bundler         │ App       │ Vendor-Base-UI  │ Vendor      │ Total       │"
echo "├─────────────────┼───────────┼─────────────────┼─────────────┼─────────────┤"

# rolldown
if [[ -d "rolldown-app/dist" ]]; then
  app=$(get_size "rolldown-app/dist/index.min.js")
  runtime=$(get_size "rolldown-app/dist/rolldown-runtime.min.js")
  baseui=$(get_size "rolldown-app/dist/vendor-base-ui.min.js")
  vendor=$(get_size "rolldown-app/dist/vendor.min.js")
  total=$((app + runtime + baseui + vendor))
  printf "│ %-15s │ %6.1f KB │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "rolldown" "$(format_kb $app)" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# vite
if [[ -d "vite-app/dist/assets" ]]; then
  app=$(get_size "$(ls vite-app/dist/assets/index-*.js 2>/dev/null | head -1)")
  baseui=$(get_size "$(ls vite-app/dist/assets/vendor-base-ui-*.js 2>/dev/null | head -1)")
  vendor=$(get_size "$(ls vite-app/dist/assets/vendor-*.js 2>/dev/null | grep -v base-ui | head -1)")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %6.1f KB │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "vite" "$(format_kb $app)" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# vite-swc
if [[ -d "vite-swc-app/dist/assets" ]]; then
  app=$(get_size "$(ls vite-swc-app/dist/assets/index-*.js 2>/dev/null | head -1)")
  baseui=$(get_size "$(ls vite-swc-app/dist/assets/vendor-base-ui-*.js 2>/dev/null | head -1)")
  vendor=$(get_size "$(ls vite-swc-app/dist/assets/vendor-*.js 2>/dev/null | grep -v base-ui | head -1)")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %6.1f KB │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "vite-swc" "$(format_kb $app)" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# rsbuild
if [[ -d "rsbuild-app/dist/static/js" ]]; then
  app=$(get_size "$(ls rsbuild-app/dist/static/js/index.*.js 2>/dev/null | head -1)")
  baseui=$(get_size "$(ls rsbuild-app/dist/static/js/vendor-base-ui.*.js 2>/dev/null | head -1)")
  vendor=$(get_size "$(ls rsbuild-app/dist/static/js/vendor.*.js 2>/dev/null | head -1)")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %6.1f KB │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "rsbuild" "$(format_kb $app)" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# webpack-5
if [[ -d "webpack-5-app/dist" ]]; then
  app=$(get_size "webpack-5-app/dist/main.bundle.js")
  baseui=$(get_size "webpack-5-app/dist/vendor-base-ui.bundle.js")
  vendor=$(get_size "webpack-5-app/dist/vendor.bundle.js")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %6.1f KB │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "webpack-5" "$(format_kb $app)" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# webpack-4
if [[ -d "webpack-4-app/dist" ]]; then
  app=$(get_size "webpack-4-app/dist/main.bundle.js")
  baseui=$(get_size "webpack-4-app/dist/vendor-base-ui.bundle.js")
  vendor=$(get_size "webpack-4-app/dist/vendor.bundle.js")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %6.1f KB │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "webpack-4**" "$(format_kb $app)" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# esbuild (single bundle)
if [[ -d "esbuild-app/dist" ]]; then
  total=$(get_size "esbuild-app/dist/index.min.js")
  printf "│ %-15s │ %9s │ %15s │ %11s │ %8.1f KB │\n" \
    "esbuild*" "(single)" "-" "-" "$(format_kb $total)"
fi

# parcel (single bundle)
if [[ -d "parcel-app/dist" ]]; then
  total=$(get_size "$(ls parcel-app/dist/parcel-app.*.js 2>/dev/null | head -1)")
  printf "│ %-15s │ %9s │ %15s │ %11s │ %8.1f KB │\n" \
    "parcel*" "(single)" "-" "-" "$(format_kb $total)"
fi

echo "└─────────────────┴───────────┴─────────────────┴─────────────┴─────────────┘"
echo ""
echo -e "${YELLOW}*  No manual chunk splitting (bundler limitation)${NC}"
echo -e "${YELLOW}** Webpack 4 has less efficient tree-shaking${NC}"
echo ""

# Gzipped sizes section
echo -e "${BOLD}Gzipped Sizes:${NC}"
echo "┌─────────────────┬─────────────────┬─────────────┬─────────────┐"
echo "│ Bundler         │ Vendor-Base-UI  │ Vendor      │ Total JS    │"
echo "├─────────────────┼─────────────────┼─────────────┼─────────────┤"

# rolldown gzipped
if [[ -d "rolldown-app/dist" ]]; then
  app=$(get_gzip_size "rolldown-app/dist/index.min.js")
  runtime=$(get_gzip_size "rolldown-app/dist/rolldown-runtime.min.js")
  baseui=$(get_gzip_size "rolldown-app/dist/vendor-base-ui.min.js")
  vendor=$(get_gzip_size "rolldown-app/dist/vendor.min.js")
  total=$((app + runtime + baseui + vendor))
  printf "│ %-15s │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "rolldown" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# vite gzipped
if [[ -d "vite-app/dist/assets" ]]; then
  app=$(get_gzip_size "$(ls vite-app/dist/assets/index-*.js 2>/dev/null | head -1)")
  baseui=$(get_gzip_size "$(ls vite-app/dist/assets/vendor-base-ui-*.js 2>/dev/null | head -1)")
  vendor=$(get_gzip_size "$(ls vite-app/dist/assets/vendor-*.js 2>/dev/null | grep -v base-ui | head -1)")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "vite" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# vite-swc gzipped
if [[ -d "vite-swc-app/dist/assets" ]]; then
  app=$(get_gzip_size "$(ls vite-swc-app/dist/assets/index-*.js 2>/dev/null | head -1)")
  baseui=$(get_gzip_size "$(ls vite-swc-app/dist/assets/vendor-base-ui-*.js 2>/dev/null | head -1)")
  vendor=$(get_gzip_size "$(ls vite-swc-app/dist/assets/vendor-*.js 2>/dev/null | grep -v base-ui | head -1)")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "vite-swc" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# rsbuild gzipped
if [[ -d "rsbuild-app/dist/static/js" ]]; then
  app=$(get_gzip_size "$(ls rsbuild-app/dist/static/js/index.*.js 2>/dev/null | head -1)")
  baseui=$(get_gzip_size "$(ls rsbuild-app/dist/static/js/vendor-base-ui.*.js 2>/dev/null | head -1)")
  vendor=$(get_gzip_size "$(ls rsbuild-app/dist/static/js/vendor.*.js 2>/dev/null | head -1)")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "rsbuild" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# webpack-5 gzipped
if [[ -d "webpack-5-app/dist" ]]; then
  app=$(get_gzip_size "webpack-5-app/dist/main.bundle.js")
  baseui=$(get_gzip_size "webpack-5-app/dist/vendor-base-ui.bundle.js")
  vendor=$(get_gzip_size "webpack-5-app/dist/vendor.bundle.js")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "webpack-5" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# webpack-4 gzipped
if [[ -d "webpack-4-app/dist" ]]; then
  app=$(get_gzip_size "webpack-4-app/dist/main.bundle.js")
  baseui=$(get_gzip_size "webpack-4-app/dist/vendor-base-ui.bundle.js")
  vendor=$(get_gzip_size "webpack-4-app/dist/vendor.bundle.js")
  total=$((app + baseui + vendor))
  printf "│ %-15s │ %10.1f KB   │ %8.1f KB │ %8.1f KB │\n" \
    "webpack-4" "$(format_kb $baseui)" "$(format_kb $vendor)" "$(format_kb $total)"
fi

# esbuild gzipped
if [[ -d "esbuild-app/dist" ]]; then
  total=$(get_gzip_size "esbuild-app/dist/index.min.js")
  printf "│ %-15s │ %15s │ %11s │ %8.1f KB │\n" \
    "esbuild" "-" "-" "$(format_kb $total)"
fi

# parcel gzipped
if [[ -d "parcel-app/dist" ]]; then
  total=$(get_gzip_size "$(ls parcel-app/dist/parcel-app.*.js 2>/dev/null | head -1)")
  printf "│ %-15s │ %15s │ %11s │ %8.1f KB │\n" \
    "parcel" "-" "-" "$(format_kb $total)"
fi

echo "└─────────────────┴─────────────────┴─────────────┴─────────────┘"
echo ""

# Summary
echo -e "${BOLD}${GREEN}Summary:${NC}"
echo -e "  Base UI bundle: ~113-125 KB minified (~37-41 KB gzipped)"
echo -e "  Vendor (React): ~218-227 KB minified (~70-74 KB gzipped)"
echo ""
