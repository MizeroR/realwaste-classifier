from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import numpy as np
from PIL import Image
import io
import time
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from tensorflow import keras

app = Flask(__name__)
CORS(app)

# Configuration
MODEL_PATH = 'models/MobileNetV2_retrained_best.h5'
IMG_SIZE = (224, 224)

# Classes (adjust to your 7 or 9 classes)
CLASS_NAMES = [
    'cardboard', 'food organics', 'glass', 'metal', 
    'miscellaneous trash', 'paper', 'plastic', 
    'textile trash', 'vegetation'
]

# Load model at startup
print(f"Loading model from: {MODEL_PATH}")
model = keras.models.load_model(MODEL_PATH)
print("✅ Model loaded successfully!")

# Track metrics
START_TIME = time.time()
REQUEST_COUNT = 0
PREDICTION_TIMES = []

# ============================================
# HELPER FUNCTIONS
# ============================================

def preprocess_image(image_bytes, target_size=IMG_SIZE):
    """Preprocess image for prediction"""
    img = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize
    img = img.resize(target_size)
    
    # Convert to array and normalize
    img_array = np.array(img)
    img_array = img_array / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

# ============================================
# API ENDPOINTS
# ============================================

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Waste Classifier API',
        'version': '1.0',
        'endpoints': {
            '/health': 'GET - Health check and uptime',
            '/predict': 'POST - Make prediction (send image file)',
            '/stats': 'GET - API statistics',
            '/classes': 'GET - List all classes'
        }
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    uptime = time.time() - START_TIME
    
    avg_latency = np.mean(PREDICTION_TIMES) if PREDICTION_TIMES else 0
    
    return jsonify({
        'status': 'healthy',
        'uptime_seconds': round(uptime, 2),
        'uptime_hours': round(uptime / 3600, 2),
        'total_requests': REQUEST_COUNT,
        'average_prediction_time_ms': round(avg_latency, 2),
        'timestamp': datetime.now().isoformat(),
        'model_loaded': model is not None
    })

@app.route('/classes', methods=['GET'])
def get_classes():
    """Get list of classes"""
    return jsonify({
        'classes': CLASS_NAMES,
        'num_classes': len(CLASS_NAMES)
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Prediction endpoint"""
    global REQUEST_COUNT, PREDICTION_TIMES
    REQUEST_COUNT += 1
    
    start_time = time.time()
    
    try:
        # Check if image file is in request
        if 'image' not in request.files:
            return jsonify({
                'error': 'No image file provided',
                'message': 'Please send an image file with key "image"'
            }), 400
        
        file = request.files['image']
        
        # Check if file is empty
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        # Read image bytes
        image_bytes = file.read()
        
        # Preprocess
        img_array = preprocess_image(image_bytes)
        
        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        
        # Get top prediction
        predicted_idx = int(np.argmax(predictions[0]))
        confidence = float(predictions[0][predicted_idx])
        predicted_class = CLASS_NAMES[predicted_idx]
        
        # Get all class probabilities
        all_predictions = {
            CLASS_NAMES[i]: float(predictions[0][i])
            for i in range(len(CLASS_NAMES))
        }
        
        # Sort predictions by confidence
        sorted_predictions = dict(sorted(
            all_predictions.items(), 
            key=lambda x: x[1], 
            reverse=True
        ))
        
        # Calculate latency
        latency = (time.time() - start_time) * 1000
        PREDICTION_TIMES.append(latency)
        
        # Keep only last 100 predictions for average
        if len(PREDICTION_TIMES) > 100:
            PREDICTION_TIMES.pop(0)
        
        return jsonify({
            'success': True,
            'predicted_class': predicted_class,
            'confidence': round(confidence, 4),
            'confidence_percent': round(confidence * 100, 2),
            'all_predictions': {k: round(v, 4) for k, v in sorted_predictions.items()},
            'latency_ms': round(latency, 2),
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Error processing image'
        }), 500

@app.route('/stats', methods=['GET'])
def stats():
    """Get API statistics"""
    uptime = time.time() - START_TIME
    
    avg_latency = np.mean(PREDICTION_TIMES) if PREDICTION_TIMES else 0
    min_latency = np.min(PREDICTION_TIMES) if PREDICTION_TIMES else 0
    max_latency = np.max(PREDICTION_TIMES) if PREDICTION_TIMES else 0
    
    return jsonify({
        'total_requests': REQUEST_COUNT,
        'uptime_hours': round(uptime / 3600, 2),
        'predictions': {
            'count': len(PREDICTION_TIMES),
            'average_latency_ms': round(avg_latency, 2),
            'min_latency_ms': round(min_latency, 2),
            'max_latency_ms': round(max_latency, 2)
        },
        'timestamp': datetime.now().isoformat()
    })

# ============================================
# RUN APP
# ============================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 Starting Waste Classifier API")
    print("="*60)
    print(f"Model: {MODEL_PATH}")
    print(f"Classes: {len(CLASS_NAMES)}")
    print(f"Server: http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)