import { useState } from 'react';
import type { ComponentInfos } from '@react-site-editor/types';
import SideBarSearchBar from '@components/SideBar/SideBarSearchBar';
import SideBarTabTitle from '@components/SideBar/SideBarTabTitle';
import ComponentsListGroups from '@components/ComponentsList/ComponentsListGroups';
import Contextable from '../Decorators/Contexable';
import { ContextMenuAction } from '@/types/contextMenu';

interface ComponentsListProps {
    elements: ComponentInfos[];
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const actions: ContextMenuAction[] = [
        {
            label: 'SideBarAction A',
            action: () => {
                console.log('SideBarAction A');
            }
        },
        {
            label: 'SideBarAction B',
            action: () => {
                console.log('SideBarAction B');
            }
        },
        {
            label: 'SideBarAction C',
            action: () => {
                console.log('SideBarAction C');
            }
        }
    ];
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    return (
        <Contextable actions={actions} className={styleClasses.container}>
            <>
                <div className={styleClasses.searchBar}>
                    <input
                        className={styleClasses.searchBarInput}
                        type={'text'}
                        placeholder={'Search components'}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Icon name={'search'} className={'text-gray-600'} />
                </div>
                <p className={styleClasses.componentsListTitle}>
                    {searchQuery.length > 0
                        ? `Search results for "${searchQuery}"`
                        : 'Available components'}
                </p>
                <ComponentsListGroups elements={props.elements} filter={searchQuery} />
            </>
        </Contextable>
    );
};

const styleClasses = {
    container: 'h-full flex flex-col items-center justify-start',
    componentsListTitle: 'w-11/12 mx-auto my-4 px-2'
};

export default ComponentsList;
