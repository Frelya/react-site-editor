import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComponent } from '@/store/previewTree/previewTreeSlice';
import Droppable from '@components/Decorators/Droppable';
import Icon from '@components/Decorators/Icon';
import PreviewComponentWrapperStyle from './PreviewComponentWrapper.module.css';

interface PreviewComponentWrapperProps {
    // TODO: Adapt to display component name only
    children?: React.ReactNode | React.ReactNode[];
    index: number;
}

const PreviewComponentWrapper: React.FunctionComponent<PreviewComponentWrapperProps> = (props) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleDrop = (event: React.DragEvent) => {
        const component = JSON.parse(event.dataTransfer.getData('component'));
        console.log(component);

        dispatch(
            addComponent({
                id: component.name,
                props: component.defaultProps
            })
        );
        setIsHovered(false);
    };

    const handleDragEnter = () => {
        setIsHovered(true);
    };

    const handleDragLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <Droppable
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                type="component">
                <div
                    className={`${PreviewComponentWrapperStyle.droppable} ${
                        isHovered ? 'p-4' : 'p-0.5'
                    }`}></div>
            </Droppable>
            <div className={PreviewComponentWrapperStyle.container}>
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
