import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageUploader({ onImageSelect, isLoading }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-3 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragActive
              ? "border-amber-900 bg-amber-50"
              : "border-stone-400 hover:border-amber-800 hover:bg-stone-50"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl">🗑️</div>
          {isDragActive ? (
            <p className="text-lg text-amber-900 font-medium">
              Drop your image here...
            </p>
          ) : (
            <>
              <p className="text-lg text-stone-700 font-medium">
                Drag & drop a waste image here
              </p>
              <p className="text-sm text-stone-500">or</p>
              <button
                className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
                disabled={isLoading}
              >
                Browse Files
              </button>
              <p className="text-xs text-stone-400 mt-2">
                Supported formats: JPG, PNG, WEBP
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
