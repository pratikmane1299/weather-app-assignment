export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function convertTempToUnit(temp: number, unit: string) {
  if (unit === 'farhenheit') {
    return (1.8 * (temp - 273.15) + 32).toFixed(0);
  }
  if (unit === 'celcius') {
    return (temp - 273.15).toFixed(0);
  }
}

