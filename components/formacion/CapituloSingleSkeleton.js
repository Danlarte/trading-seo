import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CapituloSingleSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton height={40} width={200} className="mb-8" />

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <Skeleton height={400} className="mb-6" />
              <Skeleton height={100} className="mt-6" />
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Skeleton height={40} className="mb-4" />
            <div className="h-[400px] overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="p-4">
                    <Skeleton height={20} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Skeleton height={150} className="mt-8" />
    </div>
  );
};

export default CapituloSingleSkeleton;
