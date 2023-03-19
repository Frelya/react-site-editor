import PreviewDroppable from '@components/Preview/PreviewDroppable/PreviewDroppable';
import Icon from '@components/Decorators/Icon';
import PreviewComponentWrapperStyle from './PreviewComponentWrapper.module.css';

interface PreviewComponentWrapperProps {
    children: React.ReactNode | React.ReactNode[];
    index: number;
    onClick: (e: React.MouseEvent) => void;
}

const PreviewComponentWrapper: React.FunctionComponent<PreviewComponentWrapperProps> = (props) => {
    return (
        <>
            <PreviewDroppable index={props.index} key={props.index} />
            <div className={PreviewComponentWrapperStyle.container} onClick={props.onClick}>
                <div className="absolute right-0 top-3/4 invisible hover:visible">
                    <Icon
                        name="add-circle-line"
                        className=" rounded-full text-white fill-none bg-blue-500"
                        description="Add component after"
                    />
                </div>

                {props.children}
            </div>
        </>
    );
};

export default PreviewComponentWrapper;
