import type { ComponentInfos } from '@react-site-editor/types';
import ComponentsListStyle from './ComponentsList.module.css';
import Draggable from '@components/Decorators/Draggable';
import ComponentWrapper from '@components/ComponentWrapper/ComponentWrapper';

interface ComponentsListProps {
    elements: ComponentInfos[];
    onElementClick: (comp: ComponentInfos) => void;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    const handleClick = (comp: ComponentInfos) => {
        props.onElementClick(comp);
    };
    return (
        <ul className={ComponentsListStyle.componentsList}>
            {Object.values(props.elements).map((component, index) => {
                return (
                    <li
                        className={ComponentsListStyle.componentsListItem}
                        key={index}
                        onClick={() => handleClick(component)}>
                        <Draggable type="component">
                            <ComponentWrapper key={JSON.stringify(component)} text={component.name} />
                        </Draggable>
                    </li>
                );
            })}
        </ul>
    );
};

export default ComponentsList;
