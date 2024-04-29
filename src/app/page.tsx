import { Suspense, use } from "react";
import { Poppins } from "next/font/google";

import { getCityLatLong, getWeatherOneCall } from "@/api";
import { AppContextProvider, DurationType, UnitType } from "./contexts/app.context";

import DurationTabs from "./components/tabs";
import UnitSwitcher from "./components/unit-switcher";
import Searchbox from "./components/searchbox";
import Summary from "./components/summary";
import CityImage from "./components/city-image";
import CurrentWeather from "./components/current-weather";
import CurrentWeatherSkeleton from "./components/weather-forecast-skeleton";
import CitySkeleton from "./components/city-skeleton";
import WeatherForecastSkeleton from "./components/weather-forecast-skeleton";
import TabsContent from "./components/tabs-content";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined; } }) {
  const duration = (searchParams.duration ? searchParams.duration : 'week') as DurationType;
  const unit = (searchParams.unit ? searchParams.unit : 'celcius') as UnitType;
  const city = searchParams.city ? searchParams.city : 'mumbai';

  let lat = searchParams.lat ? +searchParams.lat : 0;
  let lon = searchParams.lon ? +searchParams.lon : 0;

  const geoData = await getCityLatLong(city);
  lat = geoData.lat;
  lon = geoData.lon;

  return (
    <AppContextProvider initialState={{ duration, unit }}>
      <div style={poppins.style} className="max-w-full flex flex-col flex-1 h-full">
        <div className="w-full h-full lg:grid lg:grid-cols-[400px_1fr]">
          <div className="bg-white w-full h-full border-r border-gray-200 p-12">
            <div className="flex flex-col justify-between  ">
              <Searchbox />

              <Suspense fallback={<CurrentWeatherSkeleton />}>
                <CurrentWeather lat={lat} lon={lon} />
              </Suspense>

              <Suspense fallback={<CitySkeleton />}>
                <CityImage city={city} />
              </Suspense>
            </div>
          </div>
          <div className="bg-gray-100  w-full p-12">
            <div className="flex justify-between items-center">
              <DurationTabs />
              <div className="flex justify-between items-center space-x-5">
                <UnitSwitcher />
              </div>
            </div>

            <Suspense fallback={<WeatherForecastSkeleton />}>
              <WeatherForecast lat={lat} lon={lon} />
            </Suspense>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
}

function WeatherForecast({ lat, lon }: { lat: number; lon: number }) {
  const onecallData = use(getWeatherOneCall({ lat, lon }));

  return (
    <>
      <TabsContent hourly={onecallData?.hourly} daily={onecallData?.daily} />

      <Summary summary={{
        uvi: onecallData?.current.uvi,
        wind_speed: onecallData?.current.wind_speed,
        sunrise: onecallData.current.sunrise,
        sunset: onecallData.current.sunset,
        humidity: onecallData.current.humidity,
        pressure: onecallData.current.pressure,
        visibility: onecallData.current.visibility,
      }} />
    </>
  )
}

