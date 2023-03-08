// import { useMitt } from '@/plugins/mitt/react-mitt';
import { mitt } from '@/plugins/mitt';
import { addComponent } from '@/store/previewTree/previewTreeSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Droppable from '../Decorators/Droppable';
import Icon from '../Decorators/Icon';
import PreviewComponentWrapperStyle from './PreviewComponentWrapper.module.css';

interface PreviewComponentWrapperProps {
    // TODO: Adapt to display component name only
    children?: React.ReactNode | React.ReactNode[];
    index: number;
}

const PreviewComponentWrapper: React.FunctionComponent<PreviewComponentWrapperProps> = (props) => {
    const emitter = mitt();
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isDraggabled, setIsDraggabled] = useState<boolean>(true);

    useEffect(() => {
        emitter.on('dragEvent', () => {
            setIsDraggabled(true);
            console.log('dede');
        });
        console.log(emitter);
    }, []);

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
                    } ${isDraggabled ? 'visible' : 'invisible'}`}></div>
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
