import { ActiveComponent } from './activeComponent.type';
import { PreviewScreen } from './preview.type';
import type { UpdateElementData } from './tree.type';

export type Events = {
    dragStartEvent: undefined;
    componentSelected: ActiveComponent;
    componentPropertyChanged: UpdateElementData;
    dragEndEvent: undefined;
    previewScreenChange: PreviewScreen;
    previewRefresh: undefined;
};
