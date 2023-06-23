import { useState } from 'react';
import type { ComponentInfos } from '@react-site-editor/types';
import Icon from '@components/Decorators/Icon';
import ComponentsListGroups from '@components/ComponentsList/ComponentsListGroups';

interface ComponentsListProps {
    elements: ComponentInfos[];
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = (props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    return (
        <div className={styleClasses.container}>
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
        </div>
    );
};

const styleClasses = {
    container: 'h-full flex flex-col items-center justify-start',
    searchBar:
        'flex items-center justify-start gap-2 w-11/12 h-12 mx-auto my-4 p-2 bg-white rounded-md',
    searchBarInput: 'w-full h-full px-2 ' + 'focus:outline-none active:outline-none',
    componentsListTitle: 'w-11/12 mx-auto my-4 px-2'
};

export default ComponentsList;
