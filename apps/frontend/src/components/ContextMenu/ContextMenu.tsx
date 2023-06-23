import { ContextMenuAction } from '@/types/contextMenu';
import ContextMenuItem from './ContextMenuItem';

interface ContextMenuProps {
    top: number;
    left: number;
    actions: ContextMenuAction[];
}
const ContextMenu: React.FunctionComponent<ContextMenuProps> = (props) => {
    return (
        <div
            className={styleClasses.container}
            style={{
                // top: `${props.top} px`,
                // left: `${props.top} px`
                top: props.top + 'px',
                left: props.left + 'px'
            }}>
            {props.actions.map((action, i) => {
                return <ContextMenuItem action={action} key={i} />;
            })}
        </div>
    );
};

const styleClasses = {
    container:
        'fixed bg-black bg-opacity-70 flex flex-col backdrop-blur-lg rounded-lg py-4 text-white z-50'
};

export default ContextMenu;
