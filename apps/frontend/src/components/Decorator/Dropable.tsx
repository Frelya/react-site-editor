import React, { useCallback, useState } from 'react';
import { renderToString } from 'react-dom/server';

const Dropable: React.FC<React.PropsWithChildren> = (props) => {
    const [result, setResult] = useState('');

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        console.log(event.dataTransfer.getData('text/plain'));

        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setResult(event.dataTransfer.getData('text/plain'));
        console.log('event', event.dataTransfer);
    }, []);
    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            {props.children}

            <div
                dangerouslySetInnerHTML={{
                    __html: result
                }}></div>
        </div>
    );
};

export default Dropable;
