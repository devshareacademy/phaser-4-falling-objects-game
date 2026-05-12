#!/bin/bash

# Exit on error
set -e

# Define paths
ASSETS_DIR="assets/js"
TYPES_DIR="src/types"
README="README.md"

# Function to list versions
list_versions() {
    if ! command -v npm &> /dev/null; then
        echo "Error: 'npm' is not installed. Unable to fetch versions."
        return 1
    fi
    echo "Fetching available Phaser versions from npm..."
    npm view phaser versions --json | grep -oE '[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9\.]+)?' | tail -n 20
}

# Check for flags
if [[ "$1" == "--list" ]]; then
    list_versions || exit 1
    exit 0
fi

# Check for version argument
if [[ -z "$1" ]]; then
    echo "Usage: $0 <version> or $0 --list"
    echo "Example: $0 4.2.0"
    exit 1
fi

VERSION=$1
V_TAG="v$VERSION"

echo "Updating Phaser to version $VERSION..."

# Download phaser.js
echo "Downloading phaser.js..."
curl --connect-timeout 10 --max-time 30 -fSL "https://cdn.jsdelivr.net/npm/phaser@$VERSION/dist/phaser.js" -o "$ASSETS_DIR/phaser.js" || { echo "Error: Failed to download phaser.js. The version might not exist or the CDN is down."; exit 1; }

# Download phaser.min.js
echo "Downloading phaser.min.js..."
curl --connect-timeout 10 --max-time 30 -fSL "https://cdn.jsdelivr.net/npm/phaser@$VERSION/dist/phaser.min.js" -o "$ASSETS_DIR/phaser.min.js" || { echo "Error: Failed to download phaser.min.js."; exit 1; }

# Download phaser.d.ts
echo "Downloading phaser.d.ts..."
curl --connect-timeout 10 --max-time 30 -fSL "https://raw.githubusercontent.com/phaserjs/phaser/refs/tags/$V_TAG/types/phaser.d.ts" -o "$TYPES_DIR/phaser.d.ts" || { echo "Error: Failed to download phaser.d.ts. Ensure the tag $V_TAG exists on GitHub."; exit 1; }

# Update README.md
echo "Updating README.md..."
# Use a different delimiter for sed because of potential special characters (though unlikely in version)
# This looks for "**Phaser Version:** `current_version`" and replaces it
sed -i.bak -E "s/(\*\*Phaser Version:\*\* \`)[0-9]+\.[0-9]+\.[0-9]+(\`)/\1$VERSION\2/" "$README" && rm "${README}.bak"

echo "Successfully updated Phaser to version $VERSION!"
