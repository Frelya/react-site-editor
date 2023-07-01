import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import type { ItemInterface, SortableOptions } from 'react-sortablejs';
import { selectPreviewTree, updateTree } from '@store/previewTree/previewTreeSlice';
import type { ContextMenuAction } from '@/types';
import { useMitt } from '@components/Decorators/MittProvider';
import Contextable from '@components/Decorators/Contexable';
import SideBarSearchBar from '@components/SideBar/SideBarSearchBar';
import SideBarTabTitle from '@components/SideBar/SideBarTabTitle';
import ReOrganizerItem from './ReOrganizerItem';

const ReOrganizer: React.FunctionComponent = () => {
    const emitter = useMitt();
    const dispatch = useDispatch();
    const previewTree = useSelector(selectPreviewTree);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [mockPreviewTree, setMockPreviewTree] = useState<ItemInterface[]>();

    const actions: ContextMenuAction[] = [
        {
            label: 'Action D',
            handler: () => {
                console.log('Action D');
            }
        },
        {
            label: 'Action E',
            handler: () => {
                console.log('Action E');
            }
        },
        {
            label: 'Action F',
            handler: () => {
                console.log('Action F');
            }
        }
    ];

    const handleReorganize = (newOrder: ItemInterface[]) => {
        dispatch(updateTree(newOrder));
    };

    const handleUpdate = () => {
        emitter.emit('itemInterfaceClicked', null);
    };

    useEffect(() => {
        setMockPreviewTree(
            previewTree.map((element, index) => {
                return { id: `${element.name}-${index}` };
            })
        );
    }, [previewTree]);

    return (
        <Contextable actions={actions} className={styleClasses.container}>
            <SideBarSearchBar
                placeholder={'Search layers'}
                query={searchQuery}
                setQuery={setSearchQuery}
            />
            <SideBarTabTitle
                title={
                    searchQuery.length > 0 ? `Search results for "${searchQuery}"` : 'Layers'
                }
            />
            {mockPreviewTree && (
                <ReactSortable
                    list={mockPreviewTree}
                    setList={handleReorganize}
                    onUpdate={handleUpdate}
                    {...sortableOptions}>
                    {previewTree.map((element, index) => {
                        return (
                            <ReOrganizerItem key={index} index={index} name={element.name} />
                        );
                    })}
                </ReactSortable>
            )}
        </Contextable>
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
    handle: '.reorganize'
};

export default ReOrganizer;
