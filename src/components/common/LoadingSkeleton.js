import { memo } from 'react';

const LoadingSkeleton = memo(function LoadingSkeleton({ 
  mode = "light", 
  count = 6, 
  type = "card" 
}) {
  const skeletonItems = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletonItems.map((i) => (
          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden border ${
              mode === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className={`rounded-2xl overflow-hidden border ${
        mode === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}>
        <div className="p-6">
          <div className="space-y-4">
            {skeletonItems.map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/8 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
});

export default LoadingSkeleton;
