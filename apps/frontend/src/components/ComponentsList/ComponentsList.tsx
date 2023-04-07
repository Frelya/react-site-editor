import { useState } from 'react';
import { pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentInfos } from '@react-site-editor/types';
import Draggable from '@components/Decorators/Draggable';
import ComponentsListItem from '@components/ComponentsListItem/ComponentsListItem';
import ComponentsListStyle from './ComponentsList.module.css';
import Icon from '@components/Decorators/Icon';

interface ComponentsListProps {
    elements: ComponentInfos[];
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    const groups: string[] = [...new Set(props.elements.map((element) => element.group))];

    const elementsByGroup: Record<string, ComponentInfos[]> = {};

    props.elements.forEach((element) => {
        if (!elementsByGroup[element.group]) {
            elementsByGroup[element.group] = [];
        }

        elementsByGroup[element.group].push(element);
    });

    interface ElementProps {
        element: ComponentInfos;
    }

    const Element: React.FunctionComponent<ElementProps> = (elementProps) => {
        return (
            <Draggable type="component">
                <ComponentsListItem
                    key={JSON.stringify(elementProps.element)}
                    text={pascalToSpaced(elementProps.element.name)}
                    iconName={elementProps.element.defaultProps.iconName}
                />
            </Draggable>
        );
    };

    interface GroupProps {
        group: string;
        visible: boolean;
    }

    const Group: React.FunctionComponent<GroupProps> = (groupProps) => {
        return (
            <ul
                className={`${ComponentsListStyle.groupComponentsList} ${
                    groupProps.visible
                        ? ComponentsListStyle.groupComponentsListVisible
                        : ComponentsListStyle.groupComponentsListInvisible
                }`}>
                {elementsByGroup[groupProps.group].map((element, ElementIndex) => {
                    return (
                        <li className={ComponentsListStyle.componentsListItem} key={ElementIndex}>
                            <Element element={element} />
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <ul className={ComponentsListStyle.groupsList}>
            {groups.map((group, groupIndex) => {
                const [visibility, setVisibility] = useState(false);

                const toggleVisibility = () => {
                    setVisibility(!visibility);
                };

                return (
                    <li className={ComponentsListStyle.groupsListItem} key={groupIndex}>
                        <div
                            className={ComponentsListStyle.groupsListItemTitle}
                            onClick={toggleVisibility}>
                            <Icon
                                name={'chevron-left'}
                                className={`${ComponentsListStyle.groupsListItemTitleIcon} ${
                                    visibility
                                        ? ComponentsListStyle.groupsListItemTitleIconRight
                                        : ComponentsListStyle.groupsListItemTitleIconDown
                                }`}
                                description={
                                    elementsByGroup[group].length +
                                    ' component' +
                                    (elementsByGroup[group].length > 1 ? 's' : '')
                                }
                            />
                            <h3>{group}</h3>
                        </div>
                        <Group group={group} visible={visibility} />
                    </li>
                );
            })}
        </ul>
    );
};

export default ComponentsList;
