import { useContext } from 'react';
import { MittContext } from '@contexts/mitt';
import type { MittContextType } from '@contexts/mitt';

export const useMitt = (): MittContextType => useContext<MittContextType>(MittContext);
