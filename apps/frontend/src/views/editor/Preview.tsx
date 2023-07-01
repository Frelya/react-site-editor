import { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPreviewTree } from '@store/previewTree/previewTreeSlice';
import { PreviewScreen } from '@/types';
import { useMitt, DynamicComponent } from '@components/Decorators';
import PreviewComponentWrapper from '@components/Preview/PreviewComponentWrapper';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt();
    const [screen, setScreen] = useState<PreviewScreen>(PreviewScreen.DESKTOP);

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
                        No elements added yet
                    </div>
                )}
                {previewTree.length > 0 &&
                    previewTree.map((element, elementIndex) => {
                        return (
                            <div
                                className={'tree-element w-full'}
                                key={elementIndex + JSON.stringify(element)}>
                                <PreviewComponentWrapper editable={false} index={elementIndex}>
                                    <Suspense>
                                        <DynamicComponent
                                            componentName={element.name}
                                            componentProps={element.specs}
                                        />
                                    </Suspense>
                                </PreviewComponentWrapper>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

const styleClasses = {
    container: 'flex justify-center items-center w-full h-full bg-slate-500',
    iframe: 'p-4 flex flex-col justify-start items-start gap-1 bg-white',
    iframeDesktop: 'w-[95%] aspect-video',
    iframeMobile: 'h-[95%] aspect-[9/16] rounded-3xl'
};

export default Preview;
