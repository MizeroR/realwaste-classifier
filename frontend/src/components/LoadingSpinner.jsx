function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-stone-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-900 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-stone-600 font-medium">Analyzing waste...</p>
    </div>
  );
}

export default LoadingSpinner;
