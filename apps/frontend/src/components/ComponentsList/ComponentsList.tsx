import { useState } from 'react';
import { pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentInfos } from '@react-site-editor/types';
import Draggable from '@components/Decorators/Draggable';
import Icon from '@components/Decorators/Icon';
import ComponentsListItem from '@components/ComponentsList/ComponentsListItem';

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
                className={`${styleClasses.groupComponentsList} ${
                    groupProps.visible
                        ? styleClasses.groupComponentsListVisible
                        : styleClasses.groupComponentsListInvisible
                }`}>
                {elementsByGroup[groupProps.group].map((element, ElementIndex) => {
                    return (
                        <li className={styleClasses.groupComponentsListItem} key={ElementIndex}>
                            <Element element={element} />
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <ul className={styleClasses.groupsList}>
            {groups.map((group, groupIndex) => {
                const [visibility, setVisibility] = useState(false);

                const toggleVisibility = () => {
                    setVisibility(!visibility);
                };

                return (
                    <li className={styleClasses.groupsListItem} key={groupIndex}>
                        <div
                            className={styleClasses.groupsListItemTitle}
                            onClick={toggleVisibility}>
                            <Icon
                                name={'chevron-left'}
                                className={`${styleClasses.groupsListItemTitleIcon} ${
                                    visibility
                                        ? styleClasses.groupsListItemTitleIconRight
                                        : styleClasses.groupsListItemTitleIconDown
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

const styleClasses = {
    groupsList: 'flex flex-col items-center justify-start gap-y-8 w-full list-none',
    groupsListItem: 'cursor-pointer w-full h-fit',
    groupsListItemTitle:
        'relative text-center w-11/12 font-bold border-2 border-gray-300 p-2.5 mx-auto shadow-md',
    groupsListItemTitleIcon: 'w-6 h-6 absolute left-2 transition-all duration-500',
    groupsListItemTitleIconDown: '-rotate-90',
    groupsListItemTitleIconRight: '-rotate-180',
    groupComponentsList:
        'w-11/12 mx-auto py-5 items-start justify-start gap-[4%] list-none transition-all duration-1000',
    groupComponentsListVisible: 'flex',
    groupComponentsListInvisible: 'hidden',
    groupComponentsListItem: 'cursor-pointer w-[22%] !aspect-square'
};

export default ComponentsList;
