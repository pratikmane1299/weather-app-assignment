import { getCityImageFromUnsplash } from "@/api";
import { use } from "react";
export default function CityImage({ city }: { city: string }) {

  const cityData = use(getCityImageFromUnsplash(city));
  const image = Array.isArray(cityData?.results) && cityData?.results.length > 0 ? cityData?.results?.[0]?.urls?.regular : '';

  return (
    <div className="relative h-32 w-full rounded-lg overflow-hidden">
      <img alt={city} src={image} className="w-full h-full" />

      <span className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-medium uppercase">{city}</span>
    </div>
  );
}

