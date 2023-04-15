import type { IconName } from '@/libs/types/icons.type';
import type { UiIconName } from '@react-site-editor/types';
import Icon from '@/components/Decorators/Icon';

interface ComponentsListItemProps {
    text: string;
    iconName: UiIconName;
}

const ComponentsListItem: React.FunctionComponent<ComponentsListItemProps> = (props) => {
    return (
        <div className={styleClasses.container}>
            <div className={styleClasses.iconDiv}>
                <Icon className={styleClasses.icon} name={props.iconName as IconName} />
            </div>
            <p className={styleClasses.text}>{props.text}</p>
        </div>
    );
};

const styleClasses = {
    container:
        'flex flex-col justify-evenly items-center gap-2 w-full p-2 aspect-square border border-gray-300 hover:border-blue-300 bg-[#fafafa]',
    iconDiv: 'flex justify-center items-center w-1/2 aspect-square text-gray-500',
    icon: 'w-1/2',
    text: 'w-full h-fit text-center max-w-full break-words'
};

export default ComponentsListItem;
