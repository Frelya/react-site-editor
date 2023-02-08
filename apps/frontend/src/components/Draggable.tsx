import React from 'react';
import { renderToString } from 'react-dom/server';

const Draggable: React.FC<React.PropsWithChildren> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData(
            'text/plain',
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
