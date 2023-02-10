import React, { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

interface DraggableProps {
    children: ReactNode;
    type: string;
}

const Draggable: React.FC<DraggableProps> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData(
            props.type,
            renderToString(props.children as React.ReactElement)
        );
    };
    return (
        <div draggable onDragStart={handleDragStart}>
            {props.children}
        </div>
    );
};

export default Draggable;
