'use client';

import { cn } from "@/utils";
import { UnitType, useAppState } from "../contexts/app.context";

type UnitsType = { label: string; value: UnitType }[];

const units: UnitsType = [{ label: "C", value: 'celcius' }, { label: "F", value: 'farhenheit' }];
export default function UnitSwitcher() {

  const { state, setUnit } = useAppState();

  return (
    <ul className="flex items-center space-x-3">
      {units.map((unit) => (
        <li key={unit.value}>
          <span className={cn("cursor-pointer p-2 w-7 h-7 flex justify-center items-center rounded-full  ", state.unit === unit.value ? "bg-gray-900 text-white" : "bg-white text-gray-900")} onClick={() => setUnit(unit.value)}>
            <sup>.</sup>{unit.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
