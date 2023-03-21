import PreviewDroppable from '@components/Preview/PreviewDroppable/PreviewDroppable';
import Icon from '@components/Decorators/Icon';
import PreviewComponentWrapperStyle from './PreviewComponentWrapper.module.css';
import { useDispatch } from 'react-redux';
import { deleteComponent } from '@/store/previewTree/previewTreeSlice';

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
            <div
                className={PreviewComponentWrapperStyle.container + ' group'}
                onClick={props.onClick}>
                {/* <div className="absolute right-0 top-3/4 invisible group-hover:visible">
                    <Icon
                        name="add-circle-line"
                        className=" rounded-full text-white fill-none bg-blue-500"
                        description="Add component after"
                    />
                </div> */}
                {/*
                    I have to stop bubble propagation,
                    That's why I don't use the onClick props of `Icon` 
                */}
                <div
                    onClickCapture={(evt) => {
                        evt.stopPropagation();
                        handleDeleteElementClick(props.index);
                    }}
                    className="absolute -right-3 -top-1/4 invisible group-hover:visible">
                    <Icon
                        name="minus"
                        className=" rounded-full text-white fill-none bg-blue-500"
                        description="Delete component"
                    />
                </div>

                {props.children}
            </div>
        </>
    );
};

export default PreviewComponentWrapper;
