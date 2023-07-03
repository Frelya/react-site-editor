import { useContext, useDebugValue } from 'react';
import { MittContext } from '@contexts/mitt';
import type { MittContextType } from '@contexts/mitt';

export const useMitt = (): MittContextType => {
    const context = useContext(MittContext);

    if (context === undefined) {
        throw new Error('useMitt must be used within a MittProvider');
    }

    useDebugValue(context);

    return context;
};
