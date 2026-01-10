#!/bin/bash

# Exit on error
set -e

# Configuration
CV_PROJECT_DIR="$HOME/developer/personal/job-search/CV"
PORTFOLIO_DIR="$HOME/developer/personal/portfolio"
DEST_DIR="$PORTFOLIO_DIR/public/cv"

echo "🚀 Starting CV Sync..."

# 1. Build CVs
echo "📦 Building CVs in $CV_PROJECT_DIR..."
cd "$CV_PROJECT_DIR"
make clean
make all

# 2. Ensure destination exists
mkdir -p "$DEST_DIR"

# 3. Copy and Rename Files
echo "📂 Copying files to $DEST_DIR..."

# English (Source was output/en/Bettahar-Samir-Resume.pdf)
if [ -f "$CV_PROJECT_DIR/output/en/Bettahar-Samir-Resume.pdf" ]; then
    cp "$CV_PROJECT_DIR/output/en/Bettahar-Samir-Resume.pdf" "$DEST_DIR/samir-bettahar-cv-en.pdf"
    echo "✅ Copied English CV"
else
    echo "⚠️  English CV not found at $CV_PROJECT_DIR/output/en/Bettahar-Samir-Resume.pdf"
fi

# French (Source was output/fr/Bettahar-Samir-CV.pdf)
if [ -f "$CV_PROJECT_DIR/output/fr/Bettahar-Samir-CV.pdf" ]; then
    cp "$CV_PROJECT_DIR/output/fr/Bettahar-Samir-CV.pdf" "$DEST_DIR/samir-bettahar-cv-fr.pdf"
    echo "✅ Copied French CV"
else
    echo "⚠️  French CV not found at $CV_PROJECT_DIR/output/fr/Bettahar-Samir-CV.pdf"
fi

# Arabic (Source was output/ar/Bettahar-Samir-Ar-CV.pdf)
if [ -f "$CV_PROJECT_DIR/output/ar/Bettahar-Samir-Ar-CV.pdf" ]; then
    cp "$CV_PROJECT_DIR/output/ar/Bettahar-Samir-Ar-CV.pdf" "$DEST_DIR/samir-bettahar-cv-ar.pdf"
    echo "✅ Copied Arabic CV"
else
    echo "⚠️  Arabic CV not found at $CV_PROJECT_DIR/output/ar/Bettahar-Samir-Ar-CV.pdf"
fi

echo "✨ CV Sync Complete!"
