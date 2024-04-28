export default function CurrentWeatherSkeleton() {
  return (
    <div className="mt-13 flex flex-col items-center md:items-start animate-pulse">
      <div className="py-8">
        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[40px]"></span>
        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[60px]"></span>
        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[90px]"></span>


        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[40px]"></span>
        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[60px]"></span>
        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[90px]"></span>


        <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[40px]"></span>

        <div className="flex items-center space-x-2">
          <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[40px]"></span>
          <span className="mb-5 bg-gray-300 rounded-md block h-[20px] w-[40px]"></span>
        </div>

      </div>

      <div className="mb-5 border-t border-gray-100 w-full pt-7">
        <span className="block h-[20px] w-[50px] bg-gray-300 rounded-md">
        </span>
      </div>
    </div>
  );
}
