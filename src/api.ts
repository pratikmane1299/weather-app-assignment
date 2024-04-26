import { env } from '@/env.mjs';
import myFetch from './fetch';

const OPEN_WEATHER_API_KEY = env.OPEN_WEATHER_API_KEY;
const UNSPLASH_API_KEY = env.UNSPLASH_API_KEY;

function getOpenMapAPIURL(url: string, params: { [key: string]: number | string; }) {
  const query = Object.keys(params || {}).map((key) => `${key}=${params[key]}`).join('&');
  return `https://api.openweathermap.org${url}?appid=${OPEN_WEATHER_API_KEY}${query ? `&${query}` : ''}`;
}

function getUnsplashAPIURL({ url, params }: { url: string; params: { [key: string]: string | number } }) {
  const query = Object.keys(params || {}).map((key) => `${key}=${params[key]}`).join('&');
  return `https://api.unsplash.com${url}?client_id=${UNSPLASH_API_KEY}${query ? `&${query}` : ''}`;
}

export async function getCityLatLong(city: string) {
  const { data } = await myFetch({
    url: getOpenMapAPIURL('/geo/1.0/direct', { q: city, country: 'in' }),
    method: 'GET',
  });

  return {
    lat: data?.[0]?.lat,
    lon: data?.[0]?.lon,
  };
}

export async function getWeatherInfo({ lat, lon }: { lat: number, lon: number }) {
  const { data } = await myFetch({
    url: getOpenMapAPIURL('/data/2.5/weather', { lat, lon }),
    method: 'GET',
  });

  return data;
}

export async function getWeatherOneCall({ lat, lon }: { lat: number; lon: number; }) {
  const { data } = await myFetch({
    url: getOpenMapAPIURL(`/data/2.5/onecall`, { lat, lon }),
    method: 'GET',
  });

  return data;
}

export async function getCityImageFromUnsplash(city: string) {
  const { data } = await myFetch({
    url: getUnsplashAPIURL({ url: '/search/photos', params: { query: city, per_page: 5, } }),
    method: 'GET',
  });

  return data;
}

