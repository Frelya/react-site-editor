import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetActiveComponent } from '@store/activeComponent/activeComponentSlice';
import { deleteComponent, moveComponent } from '@store/previewTree/previewTreeSlice';
import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';
import PreviewDroppable from './PreviewDroppable';

interface PreviewComponentWrapperProps {
    children: React.ReactNode | React.ReactNode[];
    index: number;
    editable?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

const PreviewComponentWrapper: React.FunctionComponent<PreviewComponentWrapperProps> = (props) => {
    const dispatch = useDispatch();
    const emitter = useMitt();

    const [isSelected, setIsSelected] = useState(false);

    emitter.on('itemInterfaceClicked', (index) => {
        setIsSelected(index === props.index ? !isSelected : false);
    });

    emitter.on('componentSelected', (activeComponent) => {
        setIsSelected(activeComponent.index === props.index);
    });

    const handleDeleteElementClick = (index: number | string) => {
        return () => {
            dispatch(resetActiveComponent());
            dispatch(
                deleteComponent({
                    index: +index
                })
            );
        };
    };

    const handleMoveElementClick = (index: number | string, direction: 'up' | 'down') => {
        return () => {
            dispatch(
                moveComponent({
                    currentIndex: +index,
                    newIndex: direction === 'up' ? +index - 1 : +index + 1
                })
            );
            dispatch(resetActiveComponent());
            emitter.emit('itemInterfaceClicked', null);
        };
    };

    const handleContainerClick = (event: React.MouseEvent) => {
        if (props.onClick) {
            props.onClick(event);
        }
    };

    return (
        <>
            {props.editable && <PreviewDroppable index={props.index} key={props.index} />}
            <div
                className={`${styleClasses.container} ${
                    props.editable ? styleClasses.containerEditable : ''
                } ${isSelected ? styleClasses.containerSelected : ''}`}
                onClick={handleContainerClick}>
                {props.editable && (
                    <div className={styleClasses.actionIcons}>
                        <Icon
                            name="arrow-small-up"
                            className="rounded-full bg-slate-500 text-white"
                            description="Move up"
                            onClick={handleMoveElementClick(props.index, 'up')}
                        />
                        <Icon
                            name="arrow-small-down"
                            className="rounded-full bg-slate-500 text-white"
                            description="Move down"
                            onClick={handleMoveElementClick(props.index, 'down')}
                        />
                        <Icon
                            name="minus"
                            className="rounded-full bg-red-500 text-white"
                            description="Delete"
                            onClick={handleDeleteElementClick(props.index)}
                        />
                    </div>
                )}

                {props.children}
            </div>
        </>
    );
};

const styleClasses = {
    container: 'flex flex-col items-center justify-center p-1 group',
    containerEditable: 'hover:outline hover:outline-blue-500 hover:outline-2 relative',
    containerSelected: 'outline outline-blue-500 outline-2 relative',
    actionIcons:
        'flex items-center justify-center gap-2 absolute -right-3 -top-1/4 invisible group-hover:visible'
};

export default PreviewComponentWrapper;
