import { createContext } from 'react';
import { mitt, Emitter } from '@plugins/mitt';
import type { Events } from '@/types';

export type MittContextType = Emitter<Events>;

export const emitter: MittContextType = mitt<Events>();

export const MittContext = createContext<MittContextType>(emitter);
