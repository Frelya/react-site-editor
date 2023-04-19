import { useDispatch } from 'react-redux';
import { deleteComponent } from '@/store/previewTree/previewTreeSlice';
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
        dispatch(
            deleteComponent({
                index: +index
            })
        );
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
                    <div
                        onClickCapture={(evt) => {
                            /*
                             The bubble propagation have to be stopped.
                             Otherwise, the onClick event of the parent element will be triggered.
                             */
                            evt.stopPropagation();
                            handleDeleteElementClick(props.index);
                        }}
                        className="absolute -right-3 -top-1/4 h-6 w-6 invisible group-hover:visible">
                        <Icon
                            name="minus"
                            className="rounded-full bg-red-500 text-white"
                            description="Delete component"
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
    containerEditable: 'hover:border-blue-500 hover:border p-1 relative'
};

export default PreviewComponentWrapper;
