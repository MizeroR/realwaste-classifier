// API configuration
const API_URL = "https://realwaste-classifier-production.up.railway.app";

// Predict waste type from image
export const predictWaste = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
};

// Get API health status
export const getHealth = async () => {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
};
