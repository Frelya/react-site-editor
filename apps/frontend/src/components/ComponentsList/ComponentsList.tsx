import { useState } from 'react';
import type { ComponentInfos } from '@react-site-editor/types';
import SideBarSearchBar from '@components/SideBar/SideBarSearchBar';
import SideBarTabTitle from '@components/SideBar/SideBarTabTitle';
import ComponentsListGroups from './ComponentsListGroups';

interface ComponentsListProps {
    elements: ComponentInfos[];
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className={styleClasses.container}>
            <SideBarSearchBar
                placeholder={'Search components'}
                query={searchQuery}
                setQuery={setSearchQuery}
            />
            <SideBarTabTitle
                title={
                    searchQuery.length > 0
                        ? `Search results for "${searchQuery}"`
                        : 'Available components'
                }
            />
            <ComponentsListGroups elements={props.elements} filter={searchQuery} />
        </div>
    );
};

const styleClasses = {
    container: 'h-full flex flex-col items-center justify-start',
    componentsListTitle: 'w-11/12 mx-auto my-4 px-2'
};

export default ComponentsList;
