import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import type { ItemInterface, SortableOptions } from 'react-sortablejs';
import { resetActiveComponent } from '@store/activeComponent/activeComponentSlice';
import { selectPreviewTree, updateTree } from '@store/previewTree/previewTreeSlice';
import type { ContextMenuAction } from '@/types';
import { useMitt } from '@/hooks';
import { WithContextMenu } from '@components/Decorators';
import ReOrganizerItem from './ReOrganizerItem';

interface ReOrganizerProps {
    searchQuery: string;
}

const ReOrganizer: React.FunctionComponent<ReOrganizerProps> = () => {
    const emitter = useMitt();
    const dispatch = useDispatch();
    const previewTree = useSelector(selectPreviewTree);

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
        dispatch(resetActiveComponent());
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
        <WithContextMenu actions={actions} className={styleClasses.container}>
            {mockPreviewTree && (
                <ReactSortable
                    list={mockPreviewTree}
                    setList={handleReorganize}
                    onUpdate={handleUpdate}
                    {...sortableOptions}>
                    {previewTree.length > 0 ? (
                        previewTree.map((element, index) => {
                            return (
                                <ReOrganizerItem
                                    key={`${element.name}-${index}`}
                                    index={index}
                                    name={element.name}
                                />
                            );
                        })
                    ) : (
                        <div className={styleClasses.emptyTree}>No layers found</div>
                    )}
                </ReactSortable>
            )}
        </WithContextMenu>
    );
};

const styleClasses = {
    container: 'h-full flex flex-col justify-start',
    emptyTree: 'text-center text-functional-grey my-10',
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
