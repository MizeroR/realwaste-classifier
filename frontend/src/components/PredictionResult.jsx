import { getWasteInfo } from "../utils/wasteInfo";

function PredictionResult({ prediction, imagePreview, onReset }) {
  if (!prediction) return null;

  const wasteInfo = getWasteInfo(prediction.predicted_class);
  const sortedPredictions = Object.entries(prediction.all_predictions).sort(
    ([, a], [, b]) => b - a
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Image Preview */}
      {imagePreview && (
        <div className="flex justify-center">
          <img
            src={imagePreview}
            alt="Uploaded waste"
            className="max-w-sm rounded-lg shadow-lg border-2 border-stone-300"
          />
        </div>
      )}

      {/* Main Result Card */}
      <div
        className="rounded-xl p-8 text-center shadow-lg border-2"
        style={{
          backgroundColor: wasteInfo.color + "15",
          borderColor: wasteInfo.color,
        }}
      >
        <div className="text-7xl mb-4">{wasteInfo.icon}</div>
        <h2 className="text-3xl font-bold text-stone-800 mb-2">
          {wasteInfo.name}
        </h2>
        <div className="inline-block px-4 py-2 rounded-full bg-white border-2 border-amber-900 mb-4">
          <span className="text-2xl font-bold text-amber-900">
            {prediction.confidence_percent.toFixed(1)}%
          </span>
          <span className="text-sm text-stone-600 ml-2">confident</span>
        </div>
        <p className="text-stone-700 mt-4 text-sm max-w-md mx-auto">
          💡 {wasteInfo.tips}
        </p>
      </div>

      {/* All Predictions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-stone-200">
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          All Predictions
        </h3>
        <div className="space-y-3">
          {sortedPredictions.map(([className, confidence]) => {
            const info = getWasteInfo(className);
            const percentage = (confidence * 100).toFixed(1);

            return (
              <div key={className} className="flex items-center gap-3">
                <span className="text-2xl w-8">{info.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-stone-700">
                      {info.name}
                    </span>
                    <span className="text-sm text-stone-600">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: info.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Processing Time */}
      <div className="text-center text-sm text-stone-500">
        Processed in {prediction.latency_ms.toFixed(0)}ms
      </div>

      {/* Try Another Button */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium shadow-md"
        >
          Analyze Another Image
        </button>
      </div>
    </div>
  );
}

export default PredictionResult;
