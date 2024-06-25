import * as React from 'react';
import { ReactNode, createContext, useMemo, useState } from 'react';

export type PageType = 'main' | 'shop' | 'rang' | 'bonus' | 'clans' | 'clan' | 'clan_create' | 'clan_search' | 'sector' | 'personalization';

export interface RouteContext {
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  activeClanId: number; // 0 или id клана
  setActiveClanId: React.Dispatch<React.SetStateAction<number>>;
}

export const RouteProviderContext = createContext<RouteContext | null>(null);

export interface RouteProviderProps {
  children: ReactNode;
}

export function RouteProvider({ children }: RouteProviderProps) {
  const [page, setPage] = useState<PageType>('main');
  const [activeClanId, setActiveClanId] = useState(0);
  const value = useMemo(
    () => { return { page, setActiveClanId, setPage, activeClanId }; },
    [page, activeClanId],
  );

  return (
    <RouteProviderContext.Provider value={value}>
      {children}
    </RouteProviderContext.Provider>
  );
};
