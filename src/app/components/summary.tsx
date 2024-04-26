type SummaryType = {
  uvi: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  humidity: number;
  pressure: number;
  visibility: number;
}

export default function Summary({ summary }: { summary: SummaryType }) {
  return (
    <div className="mt-9 ">
      <h6 className="mb-8 text-base font-semibold text-gray-900">{'Today\'s Highlights'}</h6>
      <ul className="flex flex-col sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 gap-6">
        <li className="bg-white rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-base font-light text-gray-500">UV Index</span>
            <span className="mt-5 block text-3xl font-medium text-gray-700">{summary.uvi}</span>
          </div>

        </li>
        <li className="bg-white rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-base font-light text-gray-500">Wind Status</span>
            <span className="mt-5 block text-3xl font-medium text-gray-700">{summary.wind_speed}
              <sub className="text-sm">km/s</sub>

            </span>
          </div>
        </li>

        <li className="bg-white rounded-lg p-6">
          <div className="flex flex-col">
            <span className="mb-5 text-base font-light text-gray-500">Sunrise & Sunset</span>

            <div className="space-y-2">
              <span className="flex items-center space-x-2">
                <span className="bg-yellow-400 border-2 border-yellow-500 text-white rounded-full h-9 w-9 block flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                </span>
                <span>
                  {new Date(summary.sunrise * 1000).toLocaleTimeString('en-us', { timeStyle: 'short' })}
                </span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="bg-yellow-400 border-2 border-yellow-500 text-white rounded-full h-9 w-9 block flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                </span>
                <span>
                  {new Date(summary.sunset * 1000).toLocaleTimeString('en-us', { timeStyle: 'short' })}
                </span>
              </span>
            </div>
          </div>
        </li>
        <li className="bg-white rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-base font-light text-gray-500">Humidity</span>
            <span className="mt-5 block text-3xl font-medium text-gray-700">{summary.humidity}<sub className="text-sm">%</sub></span>
          </div>
        </li>
        <li className="bg-white rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-base font-light text-gray-500">Pressure</span>
            <span className="mt-5 block text-3xl font-medium text-gray-700">{summary.pressure}<sub className="text-sm">hPa</sub></span>
          </div>
        </li>
        <li className="bg-white rounded-lg p-6">
          <div className="flex flex-col">
            <span className="text-base font-light text-gray-500">Visibility</span>
            <span className="mt-5 block text-3xl font-medium text-gray-700">{summary.visibility}<sub className="text-sm">km</sub></span>
          </div>
        </li>
      </ul>
    </div>
  )
}
