#!/bin/bash
set -e

echo "🔧 Starting build process..."

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Install Python dependencies
echo "📦 Installing Python packages..."
pip install -r requirements.txt

# Download model from Google Drive
echo "📥 Downloading model from Google Drive..."
mkdir -p models

# Use gdown for more reliable Google Drive downloads
pip install gdown
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
