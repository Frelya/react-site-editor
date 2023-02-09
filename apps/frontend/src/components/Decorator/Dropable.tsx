import React, { useCallback } from 'react';

interface DropableProps {
    onDrop: (e: React.DragEvent) => void;
    children: React.ReactNode;
}
const Dropable: React.FC<DropableProps> = ({ children, onDrop }) => {
    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        onDrop(event);
    }, []);
    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            {children}
        </div>
    );
};

export default Dropable;
