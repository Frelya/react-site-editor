import type { ComponentInfos } from '@react-site-editor/types';
import GroupsList from './GroupsList';

interface ComponentsListProps {
    elements: ComponentInfos[];
    searchQuery: string;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    return (
        <div className={styleClasses.container}>
            <GroupsList elements={props.elements} filter={props.searchQuery} />
        </div>
    );
};

const styleClasses = {
    container: 'h-full flex flex-col items-center justify-start'
};

export default ComponentsList;
