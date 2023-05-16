import { useDispatch } from 'react-redux';
import { deleteComponent, moveComponent } from '@store/previewTree/previewTreeSlice';
import PreviewDroppable from '@components/Preview/PreviewDroppable';
import Icon from '@components/Decorators/Icon';

interface PreviewComponentWrapperProps {
    children: React.ReactNode | React.ReactNode[];
    index: number;
    editable?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

const PreviewComponentWrapper: React.FunctionComponent<PreviewComponentWrapperProps> = (props) => {
    const dispatch = useDispatch();

    const handleDeleteElementClick = (index: number | string) => {
        return () => {
            dispatch(
                deleteComponent({
                    index: +index
                })
            );
        };
    };

    const handleMoveElementClick = (index: number | string, direction: 'up' | 'down') => {
        return () => {
            console.log(window.screenX);
            dispatch(
                moveComponent({
                    currentIndex: +index,
                    newIndex: direction === 'up' ? +index - 1 : +index + 1
                })
            );
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
                }`}
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
    container: 'flex flex-col items-center justify-center group',
    containerEditable: 'hover:border-blue-500 hover:border p-1 relative',
    actionIcons:
        'flex items-center justify-center gap-2 absolute -right-3 -top-1/4 invisible group-hover:visible'
};

export default PreviewComponentWrapper;
