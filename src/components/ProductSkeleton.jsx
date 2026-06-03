export default function ProductSkeleton() {
  return (
    <div className="w-full max-w-[420px] mx-auto bg-white rounded-2xl p-6">
      <div className="h-10 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="w-56 h-56 bg-gray-200 rounded-xl animate-pulse mx-auto mb-6"></div>

      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
