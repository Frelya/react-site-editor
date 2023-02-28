import { useState } from 'react';
import Droppable from '@components/Decorators/Droppable';
import PreviewStyle from './Preview.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPreviewTree,
    addComponent
} from '@/store/previewTree/previewTreeSlice';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleDrop = (event: React.DragEvent) => {
        dispatch(
            addComponent({
                id: JSON.parse(event.dataTransfer.getData('component')).id,
                props: JSON.parse(event.dataTransfer.getData('component'))
                    .defaultProps
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
        <div className={PreviewStyle.container}>
            <Droppable
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                type="component">
                <div
                    className={`${PreviewStyle.droppable} ${
                        isHovered ? 'p-4' : 'p-1'
                    }`}></div>
                {JSON.stringify(isHovered)}
                {/* {JSON.stringify(previewTree)} */}
            </Droppable>
        </div>
    );
};

export default Preview;
