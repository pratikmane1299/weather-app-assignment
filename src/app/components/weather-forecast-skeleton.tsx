export default function WeatherForecastSkeleton() {
  return (
    <div className="flex flex-col mt-14 animate-pulse">
      <div className="grid grid-cols-8 gap-2">
        {new Array(8).fill('').map((_, idx) => (
          <div key={idx} className="py-6 h-48 bg-white rounded-md flex flex-col items-center justify-between">
            <span className="h-[20px] w-[50px] bg-gray-300 rounded-md"></span>
            <span className="h-[50px] w-[50px] bg-gray-300 rounded-full"></span>
            <span className="h-[20px] w-[80px] bg-gray-300 rounded-md"></span>
          </div>
        ))}
      </div>


      <div className="mt-9">
        <h6 className="mb-8 text-base font-semibold text-gray-900">{'Today\'s Highlights'}</h6>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {new Array(6).fill('').map((_, idx) => (
          <div key={idx} className="h-[150px] bg-white rounded-lg p-6">
            <span className="block h-[20px] w-[100px] bg-gray-300 rounded-md"></span>
            <span className="mt-12 block h-[20px] w-[200px] bg-gray-300 rounded-md"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
