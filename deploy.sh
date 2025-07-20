#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Export static files
echo "Exporting static files..."
npx next export

# Add .nojekyll file to bypass Jekyll processing
touch out/.nojekyll

echo "Build complete! The static files are in the 'out' directory."
echo "To deploy to GitHub Pages, commit and push the 'out' directory to the gh-pages branch."