import ComponentsListStyle from './ComponentsList.module.css';
import type { Component } from '@react-site-editor/types';
import Draggable from '@components/Decorators/Draggable';
import ComponentWrapper from '@components/ComponentWrapper/ComponentWrapper';

interface ComponentsListProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements: Record<string, Component<any>>;
    onClick: (name: string) => void;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (
    props
) => {
    const handleClick = (name: string) => {
        props.onClick(name);
    };
    return (
        <ul className={ComponentsListStyle.componentsList}>
            {Object.entries(props.elements).map(
                ([componentName, component], index) => {
                    return (
                        <li
                            className={ComponentsListStyle.componentsListItem}
                            key={index}
                            onClick={() => handleClick(componentName)}>
                            <Draggable type="component">
                                <ComponentWrapper
                                    key={JSON.stringify(component)}>
                                    {component.caller(component.defaultProps)}
                                </ComponentWrapper>
                            </Draggable>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

export default ComponentsList;
