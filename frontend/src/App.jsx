import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";
import LoadingSpinner from "./components/LoadingSpinner";
import { predictWaste } from "./services/api";
import "./App.css";

function App() {
  const [showRetrain, setShowRetrain] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [retrainMessage, setRetrainMessage] = useState(null);

  const handleImageSelect = async (file) => {
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Make prediction
    setIsLoading(true);
    try {
      const result = await predictWaste(file);
      setPrediction(result);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setPrediction(null);
    setError(null);
  };

  const handleRetrainUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setIsLoading(true);
    setRetrainMessage(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        "https://realwaste-classifier-production.up.railway.app/retrain",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setRetrainMessage(
          `✅ Success! Uploaded ${data.images_received} images.`
        );
      } else {
        setRetrainMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setRetrainMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setShowRetrain(false);
        setRetrainMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50">
      {/* Header */}
      <header className="bg-amber-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 justify-center">
              <span className="text-4xl">♻️</span>
              <h1 className="text-3xl font-bold">Waste Classifier AI</h1>
            </div>
            <button
              onClick={() => setShowRetrain(!showRetrain)}
              className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg font-semibold transition-all"
            >
              🔄 Retrain
            </button>
          </div>
          <p className="text-center text-amber-100 mt-2 text-sm">
            Upload an image to identify and learn how to dispose of waste
            properly
          </p>
        </div>
      </header>

      {/* Retrain Modal */}
      {showRetrain && (
        <div className="bg-amber-100 border-b-4 border-amber-900 py-6">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">
              Upload Images for Retraining
            </h2>

            {retrainMessage && (
              <div
                className={`p-4 rounded-lg mb-4 text-center ${
                  retrainMessage.includes("✅")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {retrainMessage}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleRetrainUpload}
                disabled={isLoading}
                className="w-full p-3 border-2 border-amber-300 rounded-lg cursor-pointer"
              />
              <p className="text-sm text-stone-600 mt-2 text-center">
                Select multiple images to upload for model retraining
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-800 text-center">
            {error}
          </div>
        )}

        {!prediction && !isLoading && (
          <ImageUploader
            onImageSelect={handleImageSelect}
            isLoading={isLoading}
          />
        )}

        {isLoading && <LoadingSpinner />}

        {prediction && !isLoading && (
          <PredictionResult
            prediction={prediction}
            imagePreview={imagePreview}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            Powered by MobileNetV2 • Helping reduce waste one image at a time
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
