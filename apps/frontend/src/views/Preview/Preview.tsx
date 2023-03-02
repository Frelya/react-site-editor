import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
// import previewTree from './arboresence';
import Droppable from '@components/Decorators/Droppable';
import DynamicComponent from '@components/DynamicComponent/DynamicComponent';
import PreviewStyle from './Preview.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectPreviewTree, addComponent } from '@/store/previewTree/previewTreeSlice';
// import type { PreviewTree } from '@libs/types/tree.type';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleDrop = (event: React.DragEvent) => {
        const component = JSON.parse(event.dataTransfer.getData('component'));
        console.log(component);

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
        <div className={PreviewStyle.container}>
            {previewTree.length > 0 &&
                previewTree.map((element, elementIndex) => {
                    return (
                        <div className={'tree-element'} key={`Element${elementIndex}`}>
                            <Droppable
                                onDrop={handleDrop}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                type="component">
                                <div
                                    className={`${PreviewStyle.droppable} ${
                                        isHovered ? 'p-4' : 'p-0'
                                    }`}></div>
                            </Droppable>
                            <DynamicComponent
                                componentName={element.id}
                                propsCustom={element.props}
                            />
                        </div>
                    );
                })}
            {previewTree.length == 0 && (
                <div className={'tree-element'} key={`Element-1}`}>
                    <Droppable
                        onDrop={handleDrop}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        type="component">
                        <div
                            className={`${PreviewStyle.droppable} ${
                                isHovered ? 'p-4' : 'p-1'
                            }`}></div>
                    </Droppable>
                </div>
            )}
        </div>
    );
};

export default Preview;
