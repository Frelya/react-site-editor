import type { PropType } from '@react-site-editor/types';

export interface PropertyBaseInterface {
    name: string;
    defaultValue: never;
    onChange: (e: React.ChangeEvent, p: string) => void;
}

export type PropertyComponent = React.FunctionComponent<`${Capitalize<PropType>}PropertyProps`>;
