import { useEffect, useState, useDebugValue } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ContextMenuCoordinates } from '@/types';

export type ContextMenuHook = [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    ContextMenuCoordinates,
    Dispatch<SetStateAction<ContextMenuCoordinates>>
];

export const useContextMenu = (): ContextMenuHook => {
    // A boolean value to determine if the user has right-clicked
    const [clicked, setClicked] = useState<boolean>(false);
    // Allows us to track the (x,y) coordinates of the users right click
    const [coords, setCoords] = useState<ContextMenuCoordinates>({ x: 0, y: 0 });

    useEffect(() => {
        // Reset clicked to false on user click
        const handleClick = () => {
            setClicked(false);
        };

        // Add the listener for user click
        document.addEventListener('click', handleClick);

        // Clean up listener function to avoid memory leaks
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    useDebugValue(clicked ? `Clicked at (${coords.x}, ${coords.y})` : 'Not clicked');

    return [clicked, setClicked, coords, setCoords];
};
