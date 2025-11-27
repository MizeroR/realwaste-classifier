#!/bin/bash
set -e

echo "🔧 Starting build process..."

# Download model from Google Drive
echo "📥 Downloading model from Google Drive..."
mkdir -p models

# Install gdown if not already installed
pip install gdown

# Download the model
gdown --id 16H4qASr6bNMnm34PVy85KfanxySBk88s -O models/MobileNetV2_retrained_best.h5

# Verify model was downloaded
if [ -f "models/MobileNetV2_retrained_best.h5" ]; then
    echo "✅ Model downloaded successfully!"
    ls -lh models/MobileNetV2_retrained_best.h5
else
    echo "❌ Model download failed!"
    exit 1
fi

echo "✅ Build completed successfully!"
