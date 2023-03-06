import type { ComponentInfos } from '@react-site-editor/types';
import ComponentsListStyle from './ComponentsList.module.css';
import Draggable from '@components/Decorators/Draggable';
import ComponentsListItem from '@components/ComponentsListItem/ComponentsListItem';

interface ComponentsListProps {
    elements: ComponentInfos[];
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    return (
        <ul className={ComponentsListStyle.componentsList}>
            {Object.values(props.elements).map((component, index) => {
                return (
                    <li className={ComponentsListStyle.componentsListItem} key={index}>
                        <Draggable type="component">
                            <ComponentsListItem
                                key={JSON.stringify(component)}
                                text={component.name}
                            />
                        </Draggable>
                    </li>
                );
            })}
        </ul>
    );
};

export default ComponentsList;
