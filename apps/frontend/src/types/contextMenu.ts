import { IconName } from './icons.type';

export type ContextMenuAction = {
    icon?: IconName;
    label: string;
    action: () => void;
};
