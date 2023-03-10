import { prefix } from '@react-site-editor/functions';
import useStorage from '@hooks/useStorage';

export default function useLocalStorage(key: string) {
    return useStorage('local', prefix(key));
}
