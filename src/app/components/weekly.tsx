'use client';
import { convertTempToUnit } from "@/utils";
import { useAppState } from "../contexts/app.context";

type DailyWeatherType = {
  dt: number;
  temp: {
    min: number;
    max: number;
  }
  weather: {
    id: number;
    icon: string;
    name: string;
  }[];
}

export default function Daily({ daily }: { daily: DailyWeatherType[] }) {

  const { state } = useAppState();

  return (
    // flex flex-row gap-2
    <ul className=" relative overflow-x-auto overflow-y-hidden w-full whitespace-nowrap flex lg:w-[calc(100vw-496px)]">
      {daily?.map((dailyWeather, idx: number) => (
        // basis-1/6 shrink-0
        <li key={idx} className="mr-2 h-48 rounded-lg bg-white min-w-[120px] max-w-[120px]">
          <div className="flex flex-col items-center justify-between py-6 
                  ">
            <span className="text-lg font-normal text-gray-700">{new Date(dailyWeather.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' })}</span>
            <img alt="testjl" src={`https://openweathermap.org/img/wn/${dailyWeather.weather[0].icon}@2x.png`} />

            <div className="flex items-center space-x-2">
              <span className="text-base font-normal text-gray-700">
                {`${convertTempToUnit(dailyWeather.temp.max, state.unit)}`}
                <sup className="text-xs">o</sup>
              </span>
              <span className="text-base font-normal text-gray-400">
                {convertTempToUnit(dailyWeather.temp.max, state.unit)}
                <sup className="text-xs">o</sup>
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

