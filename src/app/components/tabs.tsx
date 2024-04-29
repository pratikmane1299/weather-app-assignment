'use client';

import { cn } from "@/utils";
import { DurationType, useAppState } from "../contexts/app.context";

type DurationsType = { label: string; value: DurationType }[];

const durations: DurationsType = [{ label: "Today", value: 'today' }, { label: "Week", value: 'week' }]

export default function DurationTabs() {
  const { state, setDuration } = useAppState();

  return (
    <ul className="flex items-center space-x-4">
      {durations.map((duration) => (
        <li key={duration.value}>
          <span className={cn("cursor-pointer text-base py-1.5 ", state.duration === duration.value ? "font-semibold text-gray-900 border-b-2 border-gray-900" : "text-gray-400")} onClick={() => setDuration(duration.value)}>{duration.label}</span>
        </li>
      ))}
    </ul>
  )
}
