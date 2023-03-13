import { prefix } from '@react-site-editor/functions';
import useStorage from './useStorage';

export default function useSessionStorage(key: string) {
    return useStorage('session', prefix(key));
}
