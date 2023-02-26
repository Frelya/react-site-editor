import { kebabToPascal } from '@react-site-editor/functions';
import { lazy, Suspense } from 'react';
import { AvailableIcon } from './AvailableIcons';

interface IconProps {
    name: AvailableIcon;
    description: string;
    className?: string;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    const DynamicIcon = lazy(
        () => import(`./AllIcons/${kebabToPascal(props.name)}`)
    );
    return (
        <div className={props.className} title={props.description}>
            <Suspense>
                <DynamicIcon />
            </Suspense>
        </div>
    );
};

export default Icon;
