import { Icon } from '@components/Decorators';

interface SideBarSearchBarProps {
    placeholder?: string;
    query: string;
    setQuery: (query: string) => void;
}

const SearchBar: React.FunctionComponent<SideBarSearchBarProps> = (props) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setQuery(event.target.value);
    };

    const clearInput = () => {
        props.setQuery('');
    };

    return (
        <div className={styleClasses.container}>
            <input
                className={styleClasses.searchBarInput}
                type={'text'}
                placeholder={props.placeholder}
                value={props.query}
                onChange={handleSearchChange}
            />
            {props.query.length > 0 ? (
                <Icon
                    name={'cross-mark'}
                    className={'text-gray-600 w-6 h-6'}
                    onClick={clearInput}
                />
            ) : (
                <Icon name={'search'} className={'text-gray-600 w-6 h-6'} />
            )}
        </div>
    );
};

const styleClasses = {
    container:
        'flex items-center justify-start gap-2 w-11/12 h-12 mx-auto my-4 p-2 bg-white rounded-md',
    searchBarInput: 'w-full h-full px-2 focus:outline-none active:outline-none'
};

export default SearchBar;
