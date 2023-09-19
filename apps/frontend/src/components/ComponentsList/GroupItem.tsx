import { pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentInfos } from '@react-site-editor/types';
import type { IconName } from '@/types';
import { Icon, Draggable } from '@components/Decorators';

interface ComponentsListItemProps {
    element: ComponentInfos;
}

const GroupItem: React.FunctionComponent<ComponentsListItemProps> = (props) => {
    const itemName = pascalToSpaced(props.element.name);

    return (
        <Draggable type="component" target={props.element.name}>
            <div className={styleClasses.container} title={itemName}>
                <div className={styleClasses.iconDiv}>
                    <Icon
                        className={styleClasses.icon}
                        name={props.element.specs.iconName as IconName}
                    />
                </div>
                <p className={styleClasses.text}>{itemName}</p>
            </div>
        </Draggable>
    );
};

const styleClasses = {
    container:
        'flex flex-col justify-evenly items-center gap-2 w-24 aspect-square m-1 p-2 border border-gray-300 hover:border-blue-300 bg-[#fafafa]',
    iconDiv: 'flex justify-center items-center w-1/2 aspect-square text-gray-500',
    icon: 'w-1/2',
    text: 'w-full text-center whitespace-nowrap overflow-hidden text-ellipsis'
};

export default GroupItem;
