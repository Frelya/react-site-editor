import ComponentsListStyle from './ComponentsList.module.css';
import type { PredefinedComponent } from '@react-site-editor/types';
import Draggable from '@components/Decorators/Draggable';
import ComponentWrapper from '@components/ComponentWrapper/ComponentWrapper';

interface ComponentsListProps {
    elements: Record<string, PredefinedComponent>;
    onClick: (name: string) => void;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    const handleClick = (name: string) => {
        props.onClick(name);
    };
    return (
        <ul className={ComponentsListStyle.componentsList}>
            {Object.entries(props.elements).map(([componentName, component], index) => {
                return (
                    <li
                        className={ComponentsListStyle.componentsListItem}
                        key={index}
                        onClick={() => handleClick(componentName)}>
                        <Draggable type="component">
                            <ComponentWrapper>
                                {component.caller(component.defaultProps)}
                            </ComponentWrapper>
                        </Draggable>
                    </li>
                );
            })}
        </ul>
    );
};

export default ComponentsList;
