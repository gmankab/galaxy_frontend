import { createContext, useState, FC, ReactNode } from 'react'


export type IPage =  "main"|"shop"|"rang"|"bonus"|"clans"|"clan"
export interface IRouteContext {
    page:IPage
    setPage: React.Dispatch<React.SetStateAction<IPage>>
    active_clan_id:number //0 или id клана
    setActiveClanId: React.Dispatch<React.SetStateAction<number>>
}

const RouteContext = createContext<IRouteContext | null>(null)


const RouteProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [page,setPage] = useState<IPage>('main')
    const [active_clan_id,setActiveClanId] = useState<number>(0)

    return <RouteContext.Provider value={{ page,setActiveClanId, setPage,active_clan_id }}>{children}</RouteContext.Provider>
}

export { RouteProvider, RouteContext }
