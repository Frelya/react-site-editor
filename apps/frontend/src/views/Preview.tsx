import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useMitt } from '@/components/Decorators/MittProvider';
import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import type { PreviewElementData } from '@libs/types/tree.type';
import PreviewComponentWrapper from '@/components/Preview/PreviewComponentWrapper';
import PreviewDroppable from '@components/Preview/PreviewDroppable';
import DynamicComponent from '@components/Decorators/DynamicComponent';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt('preview');

    const handleElementClick = (element: PreviewElementData) => {
        emitter.emit(`componentSelected`, element);
    };

    return (
        <div className={styleClasses.container}>
            {previewTree.length == 0 && (
                <div className={'tree-element'} key={'Element-First'}>
                    <PreviewDroppable index={0} key={0} />
                </div>
            )}
            {previewTree.length > 0 &&
                previewTree.map((element, elementIndex) => {
                    return (
                        <div
                            className={'tree-element'}
                            key={elementIndex + JSON.stringify(element)}>
                            <PreviewComponentWrapper
                                index={elementIndex}
                                onClick={() => handleElementClick(element)}>
                                <Suspense>
                                    <DynamicComponent
                                        componentName={element.id}
                                        componentGroup={element.group}
                                        customProps={element.props}
                                    />
                                </Suspense>
                            </PreviewComponentWrapper>
                        </div>
                    );
                })}
            {previewTree.length > 0 && (
                <div className={'tree-element'} key={'Element-Last'}>
                    <PreviewDroppable index={previewTree.length} key={previewTree.length} />
                </div>
            )}
        </div>
    );
};

const styleClasses = {
    container: 'w-full min-h-screen bg-white p-4'
};

export default Preview;
