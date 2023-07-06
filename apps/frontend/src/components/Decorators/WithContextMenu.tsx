import type { ContextMenuAction } from '@/types';
import { useContextMenu } from '@/hooks';
import { ContextMenu } from '@components/Common';

// TODO Renames the component
interface WithContextMenuProps {
    children: React.ReactNode | React.ReactNode[];
    actions: ContextMenuAction[];
    className: string;
}

const WithContextMenu: React.FunctionComponent<WithContextMenuProps> = (props) => {
    // destructure our state and set state functions from our custom hook
    const [clicked, setClicked, coords, setCoords] = useContextMenu();

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        // set our click state to true when a user right clicks
        setClicked(true);
        // set the x and y coordinates of our users right click
        setCoords({ x: event.pageX, y: event.pageY });
    };

    return (
        <div className={props.className} onContextMenu={handleContextMenu}>
            {props.children}
            {clicked && <ContextMenu actions={props.actions} top={coords.y} left={coords.x} />}
        </div>
    );
};

export default WithContextMenu;
