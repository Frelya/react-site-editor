import React, { useContext } from 'react';
import { mitt, Emitter, EventType } from '@/plugins/mitt/index';

const emitter: Emitter<Record<EventType, unknown>> = mitt();

export type MittContextType = Emitter<Record<EventType, unknown>>;

const MittContext = React.createContext<MittContextType>(emitter);

export const MittProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <MittContext.Provider value={emitter}>{children}</MittContext.Provider>;
};

export const useMitt = (): MittContextType => {
    return useContext(MittContext);
};
