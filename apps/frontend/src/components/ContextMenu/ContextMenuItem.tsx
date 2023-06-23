import { ContextMenuAction } from '@/types/contextMenu';
import Icon from '../Decorators/Icon';

interface ContextMenuItemProps {
    action: ContextMenuAction;
}
const ContextMenuItem: React.FunctionComponent<ContextMenuItemProps> = (props) => {
    const handleClick = () => {
        props.action.action();
    };
    return (
        <div onClick={handleClick} className={styleClasses.container}>
            {props.action.icon && <Icon name={props.action.icon} />} {props.action.label}
        </div>
    );
};

const styleClasses = {
    container: 'py-2 px-4 border-y border-functional-grey flex gap-4 min-w-[200px] cursor-pointer'
};

export default ContextMenuItem;
