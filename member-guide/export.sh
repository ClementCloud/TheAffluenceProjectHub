#!/usr/bin/env bash
# Renders tapAppCarousel.html to slides/NN.png (1080 x 1350, one per slide) and your-climb-starts-here.pdf.
# Needs Google Chrome. Run from anywhere: member-guide/export.sh
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
FLAGS=(--headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --virtual-time-budget=3000)
COUNT=$(grep -c 'class="frame"' tapAppCarousel.html)

mkdir -p slides
rm -f slides/*.png
for i in $(seq 1 "$COUNT"); do
  "$CHROME" "${FLAGS[@]}" --window-size=1080,1350 --screenshot="$PWD/slides/$(printf %02d "$i").png" "file://$PWD/tapAppCarousel.html?slide=$i" >/dev/null 2>&1
done
"$CHROME" "${FLAGS[@]}" --no-pdf-header-footer --print-to-pdf="$PWD/your-climb-starts-here.pdf" "file://$PWD/tapAppCarousel.html" >/dev/null 2>&1
echo "Exported $COUNT slides and your-climb-starts-here.pdf"
