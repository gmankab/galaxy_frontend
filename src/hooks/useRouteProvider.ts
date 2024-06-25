import { useContext } from 'react';
import { RouteContext, RouteProviderContext } from '@/context/routeContext';

export function useRouteProvider() {
  return useContext<RouteContext | null>(RouteProviderContext)!;
}
