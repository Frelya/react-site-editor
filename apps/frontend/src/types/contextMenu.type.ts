import { IconName } from './icons.type';

export type ContextMenuAction = {
    icon?: IconName;
    label: string;
    handler: (e?: React.MouseEvent) => void;
};

export type ContextMenuCoordinates = {
    x: number;
    y: number;
};
