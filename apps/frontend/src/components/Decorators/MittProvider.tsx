import React, { useContext } from 'react';
import { mitt, Emitter } from '@plugins/mitt';
import type { Events } from '@/types';
export type MittContextType = Emitter<Events>;

const emitter: MittContextType = mitt<Events>();

const MittContext = React.createContext<MittContextType>(emitter);

const MittProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <MittContext.Provider value={emitter}>{children}</MittContext.Provider>;
};

export const useMitt = () => useContext(MittContext);

export default MittProvider;
