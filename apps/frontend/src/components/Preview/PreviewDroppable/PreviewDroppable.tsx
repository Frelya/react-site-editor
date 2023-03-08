import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComponent } from '@/store/previewTree/previewTreeSlice';
import Droppable from '@components/Decorators/Droppable';
import PreviewDroppableStyle from './PreviewDroppable.module.css';

const PreviewDroppable: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isDraggabled, setIsDraggisDraggabled] = useState<boolean>(false);
    const emitter = window.parent.getEmitter();

    emitter.on('dragStartEvent', () => {
        setIsDraggisDraggabled(true);
    });
    emitter.on('dragEndEvent', () => {
        setIsDraggisDraggabled(false);
    });
    const handleDrop = (event: React.DragEvent) => {
        const component = JSON.parse(event.dataTransfer.getData('component'));

        dispatch(
            addComponent({
                id: component.name,
                props: component.defaultProps
            })
        );

        setIsHovered(false);
    };

    const handleDragEnter = () => {
        setIsHovered(true);
    };

    const handleDragLeave = () => {
        setIsHovered(false);
    };

    return (
        <Droppable
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            type="component">
            <div
                className={`${PreviewDroppableStyle.container} ${isHovered ? 'p-4' : 'p-1'} ${
                    isDraggabled ? 'flex' : 'hidden'
                }`}></div>
        </Droppable>
    );
};

export default PreviewDroppable;
