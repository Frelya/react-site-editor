import { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { specsValuesParser } from '@react-site-editor/functions';
import { selectPreviewTree } from '@store/previewTree/previewTreeSlice';
import { PreviewScreen } from '@/types';
import type { ActiveComponent } from '@/types';
import { useMitt } from '@components/Decorators/MittProvider';
import PreviewComponentWrapper from '@components/Preview/PreviewComponentWrapper';
import PreviewDroppable from '@components/Preview/PreviewDroppable';
import DynamicComponent from '@components/Decorators/DynamicComponent';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt();
    const [screen, setScreen] = useState<PreviewScreen>(PreviewScreen.DESKTOP);

    const handleElementClick = (element: ActiveComponent) => {
        emitter.emit('componentSelected', element);
    };

    emitter.on('previewScreenChange', (newScreen) => {
        setScreen(newScreen);
    });

    return (
        <div className={styleClasses.container}>
            <div
                className={`${styleClasses.iframe} ${
                    screen === PreviewScreen.DESKTOP
                        ? styleClasses.iframeDesktop
                        : styleClasses.iframeMobile
                }`}>
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
                                    editable={true}
                                    index={elementIndex}
                                    onClick={() =>
                                        handleElementClick({
                                            index: elementIndex,
                                            name: element.name,
                                            specs: element.specs
                                        })
                                    }>
                                    <Suspense>
                                        <DynamicComponent
                                            componentName={element.name}
                                            componentProps={specsValuesParser(element.specs)}
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
    iframe: 'p-4 flex flex-col justify-start items-start bg-white',
    iframeDesktop: 'w-[95%] aspect-video overflow-x-hidden overflow-y-auto',
    iframeMobile: 'h-[95%] aspect-[9/16] rounded-3xl'
};

export default Preview;
