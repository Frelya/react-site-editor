import React, { useContext } from 'react';
import { mitt, Emitter, EventType } from '@/plugins/mitt/index';

export type MittContextType = Emitter<Record<EventType, unknown>>;

const emitter: MittContextType = mitt();

const MittContext = React.createContext<MittContextType>(emitter);

const MittProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return <MittContext.Provider value={emitter}>{children}</MittContext.Provider>;
};

type MittOrigin = 'main' | 'preview';

export const useMitt = (from: MittOrigin): MittContextType => {
    const emitterLocationMap: Record<MittOrigin, () => MittContextType> = {
        main: () => useContext(MittContext),
        preview: () => window.parent.getEmitter()
    };

    return emitterLocationMap[from]();
};

export default MittProvider;
