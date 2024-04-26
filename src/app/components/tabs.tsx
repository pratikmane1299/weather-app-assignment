'use client';
import { cn } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

const durations = [{ label: "Today", value: 'today' }, { label: "Week", value: 'week' }]

export default function DurationTabs({ active }: { active: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changeDuration(duration: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (current.has('duration')) {
      current.delete('duration');
    }

    current.set("duration", duration)

    const params = current.toString();
    const query = params ? `?${params}` : '';
    router.push(query);
  }

  return (
    <ul className="flex items-center space-x-4">
      {durations.map((duration) => (
        <li key={duration.value}>
          <span className={cn("cursor-pointer text-base py-1.5 ", active === duration.value ? "font-semibold text-gray-900 border-b-2 border-gray-900" : "text-gray-400")} onClick={() => changeDuration(duration.value)}>{duration.label}</span>
        </li>
      ))}
    </ul>
  )
}
