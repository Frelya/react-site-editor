import { useEffect, useState } from 'react';

interface DynamicComponentProps {
    componentName: string;
    customProps: Record<string, any>;
}

interface Component {
    caller: React.FunctionComponent;
}

const DynamicComponent: React.FunctionComponent<DynamicComponentProps> = (props) => {
    const [component, setComponent] = useState<Component | null>(null);
    const [componentProps, setComponentProps] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        import(
            `../../../../../packages/ui/src/components/exposed/${props.componentName}/${props.componentName}.tsx`
        ).then(({ default: comp, ...exports }) => {
            setComponent({ caller: comp });
            setComponentProps(exports.defaultProps);
        });
    }, []);

    return (
        <div>
            {component !== null &&
                componentProps !== null &&
                component.caller({ ...componentProps, ...props.customProps })}
        </div>
    );
};

export default DynamicComponent;
