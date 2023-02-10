import { useCallback, useState } from 'react';
import Dropable from '@components/Decorator/Dropable';
import PreviewStyle from './Preview.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    const [result, setResult] = useState<string>('');
    const [isHovered, setIsHover] = useState<boolean>(false);

    const defaultClassName =
        'text-black border-blue-500 flex justify-center p-4 border-2';
    const className = useCallback(() => {
        if (!isHovered) return defaultClassName;
        return defaultClassName + ' scale-150 ';
    }, [isHovered]);

    const handleDrop = (event: React.DragEvent) => {
        setResult(event.dataTransfer.getData('component'));
        setIsHover(false);
    };

    const handleDragEnter = () => {
        setIsHover(true);
    };
    const handleDragLeave = () => {
        setIsHover(false);
    };
    return (
        <div className={PreviewStyle.iframe}>
            <Dropable
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                type="component">
                <div className={className()}>Drop it here</div>
            </Dropable>
            <div
                dangerouslySetInnerHTML={{
                    __html: result
                }}
            />
        </div>
    );
};

export default PreviewIframe;
