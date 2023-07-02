import { pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentInfos } from '@react-site-editor/types';
import type { IconName } from '@/types';
import { Icon, Draggable } from '@components/Decorators';

interface ComponentsListItemProps {
    element: ComponentInfos;
}

const GroupItem: React.FunctionComponent<ComponentsListItemProps> = (props) => {
    return (
        <Draggable type="component" target={props.element.name}>
            <div className={styleClasses.container}>
                <div className={styleClasses.iconDiv}>
                    <Icon
                        className={styleClasses.icon}
                        name={props.element.specs.iconName as IconName}
                    />
                </div>
                <p className={styleClasses.text}>{pascalToSpaced(props.element.name)}</p>
            </div>
        </Draggable>
    );
};

const styleClasses = {
    container:
        'flex flex-col justify-evenly items-center gap-2 w-full p-2 aspect-square border border-gray-300 hover:border-blue-300 bg-[#fafafa]',
    iconDiv: 'flex justify-center items-center w-1/2 aspect-square text-gray-500',
    icon: 'w-1/2',
    text: 'w-full h-fit text-center max-w-full break-words'
};

export default GroupItem;
