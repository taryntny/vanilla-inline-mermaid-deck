#!/bin/bash

# Simple script to bump the version number in index.html for cache-busting
# Usage: ./bump-version.sh [version]
# If no version is provided, it will auto-increment the patch version

if [ -z "$1" ]; then
  # Auto-increment patch version
  # Use sed to extract version (works on both macOS and Linux)
  current_version=$(grep -oE 'v=[0-9]+\.[0-9]+\.[0-9]+' index.html | head -1 | sed 's/v=//')
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

# Replace version in all asset URLs (styles.css, content.js, script.js)
# Use a more portable sed pattern that works on both macOS (BSD sed) and Linux (GNU sed)
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS (BSD sed) - requires backup extension and different regex
  sed -i '' "s/v=[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*/v=$new_version/g" index.html
  # Also update the version comment and meta tag
  sed -i '' "s/<!-- Version: [0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]* -->/<!-- Version: $new_version -->/g" index.html
  sed -i '' "s/<meta name=\"version\" content=\"[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\">/<meta name=\"version\" content=\"$new_version\">/g" index.html
else
  # Linux (GNU sed)
  sed -i "s/v=[0-9]\+\.[0-9]\+\.[0-9]\+/v=$new_version/g" index.html
  sed -i "s/<!-- Version: [0-9]\+\.[0-9]\+\.[0-9]\+ -->/<!-- Version: $new_version -->/g" index.html
  sed -i "s/<meta name=\"version\" content=\"[0-9]\+\.[0-9]\+\.[0-9]\+\">/<meta name=\"version\" content=\"$new_version\">/g" index.html
fi

echo "Version updated to $new_version in index.html"
echo "Don't forget to commit and push!"

