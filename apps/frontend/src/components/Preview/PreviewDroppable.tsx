import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMitt } from '@components/Decorators/MittProvider';
import { addComponent } from '@store/previewTree/previewTreeSlice';
import Droppable from '@components/Decorators/Droppable';

interface PreviewDroppableProps {
    index: number;
}

const PreviewDroppable: React.FunctionComponent<PreviewDroppableProps> = (props) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const emitter = useMitt();

    emitter.on('dragStartEvent', () => {
        setIsDraggedOver(true);
    });

    emitter.on('dragEndEvent', () => {
        setIsDraggedOver(false);
    });

    const handleDrop = (event: React.DragEvent) => {
        const component = JSON.parse(event.dataTransfer.getData('component'));

        dispatch(
            addComponent({
                index: props.index,
                data: {
                    name: component.name,
                    group: component.group,
                    props: component.defaultProps
                }
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
                className={`${styleClasses.container} ${isHovered ? 'p-4' : 'p-1'} ${
                    isDraggedOver ? 'flex' : 'hidden'
                }`}></div>
        </Droppable>
    );
};

const styleClasses = {
    container: 'text-black border-blue-500 w-full border-2 transition-all'
};

export default PreviewDroppable;
