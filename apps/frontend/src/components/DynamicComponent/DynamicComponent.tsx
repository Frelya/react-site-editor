import { useEffect, useState } from 'react';

interface DynamicComponentProps {
    componentName: string;
    propsCustom: Record<string, any>;
}

interface Component {
    caller: React.FunctionComponent;
}

const DynamicComponent: React.FunctionComponent<DynamicComponentProps> = (props) => {
    const [component, setComponent] = useState<Component | null>(null);
    const [componentProps, setComponentProps] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        import(`../../../../../packages/ui/src/components/${props.componentName}/${props.componentName}.tsx`)
            .then(({ default: comp, ...props }) => {
                setComponent({caller: comp});
                setComponentProps(props.defaultProps);
            })
    }, [])

    return (
        <div>
            {component!==null && componentProps!==null && component.caller({...componentProps, ...props.propsCustom})}
        </div>
    )
}

export default DynamicComponent;
