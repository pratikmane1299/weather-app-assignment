'use client';

import { useAppState } from "../contexts/app.context";

import Hourly from "./hourly";
import Daily from "./weekly";

export default function TabsContent({ hourly, daily }: { hourly: any; daily: any }) {
  const { state } = useAppState();
  const { duration } = state;

  return (
    <div className="flex flex-row gap-2 mt-14 overflow-x-auto w-full whitespace-nowrap overflow-y-hidden">
      {duration === 'today' ? <Hourly hourly={hourly} /> : <Daily daily={daily} />}
    </div>
  );
}

