'use client';
import React, { PropsWithChildren, use, useState } from "react";

export type DurationType = 'today' | 'week';
export type UnitType = 'celcius' | 'farhenheit';

type AppStateType = {
  duration: DurationType;
  unit: UnitType;
}

type AppContextType = {
  state: AppStateType;
  setUnit: (unit: UnitType) => void;
  setDuration: (duration: DurationType) => void;
};

const AppContext = React.createContext<AppContextType>({
  state: {
    duration: 'week',
    unit: 'celcius',
  },
  setUnit: (unit: UnitType) => { },
  setDuration: (duration: DurationType) => { },
});

export function AppContextProvider(props: PropsWithChildren<{ initialState: AppStateType }>) {
  const [state, setState] = useState<AppStateType>(props.initialState);

  function setDuration(duration: DurationType) {
    setState((prev) => ({
      ...prev,
      duration,
    }));
  }

  function setUnit(unit: UnitType) {
    setState((prev) => ({
      ...prev,
      unit,
    }));
  }

  return (
    <AppContext.Provider value={{ state, setDuration, setUnit }}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return use(AppContext);
}

