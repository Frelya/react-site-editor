import { renderToString } from 'react-dom/server';
import { innerContentOfHtmlDiv } from '@react-site-editor/functions';

interface DraggableProps {
    children: React.ReactNode;
    type: string;
}

const Draggable: React.FunctionComponent<DraggableProps> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData(
            props.type,
            innerContentOfHtmlDiv(
                renderToString(props.children as React.ReactElement)
            )
        );
    };

    return (
        <div draggable="true" onDragStart={handleDragStart}>
            {props.children}
        </div>
    );
};

export default Draggable;
