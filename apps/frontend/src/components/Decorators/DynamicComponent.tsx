import * as allComponent from '@react-site-editor/ui';
interface DynamicComponentProps {
    componentName: string;
    customProps: Record<string, any>;
}

const DynamicComponent: React.FunctionComponent<DynamicComponentProps> = (props) => {
    const Component = (allComponent as Record<string, any>)[props.componentName];

    return (
        <div>
            <Component {...props.customProps} />
        </div>
    );
};

export default DynamicComponent;
