import { selectPreviewTree, updateTree } from '@/store/previewTree/previewTreeSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReOrdererItem from './ReOrdererItem';
import Icon from '../Decorators/Icon';
import { useEffect, useState } from 'react';
import type { ItemInterface, Sortable, SortableOptions } from 'react-sortablejs';
import { ReactSortable } from 'react-sortablejs';

const ReOrderer: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const previewTree = useSelector(selectPreviewTree);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [mockPreviewTree, setMockPreviewTree] = useState<ItemInterface[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
    };
    const handleSort = (newOrder: ItemInterface[]) => {
        // newOrder contains only name of component
        // so let's map it with previewTree

        const updatedPreviewTree = newOrder.map((el) => {
            const [name, id] = String(el.id).split('-');
            console.log('onSort', name, id);

            // Prefers filter to find to avoid undefined value
            return previewTree.filter((item, index) => String(index) == id)[0];
        });
        dispatch(updateTree(updatedPreviewTree));
    };

    const handleChange = (evt: Sortable.SortableEvent) => {
        console.log(evt);
    };

    useEffect(() => {
        return () => {
            console.log('previewTree========>', previewTree);

            setMockPreviewTree(
                previewTree.map((el, index) => {
                    return { id: `${el.name}-${index}` };
                })
            );
            console.log('mockPreviewTree========>', mockPreviewTree);
        };
    }, [previewTree]);
    return (
        <div className={styleClasses.container}>
            <div className={styleClasses.searchBar}>
                <input
                    className={styleClasses.searchBarInput}
                    type={'text'}
                    placeholder={'Search layers'}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Icon name={'search'} className={'text-gray-600'} />
            </div>
            {/* <p className={styleClasses.componentsListTitle}>
                {searchQuery.length > 0
                    ? `Search results for "${searchQuery}"`
                    : 'Available components'}
            </p> */}
            {mockPreviewTree && (
                <ReactSortable list={mockPreviewTree} setList={handleSort} {...sortableOptions}>
                    {previewTree.map((el, i) => {
                        return <ReOrdererItem key={i} name={el.name} />;
                    })}
                </ReactSortable>
            )}
        </div>
    );
};

const styleClasses = {
    container: 'h-full flex flex-col justify-start',
    searchBar:
        'flex items-center justify-start gap-2 w-11/12 h-12 mx-auto my-4 p-2 bg-white rounded-md',
    searchBarInput: 'w-full h-full px-2 ' + 'focus:outline-none active:outline-none',
    chosenClass: 'bg-functional-grey'
};
const sortableOptions: SortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
    group: 'shared',
    chosenClass: styleClasses.chosenClass,
    forceFallback: true,
    handle: '.draggable'
};

export default ReOrderer;
