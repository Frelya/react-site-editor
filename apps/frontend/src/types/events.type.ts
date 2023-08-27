import type { ActiveComponent } from './active-component.type';
import type { PreviewScreen } from './preview.type';
import type { UpdateElementData, MoveElementData } from './tree.type';

export type Events = {
    dragStartEvent: undefined;
    componentSelected: ActiveComponent;
    componentPropertyChanged: UpdateElementData;
    componentMoved: MoveElementData;
    itemInterfaceClicked: number | null;
    dragEndEvent: undefined;
    previewScreenChange: PreviewScreen;
    previewRefresh: undefined;
    menuToggled: undefined;
};
