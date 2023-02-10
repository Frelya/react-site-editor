import React, { useCallback } from 'react';

interface DropableProps {
    onDrop: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    type: string;
    children: React.ReactNode;
}
const Dropable: React.FC<DropableProps> = (props) => {
    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        props.onDrop(event);
    }, []);

    const handleDragLeave = (event: React.DragEvent) => {
        props.onDragLeave(event);
    };

    const handleDragEnter = (event: React.DragEvent) => {
        if (event.dataTransfer.types.includes(props.type)) {
            props.onDragEnter(event);
        }
    };
    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}>
            {props.children}
        </div>
    );
};

export default Dropable;
