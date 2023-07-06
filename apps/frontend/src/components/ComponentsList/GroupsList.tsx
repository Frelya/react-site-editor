import type { ComponentInfos } from '@react-site-editor/types';
import Group from './Group';

interface ComponentsListGroupsProps {
    elements: ComponentInfos[];
    filter: string;
}

const GroupsList: React.FunctionComponent<ComponentsListGroupsProps> = (props) => {
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

    return (
        <ul className={styleClasses.container}>
            {groups.length > 0 ? (
                groups.map((name) => {
                    return <Group key={name} label={name} group={elementsByGroup[name]} />;
                })
            ) : (
                <div className={styleClasses.emptyList}>No components found</div>
            )}
        </ul>
    );
};

const styleClasses = {
    container: 'flex flex-col items-center justify-start gap-y-8 w-full list-none',
    emptyList: 'text-center text-functional-grey my-10'
};

export default GroupsList;
