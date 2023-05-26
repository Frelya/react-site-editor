import * as allComponent from '@react-site-editor/ui';
import type { InferredProps, ExposedComponentsMap } from '@react-site-editor/types';

interface DynamicComponentProps {
    componentName: string;
    componentProps: InferredProps<unknown>;
}

const DynamicComponent: React.FunctionComponent<DynamicComponentProps> = (props) => {
    const Component = (allComponent as ExposedComponentsMap)[props.componentName];

    return <Component {...props.componentProps} />;
};

export default DynamicComponent;
