import { useState } from 'react';
import { pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentInfos } from '@react-site-editor/types';
import Icon from '@components/Decorators/Icon';
import Draggable from '@components/Decorators/Draggable';
import ComponentsListItem from '@components/ComponentsList/ComponentsListItem';

interface ComponentsListGroupsProps {
    elements: ComponentInfos[];
    filter: string;
}

const ComponentsListGroups: React.FunctionComponent<ComponentsListGroupsProps> = (props) => {
    const filteredComponents = props.elements.filter((component) => {
        return (
            component.name.toLowerCase().includes(props.filter.toLowerCase()) ||
            component.group.toLowerCase().includes(props.filter.toLowerCase())
        );
    });

    const groups = [...new Set(filteredComponents.map((element) => element.group))];

    const elementsByGroup: Record<string, ComponentInfos[]> = {};

    filteredComponents.forEach((element) => {
        if (!elementsByGroup[element.group]) {
            elementsByGroup[element.group] = [];
        }

        elementsByGroup[element.group].push(element);
    });

    const Group: React.FunctionComponent<{ group: string }> = (groupProps) => {
        const [isVisible, setIsVisible] = useState(false);

        const toggleVisibility = () => {
            setIsVisible(!isVisible);
        };

        return (
            <li className={styleClasses.groupsListItem}>
                <div className={styleClasses.groupsListItemTitle} onClick={toggleVisibility}>
                    <Icon
                        name={'chevron-left'}
                        className={`${styleClasses.groupsListItemTitleIcon} ${
                            isVisible
                                ? styleClasses.groupsListItemTitleIconDown
                                : styleClasses.groupsListItemTitleIconRight
                        }`}
                        description={
                            elementsByGroup[groupProps.group].length +
                            ' component' +
                            (elementsByGroup[groupProps.group].length > 1 ? 's' : '')
                        }
                    />
                    <h3>{groupProps.group}</h3>
                </div>
                <ul
                    className={`${styleClasses.groupComponentsList} ${
                        isVisible
                            ? styleClasses.groupComponentsListVisible
                            : styleClasses.groupComponentsListInvisible
                    }`}>
                    {elementsByGroup[groupProps.group].map((element, elementIndex) => {
                        return (
                            <li className={styleClasses.groupComponentsListItem} key={elementIndex}>
                                <Draggable type="component" target={element.name}>
                                    <ComponentsListItem
                                        key={element.name}
                                        text={pascalToSpaced(element.name)}
                                        iconName={element.specs.iconName}
                                    />
                                </Draggable>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    };

    return (
        <ul className={styleClasses.groupsList}>
            {groups.map((group, groupIndex) => {
                return <Group group={group} key={groupIndex} />;
            })}
        </ul>
    );
};

const styleClasses = {
    groupsList: 'flex flex-col items-center justify-start gap-y-8 w-full list-none',
    groupsListItem: 'cursor-pointer w-full h-fit',
    groupsListItemTitle:
        'relative text-center w-11/12 font-bold border-2 border-gray-300 p-2.5 mx-auto shadow-md',
    groupsListItemTitleIcon: 'w-6 h-6 absolute left-2 transition-all duration-300',
    groupsListItemTitleIconDown: '-rotate-90',
    groupsListItemTitleIconRight: '-rotate-180',
    groupComponentsList:
        'w-11/12 mx-auto py-5 items-start justify-start gap-[4%] list-none transition-all duration-1000',
    groupComponentsListVisible: 'flex',
    groupComponentsListInvisible: 'hidden',
    groupComponentsListItem: 'cursor-pointer w-[22%] !aspect-square'
};

export default ComponentsListGroups;
