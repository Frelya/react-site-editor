import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { components } from '@react-site-editor/ui';
import type { ComponentInfos } from '@react-site-editor/types';
import { addComponent } from '@store/previewTree/previewTreeSlice';
import { useMitt, Droppable } from '@components/Decorators';

interface PreviewDroppableProps {
    index: number;
}

const PreviewDroppable: React.FunctionComponent<PreviewDroppableProps> = (props) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const emitter = useMitt();

    const findComponent = (name: string): ComponentInfos => {
        for (const component of components) {
            if (component.name === name) {
                return component;
            }
        }

        throw new Error(`Component ${name} not found`);
    };

    emitter.on('dragStartEvent', () => {
        setIsDraggedOver(true);
    });

    emitter.on('dragEndEvent', () => {
        setIsDraggedOver(false);
    });

    const handleDrop = (event: React.DragEvent) => {
        const componentName = event.dataTransfer.getData('component');
        const component = findComponent(componentName);

        dispatch(
            addComponent({
                index: props.index,
                data: {
                    name: component.name,
                    group: component.group,
                    specs: component.specs
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
