import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { useMitt } from '@/plugins/mitt/react-mitt';
import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import type { PreviewElementData } from '@libs/types/tree.type';

import PreviewDroppable from '@components/Preview/PreviewDroppable/PreviewDroppable';
import DynamicComponent from '@components/DynamicComponent/DynamicComponent';
import PreviewComponentWrapper from '@/components/Preview/PreviewComponentWrapper/PreviewComponentWrapper';

import PreviewStyle from './Preview.module.css';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt('preview');

    const handleElementClick = (element: PreviewElementData) => {
        emitter.emit(`componentSelected`, element);
    };

    return (
        <div className={PreviewStyle.container}>
                {previewTree.length > 0 &&
                    previewTree.map((element, elementIndex) => {
                        return (
                            <div className={'tree-element'} key={elementIndex + JSON.stringify(element)}>
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
                    <div className={'tree-element'} key={`Element-0`}>
                        <PreviewDroppable index={0} key={0} />
                    </div>
                )}
        </div>
    );
};

export default Preview;
