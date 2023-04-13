import { useMitt } from '@/components/Decorators/MittProvider';

interface DraggableProps {
    children: React.ReactElement;
    type: string;
}

const Draggable: React.FunctionComponent<DraggableProps> = (props) => {
    const emitter = useMitt('main');

    const handleDragStart = (event: React.DragEvent) => {
        emitter.emit('dragStartEvent');
        console.log('handleDragStart');

        // Set cursor to "grab"
        document.body.style.cursor = 'grabbing';
        if (props.children)
            event.dataTransfer.setData(
                props.type,
                props.children.key ? props.children.key.toString() : ''
            );
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
