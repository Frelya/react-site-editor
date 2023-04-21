import type { ActiveComponent } from './activeComponent.type';
import { PreviewScreen } from './preview.type';
import type { UpdateElementData, MoveElementData } from './tree.type';

export type Events = {
    dragStartEvent: undefined;
    componentSelected: ActiveComponent;
    componentPropertyChanged: UpdateElementData;
    componentMoved: MoveElementData;
    dragEndEvent: undefined;
    previewScreenChange: PreviewScreen;
    previewRefresh: undefined;
};
