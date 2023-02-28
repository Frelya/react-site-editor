import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import { components } from '@react-site-editor/ui';
import type { PredefinedComponent } from '@react-site-editor/types';
import previewTree from './arboresence';
import Droppable from '@components/Decorators/Droppable';
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
                const component = components[element.id];
                const componentChildren: PredefinedComponent[] = element.children.map(
                    (child) => components[child.id]
                );

                return (
                    <div className={'tree-element'} key={`Element${elementIndex}`}>
                        {component.caller({
                            ...component.defaultProps,
                            ...element.props,
                            children: componentChildren.map((child, childIndex) => {
                                const canDisplayChild = component.defaultProps.maxChildren
                                    ? childIndex <= component.defaultProps.maxChildren - 1
                                    : true;

                                const canDrop = component.defaultProps.maxChildren
                                    ? childIndex === element.children.length - 1 &&
                                      element.children.length < component.defaultProps.maxChildren
                                    : true;

                                return (
                                    canDisplayChild && (
                                        <div key={`Element${elementIndex}Child${childIndex}`}>
                                            {child.caller({
                                                ...child.defaultProps,
                                                ...element.children[childIndex].props
                                            })}
                                            {canDrop && (
                                                <Droppable
                                                    onDrop={handleDrop}
                                                    onDragEnter={handleDragEnter}
                                                    onDragLeave={handleDragLeave}
                                                    type="componentChild">
                                                    <div
                                                        className={`${PreviewStyle.droppable} ${
                                                            isHovered ? 'h-20' : 'h-16'
                                                        }`}>
                                                        Drop child here
                                                    </div>
                                                </Droppable>
                                            )}
                                        </div>
                                    )
                                );
                            })
                        })}
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
                    </div>
                );
            })}
        </div>
    );
};

export default Preview;
