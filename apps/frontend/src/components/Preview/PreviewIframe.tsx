import { useCallback, useState } from 'react';
import PreviewStyle from './Preview.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    const [result, setResult] = useState('');

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setResult(event.dataTransfer.getData('text/plain'));
        console.log('event', event.dataTransfer.getData('text/plain'));
    }, []);
    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`${PreviewStyle.iframe}`}>
            <div
                dangerouslySetInnerHTML={{
                    __html: result
                }}></div>
        </div>
    );
};

export default PreviewIframe;
