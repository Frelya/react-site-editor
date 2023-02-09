import { useState } from 'react';
import Dropable from '@components/Decorator/Dropable';
import PreviewStyle from './Preview.module.css';

const PreviewIframe: React.FunctionComponent = () => {
    const [result, setResult] = useState<string>('');

    const handleDrop = (event: React.DragEvent) => {
        setResult(event.dataTransfer.getData('text/plain'));
    };
    return (
        <div className={PreviewStyle.iframe}>
            <Dropable onDrop={handleDrop}>
                <div className="text-black bg-blue-500 flex justify-center p-4 border">
                    Drop it here
                </div>
            </Dropable>
            {result}
            <div
                dangerouslySetInnerHTML={{
                    __html: result
                }}
            />
        </div>
    );
};

export default PreviewIframe;
