import { Suspense, use } from "react";
import { Poppins } from "next/font/google";

import { getCityImageFromUnsplash, getCityLatLong, getWeatherInfo, getWeatherOneCall } from "@/api";

import DurationTabs from "./components/tabs";
import UnitSwitcher from "./components/unit-switcher";
import Searchbox from "./components/searchbox";
import Daily from "./components/weekly";
import Hourly from "./components/hourly";
import Summary from "./components/summary";
import CityImage from "./components/city-image";
import CurrentWeather from "./components/current-weather";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined; } }) {
  const duration = searchParams.duration ? searchParams.duration : 'week';
  const unit = searchParams.unit ? searchParams.unit : 'celcius';
  const city = searchParams.city ? searchParams.city : 'mumbai';

  let lat = searchParams.lat ? +searchParams.lat : 0;
  let lon = searchParams.lon ? +searchParams.lon : 0;

  const geoData = await getCityLatLong(city);
  lat = geoData.lat;
  lon = geoData.lon;

  return (
    <div style={poppins.style} className="max-w-full flex flex-col flex-1 h-full">
      <div className="w-full h-full lg:grid lg:grid-cols-[400px_1fr]">
        <div className="bg-white w-full h-full border-r border-gray-200 p-12">
          <div className="flex flex-col justify-between  ">
            <Searchbox />

            <Suspense fallback={<span>loading ... </span>}>
              <CurrentWeatherAndCity lat={lat} lon={lon} city={city} unit={unit} />
            </Suspense>
          </div>
        </div>
        <div className="bg-gray-100  w-full p-12">
          <div className="flex justify-between items-center">
            <DurationTabs active={duration} />
            <div className="flex justify-between items-center space-x-5">
              <UnitSwitcher currentUnit={unit} />
            </div>
          </div>

          <Suspense fallback={<span>loading...</span>}>
            <WeatherForecast duration={duration} unit={unit} lat={lat} lon={lon} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function WeatherForecast({ duration, unit, lat, lon }: { duration: string; unit: string; lat: number; lon: number }) {
  const onecallData = use(getWeatherOneCall({ lat, lon }));

  return (
    <>
      <div className="flex flex-row gap-2 mt-14 overflow-x-auto w-full whitespace-nowrap overflow-y-hidden">
        {duration === 'today' ? <Hourly hourly={onecallData?.hourly} unit={unit} /> : <Daily daily={onecallData?.daily} unit={unit} />}
      </div>

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

function CurrentWeatherAndCity({ lat, lon, city, unit }: { lat: number; lon: number; city: string; unit: string; }) {
  const cityData = use(getCityImageFromUnsplash(city));
  const currentWeather = use(getWeatherInfo({ lat, lon }));
  const cityImage = Array.isArray(cityData?.results) && cityData?.results.length > 0 ? cityData?.results?.[0]?.urls?.regular : '';

  return (
    <>
      <CurrentWeather unit={unit} currentWeather={currentWeather} />
      <CityImage image={cityImage} city={city} />
    </>
  );
}
