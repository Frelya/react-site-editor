import { useSelector } from 'react-redux';
import { useMitt } from '@/plugins/mitt/react-mitt';
import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import type { PreviewElementData } from '@libs/types/tree.type';
import PreviewDroppable from '@components/Preview/PreviewDroppable/PreviewDroppable';
import DynamicComponent from '@components/DynamicComponent/DynamicComponent';
import PreviewComponentWrapper from '@/components/Preview/PreviewComponentWrapper/PreviewComponentWrapper';
import PreviewStyle from './Preview.module.css';
import { Suspense, useEffect, useState } from 'react';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt('preview');
    const [showComponent, setShowComponent] = useState(true);
    const [render, setRender] = useState(null);

    //Make all the component unMount and re-mount
    const handleValueUpdate = () => {
        setShowComponent(false);
        setTimeout(() => setShowComponent(true), 0);
    };
    const handleElementClick = (element: PreviewElementData) => {
        emitter.emit(`componentSelected`, element);
    };
    useEffect(() => {
        // TODO Fix this type error
        setRender(
            <div className={PreviewStyle.container}>
                {previewTree.length > 0 &&
                    previewTree.map((element, elementIndex) => {
                        return (
                            <div className={'tree-element'} key={`Element${elementIndex}`}>
                                <PreviewComponentWrapper
                                    index={elementIndex}
                                    onClick={() => handleElementClick(element)}>
                                    <Suspense>
                                        <DynamicComponent
                                            componentName={element.id}
                                            customProps={element.props}
                                        />
                                    </Suspense>
                                </PreviewComponentWrapper>
                            </div>
                        );
                    })}
                {previewTree.length == 0 && (
                    <div className={'tree-element'} key={`Element-1}`}>
                        <PreviewDroppable index={0} />
                    </div>
                )}
            </div>
        );
        handleValueUpdate();
    }, [previewTree]);

    return <>{showComponent && render}</>;
};

export default Preview;
