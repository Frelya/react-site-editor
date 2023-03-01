import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import previewTree from './arboresence';
import Droppable from '@components/Decorators/Droppable';
import DynamicComponent from '@components/DynamicComponent/DynamicComponent';
import PreviewStyle from './Preview.module.css';

const Preview: React.FunctionComponent = () => {
    // const previewTree = useSelector(selectPreviewTree);
    const [result, setResult] = useState<string>('');
    const [isHovered, setIsHovered] = useState<boolean>(false);

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
            {previewTree.map((element, elementIndex) => {
                return (
                    <div className={'tree-element'} key={`Element${elementIndex}`}>
                        <Droppable
                            onDrop={handleDrop}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            type="component">
                            <div
                                className={`${PreviewStyle.droppable} ${
                                    isHovered ? 'h-20' : 'h-16'
                                }`}>
                                Drop element here
                            </div>
                        </Droppable>
                        <DynamicComponent componentName={element.id} propsCustom={element.props} />
                    </div>
                );
            })}
        </div>
    );
};

export default Preview;
