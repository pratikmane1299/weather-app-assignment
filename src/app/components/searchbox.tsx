'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function useDebounce(value: string, delay = 200) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedVal;
}

export default function Searchbox() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const initialRender = useRef(true);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    initialRender.current = false;
  }, []);

  useEffect(() => {
    if (!initialRender.current) {
      const params = new URLSearchParams({ city: debouncedQuery });
      router.push(`?${params}`);
    }
  }, [debouncedQuery, initialRender, router]);

  // useEffect(() => {
  //   getLocation();
  // }, []);

  function updateLocation(location: any) {
    const { coords } = location;

    const params = new URLSearchParams({
      lat: coords.latitude.toString(),
      lon: coords.longitude.toString(),
    });

    router.push(`?${params}`);
  }

  function getLocation() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(updateLocation);

      navigator.geolocation.watchPosition(updateLocation);
    }
  }

  return (
    <div className="relative flex items-center justify-between h-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>

      <input placeholder="Search for places..." className="ml-3 flex-1 placeholder:text-gray-900 border-none outline-none" value={query} onChange={(e) => setQuery(e.target.value)} />

      <button className="h-10 w-10 flex items-center justify-center bg-gray-100 text-gray-800 rounded-full" onClick={getLocation}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>
    </div>
  )
}
