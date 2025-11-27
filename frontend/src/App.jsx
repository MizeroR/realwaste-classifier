import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";
import LoadingSpinner from "./components/LoadingSpinner";
import { predictWaste } from "./services/api";
import "./App.css";

function App() {

  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50">
      {/* Header */}
      <header className="bg-amber-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">♻️</span>
            <h1 className="text-3xl font-bold">Waste Classifier AI</h1>
          </div>
          <p className="text-center text-amber-100 mt-2 text-sm">
            Upload an image to identify and learn how to dispose of waste
            properly
          </p>
        </div>
      </header>

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
