import { useSelector } from 'react-redux';
import { useMitt } from '@/plugins/mitt/react-mitt';
import { selectPreviewTree } from '@/store/previewTree/previewTreeSlice';
import type { PreviewElement } from '@libs/types/tree.type';
import PreviewDroppable from '@components/Preview/PreviewDroppable/PreviewDroppable';
import DynamicComponent from '@components/DynamicComponent/DynamicComponent';
import PreviewComponentWrapper from '@/components/Preview/PreviewComponentWrapper/PreviewComponentWrapper';
import PreviewStyle from './Preview.module.css';

const Preview: React.FunctionComponent = () => {
    const previewTree = useSelector(selectPreviewTree);
    const emitter = useMitt('preview');

    const handleElementClick = (element: PreviewElement) => {
        emitter.emit(`componentSelected`, element);
    };

    return (
        <div className={PreviewStyle.container}>
            {previewTree.length > 0 &&
                previewTree.map((element, elementIndex) => {
                    return (
                        <div className={'tree-element'} key={`Element${elementIndex}`}>
                            <PreviewComponentWrapper
                                onClick={() => handleElementClick(element)}
                                key={elementIndex}>
                                <DynamicComponent
                                    key={elementIndex}
                                    componentName={element.id}
                                    customProps={element.props}
                                />
                            </PreviewComponentWrapper>
                        </div>
                    );
                })}
            {previewTree.length == 0 && (
                <div className={'tree-element'} key={`Element-1}`}>
                    <PreviewDroppable />
                </div>
            )}
        </div>
    );
};

export default Preview;
