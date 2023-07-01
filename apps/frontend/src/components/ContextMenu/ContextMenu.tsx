import type { ContextMenuAction } from '@/types';
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
                top: props.top + 'px',
                left: props.left + 'px'
            }}>
            {props.actions.map((action, index) => {
                return <ContextMenuItem action={action} key={index} />;
            })}
        </div>
    );
};

const styleClasses = {
    container:
        'fixed bg-black bg-opacity-70 flex flex-col backdrop-blur-lg rounded-lg py-4 text-white z-50'
};

export default ContextMenu;
