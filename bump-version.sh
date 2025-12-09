#!/bin/bash

# Simple script to bump the version number in index.html for cache-busting
# Usage: ./bump-version.sh [version]
# If no version is provided, it will auto-increment the patch version

if [ -z "$1" ]; then
  # Auto-increment patch version
  current_version=$(grep -oP 'v=\K[0-9]+\.[0-9]+\.[0-9]+' index.html | head -1)
  if [ -z "$current_version" ]; then
    new_version="1.0.1"
  else
    IFS='.' read -r major minor patch <<< "$current_version"
    patch=$((patch + 1))
    new_version="$major.$minor.$patch"
  fi
else
  new_version="$1"
fi

echo "Bumping version to: $new_version"

# Replace version in all three places (styles.css, content.js, script.js)
sed -i.bak "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+/v=$new_version/g" index.html

# Clean up backup file (macOS creates .bak files)
rm -f index.html.bak

echo "Version updated to $new_version in index.html"
echo "Don't forget to commit and push!"

