# Waste Classifier AI - MLOps Project

A comprehensive machine learning solution for automated waste classification using MobileNetV2, deployed with full MLOps pipeline including API, frontend UI, and load testing.

---

## Video Demo

[Watch Full Demo on YouTube](https://youtu.be/9mOORbXhP3c)

---

## Live URLs

- **GitHub Repository:** [https://github.com/MizeroR/realwaste-classifier](https://github.com/MizeroR/realwaste-classifier)
- **API Endpoint:** [https://realwaste-classifier-production.up.railway.app](https://realwaste-classifier-production.up.railway.app)

---

## Project Description

### Overview

This project implements an end-to-end MLOps solution for **automated waste classification** using deep learning. The system classifies waste images into **9 categories** to help improve waste sorting and recycling processes.

### Waste Categories (9 Classes)

1. 📦 **Cardboard** - Cardboard boxes, packaging
2. 🥬 **Food Organics** - Food waste, organic matter
3. 🫙 **Glass** - Glass bottles, jars
4. 🥫 **Metal** - Aluminum cans, metal containers
5. 🗑️ **Miscellaneous Trash** - Mixed non-recyclable waste
6. 📄 **Paper** - Paper documents, newspaper
7. ♻️ **Plastic** - Plastic bottles, containers
8. 👕 **Textile Trash** - Clothing, fabric waste
9. 🌿 **Vegetation** - Yard waste, plant material

### Key Features

- **Real-time Classification** - Upload waste images and get instant predictions
- **REST API** - Production-ready Flask API deployed on Railway
- **Web Interface** - React-based UI with drag & drop functionality
- **Model Retraining** - API endpoint to retrain model with new data
- **Load Testing** - Comprehensive performance testing with Locust
- **Cloud Deployment** - Fully deployed on Railway with CI/CD
- **Monitoring** - Health checks, uptime tracking, and metrics

### Technology Stack

- **Model:** MobileNetV2 with transfer learning
- **Backend:** Flask + TensorFlow
- **Frontend:** React + Vite + Tailwind CSS
- **Deployment:** Railway (Cloud Platform)
- **Load Testing:** Locust
- **ML Framework:** TensorFlow 2.16.1

---

## Project Structure

```
realwaste-classifier/
│
├── README.md                              # Project documentation
├── LOCUST_TESTING_GUIDE.md               # Load testing guide
├── locustfile.py                         # Locust test scenarios
│
├── notebook/
│   ├── Summative_assignment_MLOP.ipynb   # Complete ML workflow
│   └── performance/
│       └── evaluation_results.json       # Model metrics
│
├── data/
│   ├── train/                            # Training dataset
│   │   └── _annotations.coco.json
│   ├── test/                             # Test dataset
│   │   └── _annotations.coco.json
│   └── valid/                            # Validation dataset
│       └── _annotations.coco.json
│
├── models/                               # Trained model files
│   └── MobileNetV2_best_model.h5    # Primary model (.h5 format)
    └── MobileNetV2_retrained_best.h5
│
├── api/                                  # Backend API
│   ├── app.py                           # Flask application
│   ├── requirements.txt                 # Python dependencies
│   ├── build.sh                         # Build script
│   ├── Procfile                         # Railway process file
│   └── railway.json                     # Railway configuration
│
├── frontend/                             # React UI
│   ├── src/
│   │   ├── components/                  # React components
│   │   ├── services/                    # API client
│   │   └── utils/                       # Helper functions
│   ├── package.json
│   └── vite.config.js
│
└── reports/                              # Load testing reports
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Python:** 3.12 or higher
- **Node.js:** 18 or higher
- **Git:** Latest version
- **pip:** Latest version

### Step 1: Clone the Repository

```bash
git clone https://github.com/MizeroR/realwaste-classifier.git
cd realwaste-classifier
```

### Step 2: Download the Model

The trained model files are hosted on Google Drive due to their large size:

**📥 Download Model File:**

- **File:** `MobileNetV2_retrained_best.h5`
- **Google Drive Link:** [Download Model](https://drive.google.com/file/d/16H4qASr6bNMnm34PVy85KfanxySBk88s/view?usp=sharing)
- **Direct Download:** [Click here](https://drive.google.com/uc?export=download&id=16H4qASr6bNMnm34PVy85KfanxySBk88s)
- **Size:** 23.2MB
- **Format:** HDF5 (.h5)

**Download Instructions:**

1. Click the "Download Model" link above
2. Click "Download" on the Google Drive page
3. Save the file to your computer
4. Place it in the `models/` directory

```bash
# After downloading, place the file:
# models/MobileNetV2_retrained_best.h5
```

_Note: The Railway deployment automatically downloads the model during build process_

### Step 3: Backend Setup (API)

#### 3.1 Install Dependencies

```bash
cd api
pip install -r requirements.txt
```

**Required packages:**

- flask==3.0.0
- flask-cors==4.0.1
- tensorflow==2.16.1
- numpy==1.26.4
- pillow==10.4.0
- gunicorn==21.2.0

#### 3.2 Run API Locally

```bash
# From the project root
python api/app.py
```

API will start at: **http://localhost:5000**

#### 3.3 Test API Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Get classes
curl http://localhost:5000/classes

# Make prediction (replace with actual image path)
curl -X POST -F "image=@path/to/waste-image.jpg" http://localhost:5000/predict
```

### Step 4: Frontend Setup (UI)

#### 4.1 Install Dependencies

```bash
cd frontend
npm install
```

#### 4.2 Configure API URL

For local development, update `frontend/src/services/api.js`:

```javascript
const API_URL = "http://localhost:5000"; // Local API
// const API_URL = "https://realwaste-classifier-production.up.railway.app";  // Production
```

#### 4.3 Run Frontend

```bash
npm run dev
```

Frontend will start at: **http://localhost:5173**

### Step 5: Test the Application

1. Open browser to `http://localhost:5173`
2. Click or drag & drop a waste image
3. View prediction results with confidence scores
4. Test with different waste types

---

## 📈 Results from Flood Request Simulation (Locust)

### Load Testing Configuration

**Tool:** Locust  
**Target:** https://realwaste-classifier-production.up.railway.app  
**Scenarios:** Light Load, Medium Load, Heavy Load

### Test Results Summary

#### Test 1: Light Load (10 Users)

- **Users:** 10 concurrent
- **Spawn Rate:** 2 users/sec
- **Duration:** 3 minutes
- **Results:**
  - Total Requests: ~1,800
  - Requests/sec: ~10 RPS
  - Average Response Time: 250ms
  - 95th Percentile: 450ms
  - Failure Rate: 0%
  - **Status:** ✅ Excellent

#### Test 2: Medium Load (50 Users)

- **Users:** 50 concurrent
- **Spawn Rate:** 5 users/sec
- **Duration:** 3 minutes
- **Results:**
  - Total Requests: ~7,500
  - Requests/sec: ~42 RPS
  - Average Response Time: 580ms
  - 95th Percentile: 950ms
  - Failure Rate: 1.2%
  - **Status:** ✅ Good

#### Test 3: Heavy Load (100 Users)

- **Users:** 100 concurrent
- **Spawn Rate:** 10 users/sec
- **Duration:** 3 minutes
- **Results:**
  - Total Requests: ~12,000
  - Requests/sec: ~67 RPS
  - Average Response Time: 1,250ms
  - 95th Percentile: 2,100ms
  - Failure Rate: 5.8%
  - **Status:** ⚠️ Acceptable with degradation

### Endpoint Performance Breakdown

| Endpoint      | Avg Response (ms) | 95th Percentile (ms) | Success Rate |
| ------------- | ----------------- | -------------------- | ------------ |
| GET /health   | 85                | 195                  | 100%         |
| GET /classes  | 92                | 210                  | 100%         |
| POST /predict | 265               | 520                  | 98%          |
| POST /retrain | 180               | 380                  | 97%          |
| GET /stats    | 88                | 205                  | 100%         |

### Key Findings

**Strengths:**

- Handles 10-50 concurrent users smoothly
- Sub-second response times for most requests
- Zero failures under normal load
- Consistent performance for GET endpoints

**Limitations:**

- Performance degrades at 100+ concurrent users
- Railway free tier has resource constraints
- Image prediction is the slowest endpoint (expected)

**Detailed Reports:** See `reports/` folder for HTML reports with charts

### Running Load Tests

```bash
# Install Locust
pip install locust

# Run test with Web UI
locust -f locustfile.py --host=https://realwaste-classifier-production.up.railway.app

# Open http://localhost:8089 and configure users

# Or run headless test
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 50 \
  --spawn-rate 5 \
  --run-time 180s \
  --headless \
  --html reports/load_test_report.html
```

---

## Notebook

**File:** `notebook/Summative_assignment_MLOP.ipynb`

### Contents

The Jupyter notebook contains the complete machine learning workflow:

#### 1. Data Preprocessing Steps

- Dataset loading from RoboFlow
- Image augmentation techniques
- Train/validation/test split
- Data normalization
- Class distribution analysis

#### 2. Model Training

- MobileNetV2 architecture setup
- Transfer learning from ImageNet
- Fine-tuning strategy
- Training hyperparameters:
  - Optimizer: Adam
  - Learning Rate: 0.001 (initial), 0.0001 (fine-tuning)
  - Batch Size: 32
  - Epochs: 20
- Training/validation curves
- Model checkpointing

#### 3. Model Evaluation

- Test set predictions
- Confusion matrix
- Classification report
- Per-class accuracy
- Error analysis

#### 4. Model Test / Prediction Functions

- Image preprocessing pipeline
- Batch prediction utilities
- Confidence score calculation
- Results visualization
- Sample predictions on test images

### Running the Notebook

```bash
# Install Jupyter
pip install jupyter notebook

# Start Jupyter
jupyter notebook notebook/Summative_assignment_MLOP.ipynb
```

### Key Results from Notebook


- **Overall Accuracy:** 89%
- **Active classes:** 7/9
- **Classes evaluated:** food organics, glass, metal, paper, plastic, textile trash, vegetation
- **Missing classes:** None
- **Total test samples**: 291

---

## The Model File

### Model Information

- **File:** `MobileNetV2_retrained_best.h5`
- **Format:** HDF5 (.h5) - TensorFlow/Keras format
- **Size:** 22.2 MB
- **Framework:** TensorFlow 2.16.1
- **Input Shape:** (224, 224, 3)
- **Output:** 9 classes

### Download Links

Since the model file is too large for GitHub, download from:

**Primary Model:**

- **📥 Google Drive:** [Download MobileNetV2_retrained_best.h5](https://drive.google.com/file/d/16H4qASr6bNMnm34PVy85KfanxySBk88s/view?usp=sharing)
- **🔗 Direct Download:** [Click here](https://drive.google.com/uc?export=download&id=16H4qASr6bNMnm34PVy85KfanxySBk88s)
- **File:** MobileNetV2_retrained_best.h5
- **Size:** 22.2 MB
- **Format:** HDF5 (.h5)

**Alternative Models** (Original Model):

- **📥 MobileNetV2_best_model.h5** - Backup/Alternative version
- [Google Drive Link](https://drive.google.com/file/d/12uYdmpnhmuLtQ4ZCE2Ipqz3l-eya_cy4/view?usp=sharing)
- [Direct Download](https://drive.google.com/uc?export=download&id=12uYdmpnhmuLtQ4ZCE2Ipqz3l-eya_cy4)

### Model Architecture

```
Input (224x224x3)
    ↓
MobileNetV2 Base (pre-trained)
    ↓
GlobalAveragePooling2D
    ↓
Dense(128, ReLU)
    ↓
Dropout(0.5)
    ↓
Dense(9, Softmax)
    ↓
Output (9 classes)
```

### Loading the Model

```python
from tensorflow import keras

# Load model
model = keras.models.load_model('models/MobileNetV2_retrained_best.h5')

# Make prediction
predictions = model.predict(preprocessed_image)
```

---

## API Documentation

### Base URL

```
Production: https://realwaste-classifier-production.up.railway.app
Local:      http://localhost:5000
```

### Endpoints

#### 1. GET `/` - API Information

Returns available endpoints

**Response:**

```json
{
  "message": "Waste Classifier API",
  "version": "1.0",
  "endpoints": {
    "/health": "GET - Health check and uptime",
    "/predict": "POST - Make prediction (send image file)",
    "/stats": "GET - API statistics",
    "/classes": "GET - List all classes",
    "/retrain": "POST - Retrain model with new images"
  }
}
```

#### 2. GET `/health` - Health Check

Returns API health status and uptime

**Response:**

```json
{
  "status": "healthy",
  "uptime_seconds": 86400.5,
  "uptime_hours": 24.0,
  "total_requests": 1523,
  "average_prediction_time_ms": 245.3,
  "timestamp": "2025-11-27T10:30:00",
  "model_loaded": true
}
```

#### 3. GET `/classes` - Get Classes

Returns list of all waste categories

**Response:**

```json
{
  "classes": [
    "cardboard",
    "food organics",
    "glass",
    "metal",
    "miscellaneous trash",
    "paper",
    "plastic",
    "textile trash",
    "vegetation"
  ],
  "num_classes": 9
}
```

#### 4. POST `/predict` - Make Prediction

Classify a waste image

**Request:**

```bash
curl -X POST \
  -F "image=@waste_image.jpg" \
  https://realwaste-classifier-production.up.railway.app/predict
```

**Response:**

```json
{
  "success": true,
  "predicted_class": "plastic",
  "confidence": 0.9534,
  "confidence_percent": 95.34,
  "all_predictions": {
    "plastic": 0.9534,
    "metal": 0.0234,
    "glass": 0.0156,
    ...
  },
  "latency_ms": 248.5,
  "timestamp": "2025-11-27T10:30:00"
}
```

#### 5. GET `/stats` - API Statistics

Returns usage statistics

**Response:**

```json
{
  "total_requests": 1523,
  "uptime_hours": 24.0,
  "predictions": {
    "count": 1200,
    "average_latency_ms": 245.3,
    "min_latency_ms": 125.0,
    "max_latency_ms": 890.0
  },
  "timestamp": "2025-11-27T10:30:00"
}
```

#### 6. POST `/retrain` - Retrain Model

Upload images to retrain the model (demo endpoint)

**Request:**

```bash
curl -X POST \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  https://realwaste-classifier-production.up.railway.app/retrain
```

**Response:**

```json
{
  "success": true,
  "message": "Retraining endpoint working!",
  "images_received": 2,
  "note": "This is a demo endpoint. Full retraining would happen here."
}
```

---

## Deployment

### Railway Deployment

The API is automatically deployed to Railway from GitHub:

#### Configuration

1. **Build Command:** `bash build.sh`
2. **Start Command:** `gunicorn -w 1 -b 0.0.0.0:$PORT app:app`
3. **Root Directory:** `api/`
4. **Runtime:** Python 3.12

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@MizeroR](https://github.com/MizeroR)
- Project: [realwaste-classifier](https://github.com/MizeroR/realwaste-classifier)

---

## 🙏 Acknowledgments

- ALU MLOps Course
- RoboFlow for dataset
- TensorFlow team for MobileNetV2
- Railway for cloud hosting

---

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for sustainable waste management and MLOps best practices**
