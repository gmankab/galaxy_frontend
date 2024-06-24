import { FC, ReactNode, createContext, useState } from 'react';

export type PageType = 'main' | 'shop' | 'rang' | 'bonus' | 'clans' | 'clan' | 'clan_create';
export interface IRouteContext {
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  active_clan_id: number; // 0 или id клана
  setActiveClanId: React.Dispatch<React.SetStateAction<number>>;
}

export const RouteContext = createContext<IRouteContext | null>(null);

export const RouteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<PageType>('main');
  const [active_clan_id, setActiveClanId] = useState<number>(0);

  return <RouteContext.Provider value={{ page, setActiveClanId, setPage, active_clan_id }}>{children}</RouteContext.Provider>;
};
