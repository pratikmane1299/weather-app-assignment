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

            <Suspense fallback={<CurrentWeatherSkeleton />}>
              <CurrentWeather unit={unit} lat={lat} lon={lon} />
            </Suspense>

            <Suspense fallback={<CitySkeleton />}>
              <CityImage city={city} />
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

          <Suspense fallback={<WeatherForecastSkeleton />}>
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

export function WeatherForecastSkeleton() {
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

function CurrentWeatherSkeleton() {
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

function CitySkeleton() {
  return (
    <div className="relative h-32 w-full rounded-lg bg-gray-300 animate-pulse">
    </div>
  );
}

// function CurrentWeatherAndCity({ lat, lon, city, unit }: { lat: number; lon: number; city: string; unit: string; }) {
//
//   return (
//     <>
//     </>
//   );
// }
