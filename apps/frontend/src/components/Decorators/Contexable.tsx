import { useContextMenu } from '@/hooks/useContextMenu';
import { ContextMenuAction } from '@/types/contextMenu';
import { MouseEvent } from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';

// TODO Renames the component
interface ContextMenuProps {
    children: React.ReactElement;
    actions: ContextMenuAction[];
    className: string;
}
const Contextable: React.FunctionComponent<ContextMenuProps> = (props) => {
    // destructure our state and set state functions from our custom hook
    const { clicked, setClicked, coords, setCoords } = useContextMenu();
    function onContextMenu(evt: MouseEvent<HTMLDivElement>) {
        evt.preventDefault();

        // set our click state to true when a user right clicks
        setClicked(true);

        // set the x and y coordinates of our users right click
        setCoords({ x: evt.pageX, y: evt.pageY });
    }

    return (
        <div className={props.className} onContextMenu={(e) => onContextMenu(e)}>
            {props.children}
            {clicked && <ContextMenu actions={props.actions} top={coords.y} left={coords.x} />}
        </div>
    );
};

export default Contextable;
