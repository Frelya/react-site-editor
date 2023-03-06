import { useMitt } from '@/plugins/mitt/react-mitt';

interface DraggableProps {
    children: React.ReactElement;
    type: string;
}

const Draggable: React.FunctionComponent<DraggableProps> = (props) => {
    const emitter = useMitt();

    const handleDragStart = (event: React.DragEvent) => {
        emitter.emit('dragEvent');

        // Set cursor to "grab"
        // document.body.style.cursor = 'grabbing';
        if (props.children)
            event.dataTransfer.setData(
                props.type,
                props.children.key ? props.children.key.toString() : ''
            );
    };

    const handleDragEnd = () => {
        // Set cursor style back to default after the drag movement
        document.body.style.cursor = 'default';
    };
    return (
        <div draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {props.children}
        </div>
    );
};

export default Draggable;
