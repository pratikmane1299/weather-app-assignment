import { convertTempToUnit } from "@/utils";

type CurrentWeatherType = {
  dt: number;
  weather: {
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
  },
}

export default function CurrentWeather({ unit, currentWeather }: { unit: string; currentWeather: CurrentWeatherType }) {
  return (
    <div className="mt-13 flex flex-col items-center md:items-start">
      <div className="py-8">
        <img src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0]?.icon}@4x.png`} className="w-full h-44" />
        <span className="mb-8 block text-7xl font-light">{convertTempToUnit(currentWeather.main.temp, unit)}<sup>{`${unit === 'celcius' ? 'oC' : 'oF'}`}</sup></span>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-normal block">
            {new Date(currentWeather.dt * 1000).toLocaleDateString('en-us', { weekday: 'long' })}{','}

          </span>
          <span className="text-lg font-light block text-gray-500">
            {new Date(currentWeather.dt * 1000).toLocaleTimeString('en-us', { hour: '2-digit', minute: 'numeric' })}
          </span>
        </div>

      </div>

      <div className="border-t border-gray-100 w-full pt-7">
        <span className="text-base font-light block mb-7">
          {currentWeather?.weather?.[0]?.main}
        </span>
      </div>
    </div>
  )
}
