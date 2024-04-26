import { convertTempToUnit } from "@/utils";

type HourlyWeatherType = {
  dt: number;
  temp: number;
  weather: {
    id: number;
    icon: string;
    name: string;
  }[];
}

export default function Hourly({ hourly, unit }: { hourly: HourlyWeatherType[], unit: string }) {
  return (

    <div className="flex gap-2 overflow-x-auto lg:w-[calc(100vw-496px)]">
      {hourly?.map((hourlyWeather, idx: number) => (
        <div key={idx} className="relative h-48 rounded-lg bg-white flex flex-col items-center justify-between py-6 min-w-[120px] max-w-[120px]">
          <span className="text-lg font-normal text-gray-700">{new Date(hourlyWeather.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' })}</span>
          <img alt="testjl" src={`https://openweathermap.org/img/wn/${hourlyWeather.weather[0].icon}@2x.png`} />

          <span className="text-base font-normal text-gray-700">
            {`${convertTempToUnit(hourlyWeather.temp, unit)}. ${unit === 'celcius' ? 'C' : 'F'}`}
          </span>
        </div>
      ))
      }
    </div>
  )
}

