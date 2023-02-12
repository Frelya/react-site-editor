import { useCallback, useState } from 'react';
import Droppable from '@components/Decorators/Droppable';
import PreviewStyle from './Preview.module.css';

const Preview: React.FunctionComponent = () => {
    const [result, setResult] = useState<string>('');
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const defaultClassName =
        'text-black border-blue-500 flex justify-center items-center p-4 border-2';
    const className = useCallback(() => {
        if (!isHovered) return defaultClassName;
        return defaultClassName + ' h-20 ';
    }, [isHovered]);

    const handleDrop = (event: React.DragEvent) => {
        setResult(event.dataTransfer.getData('component'));
        setIsHovered(false);
    };

    const handleDragEnter = () => {
        setIsHovered(true);
    };
    const handleDragLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className={PreviewStyle.container}>
            <Droppable
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                type="component">
                <div className={className()}>Drop it here</div>
            </Droppable>
            <div
                dangerouslySetInnerHTML={{
                    __html: result
                }}
            />
        </div>
    );
};

export default Preview;
