import { kebabToPascal } from '@react-site-editor/functions';
import { lazy, Suspense } from 'react';
import type { IconName } from '@/libs/types/icons.type';

interface IconProps {
    name: IconName;
    description: string;
    className?: string;
    onClick?: () => void;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    const DynamicIcon = lazy(
        () => import(`../Icons/${kebabToPascal(props.name)}`)
    );
    return (
        <div
            className={props.className}
            title={props.description}
            onClick={props.onClick}>
            <Suspense>
                <DynamicIcon />
            </Suspense>
        </div>
    );
};

export default Icon;
