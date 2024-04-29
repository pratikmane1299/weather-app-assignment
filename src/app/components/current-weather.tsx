import { getWeatherInfo } from "@/api";
import { convertTempToUnit } from "@/utils";
import { use } from "react";
import WeatherInfo from "./weather-info";

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

export default function CurrentWeather({ lat, lon }: { lat: number; lon: number; }) {
  const currentWeather = use(getWeatherInfo({ lat, lon }));

  return (
    <WeatherInfo currentWeather={currentWeather} />
  )
}
