import { ActiveComponent } from '@/libs/types/activeComponent.type';
import type { UpdateElementData } from '@libs/types/tree.type';

export type Events = {
    dragStartEvent: undefined;
    componentSelected: ActiveComponent;
    componentPropertyChanged: UpdateElementData;
    dragEndEvent: undefined;
};
