import React, { useCallback } from 'react';

interface DropableProps {
    onDrop: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    type: string;
    children: React.ReactNode;
}
const Dropable: React.FC<DropableProps> = ({
    children,
    type,
    onDrop,
    onDragEnter,
    onDragLeave
}) => {
    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        onDrop(event);
    }, []);

    const handleDragLeave = (event: React.DragEvent) => {
        onDragLeave(event);
    };

    const handleDragEnter = (event: React.DragEvent) => {
        if (event.dataTransfer.types.includes(type)) {
            onDragEnter(event);
        }
    };
    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}>
            {children}
        </div>
    );
};

export default Dropable;
