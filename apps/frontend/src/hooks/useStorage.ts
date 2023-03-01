import { useState } from 'react';

export default function useStorage(type: 'local' | 'session', key: string) {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const previousValue = storage.getItem(key);

    const [value, setValue] = useState(previousValue ? JSON.stringify(previousValue) : null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function putValue(val: any) {
        storage.setItem(key, JSON.stringify(value));
        setValue(val);
    }

    function deleteValue() {
        storage.removeItem(key);
        setValue(null);
    }

    return { value, set: putValue, clear: deleteValue };
}
