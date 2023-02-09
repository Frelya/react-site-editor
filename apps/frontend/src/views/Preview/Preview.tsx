import { useCallback, useState } from 'react';
import Dropable from '@components/Decorator/Dropable';
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
        <div className={PreviewStyle.iframe}>
            <Dropable>
                <div className="text-black bg-blue-500 flex justify-center p-4 border">
                    Drop it here
                </div>
            </Dropable>
        </div>
    );
};

export default PreviewIframe;
