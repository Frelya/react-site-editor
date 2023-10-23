import { Input } from '@nextui-org/react';

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
            <Input
                color="default"
                fullWidth={false}
                radius="sm"
                placeholder={props.placeholder}
                value={props.query}
                onChange={handleSearchChange}
                onClear={clearInput}
            />
        </div>
    );
};

const styleClasses = {
    container: 'flex items-center justify-start gap-2 w-11/12 h-12 mx-auto my-4 p-2'
};

export default SearchBar;
