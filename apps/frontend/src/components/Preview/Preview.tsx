import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import type { ActiveComponent } from '@/types';
import { useMitt } from '@/components/Decorators/MittProvider';
import PreviewComponentWrapper from '@/components/Preview/PreviewComponentWrapper';
import PreviewDroppable from '@components/Preview/PreviewDroppable';
import DynamicComponent from '@components/Decorators/DynamicComponent';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt();

    const handleElementClick = (element: ActiveComponent) => {
        emitter.emit('componentSelected', element);
    };

    return (
        <div className={styleClasses.container}>
            <div className={styleClasses.iframe}>
                {previewTree.length == 0 && (
                    <div className={'tree-element w-full'} key={'Element-First'}>
                        <PreviewDroppable index={0} key={0} />
                    </div>
                )}
                {previewTree.length > 0 &&
                    previewTree.map((element, elementIndex) => {
                        return (
                            <div
                                className={'tree-element w-full'}
                                key={elementIndex + JSON.stringify(element)}>
                                <PreviewComponentWrapper
                                    index={elementIndex}
                                    onClick={() =>
                                        handleElementClick({ index: elementIndex, ...element })
                                    }>
                                    <Suspense>
                                        <DynamicComponent
                                            componentName={element.name}
                                            customProps={element.props}
                                        />
                                    </Suspense>
                                </PreviewComponentWrapper>
                            </div>
                        );
                    })}
                {previewTree.length > 0 && (
                    <div className={'tree-element w-full'} key={'Element-Last'}>
                        <PreviewDroppable index={previewTree.length} key={previewTree.length} />
                    </div>
                )}
            </div>
        </div>
    );
};

const styleClasses = {
    container: 'flex justify-center items-center w-full h-full bg-slate-500',
    iframe: 'w-[95%] p-4 flex flex-col aspect-video justify-start items-start bg-white'
};

export default Preview;
