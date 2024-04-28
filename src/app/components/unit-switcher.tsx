'use client';

import { cn } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";

const units = [{ label: "C", value: 'celcius' }, { label: "F", value: 'farhenheit' }];
export default function UnitSwitcher({ currentUnit }: { currentUnit: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticUnit, setUnit] = useOptimistic(currentUnit);
  const [_, setTransition] = useTransition();

  function changeUnit(unit: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (current.has('unit')) {
      current.delete('unit');
    }

    current.set("unit", unit)

    const params = current.toString();
    const query = params ? `?${params}` : '';

    setTransition(() => {
      setUnit(unit);
      router.push(query);
    });
  }

  return (
    <ul className="flex items-center space-x-3">
      {units.map((unit) => (
        <li key={unit.value}>
          <span className={cn("cursor-pointer p-2 w-7 h-7 flex justify-center items-center rounded-full  ", optimisticUnit === unit.value ? "bg-gray-900 text-white" : "bg-white text-gray-900")} onClick={() => changeUnit(unit.value)}>
            <sup>.</sup>{unit.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
