import type { IconName } from '@/libs/types/icons.type';
import type { UiIconName } from '@react-site-editor/types';
import Icon from '@/components/Decorators/Icon';
import ComponentsListItemStyle from './ComponentsListItem.module.css';

interface ComponentsListItemProps {
    text: string;
    iconName: UiIconName;
}

const ComponentsListItem: React.FunctionComponent<ComponentsListItemProps> = (props) => {
    return (
        <div className={ComponentsListItemStyle.container}>
            <div className={ComponentsListItemStyle.iconBox}>
                <Icon
                    className={ComponentsListItemStyle.icon}
                    name={props.iconName as IconName}
                />
            </div>
            <p className={ComponentsListItemStyle.text}>{props.text}</p>
        </div>
    );
};

export default ComponentsListItem;
