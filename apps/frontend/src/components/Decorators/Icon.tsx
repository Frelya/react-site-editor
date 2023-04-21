import { lazy, Suspense } from 'react';
import { kebabToPascal } from '@react-site-editor/functions';
import type { IconName, TooltipPlace } from '@/types';

interface IconProps {
    name: IconName;
    description?: string;
    className?: string;
    descriptionPlace?: TooltipPlace;
    onClick?: (e?: React.MouseEvent) => void;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    const DynamicIcon = props.name.startsWith('ui')
        ? lazy(
              () =>
                  import(
                      `../../../../../packages/ui/src/components/icons/${kebabToPascal(
                          props.name
                      )}.tsx`
                  )
          )
        : lazy(() => import(`../Icons/${kebabToPascal(props.name)}.tsx`));

    const handleIconClickCapture = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (props.onClick) {
            props.onClick(event);
        }
    };

    return (
        <div
            className={`icon ${props.className}`}
            data-tooltip-content={props.description}
            data-tooltip-place={props.descriptionPlace}
            onClickCapture={handleIconClickCapture}>
            <Suspense>
                <DynamicIcon />
            </Suspense>
        </div>
    );
};

export default Icon;
