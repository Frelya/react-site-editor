import { useCallback } from 'react';

interface DroppableProps {
    onDrop: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    type: string;
    children: React.ReactNode;
}

const Droppable: React.FunctionComponent<DroppableProps> = (props) => {
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
            className="w-full"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}>
            {props.children}
        </div>
    );
};

export default Droppable;
