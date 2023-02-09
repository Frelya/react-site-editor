import React, { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

interface DraggableProps {
    children: ReactNode;
    type: string;
}

const Draggable: React.FC<DraggableProps> = ({ children, type }) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData(
            type,
            renderToString(children as React.ReactElement)
        );
    };
    return (
        <div draggable onDragStart={handleDragStart}>
            {children}
        </div>
    );
};

export default Draggable;
