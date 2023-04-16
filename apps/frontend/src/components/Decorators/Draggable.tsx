import boxImage from '@/assets/icons/box.png';
import { useMitt } from '@/components/Decorators/MittProvider';

interface DraggableProps {
    children: React.ReactElement;
    type: string;
}

const Draggable: React.FunctionComponent<DraggableProps> = (props) => {
    const emitter = useMitt();

    const dragImage = new Image();
    dragImage.src = boxImage;

    const handleDragStart = (event: React.DragEvent) => {
        emitter.emit('dragStartEvent');

        document.body.style.cursor = 'grabbing';

        if (props.children) {
            event.dataTransfer.setData(
                props.type,
                props.children.key ? props.children.key.toString() : ''
            );

            event.dataTransfer.setDragImage(
                dragImage,
                32,
                16
            );
        }
    };

    const handleDragEnd = () => {
        emitter.emit('dragEndEvent');

        // Set cursor style back to default after the drag movement
        document.body.style.cursor = 'default';
    };
    return (
        <div
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="w-full h-full">
            {props.children}
        </div>
    );
};

export default Draggable;
