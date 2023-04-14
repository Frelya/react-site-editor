import { useDispatch } from 'react-redux';
import { deleteComponent } from '@/store/previewTree/previewTreeSlice';
import PreviewDroppable from '@components/Preview/PreviewDroppable';
import Icon from '@components/Decorators/Icon';

interface PreviewComponentWrapperProps {
    children: React.ReactNode | React.ReactNode[];
    index: number;
    onClick: (e: React.MouseEvent) => void;
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

    return (
        <>
            <PreviewDroppable index={props.index} key={props.index} />
            <div className={styleClasses.container + ' group'} onClick={props.onClick}>
                {/*
                    I have to stop bubble propagation,
                    That's why I don't use the onClick props of `Icon` 
                */}
                <div
                    onClickCapture={(evt) => {
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

                {props.children}
            </div>
        </>
    );
};

const styleClasses = {
    container:
        'flex flex-col items-stretch text-center hover:border-blue-500 hover:border p-1 justify-between relative'
};

export default PreviewComponentWrapper;