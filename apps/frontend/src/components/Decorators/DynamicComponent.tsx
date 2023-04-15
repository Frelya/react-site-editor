import * as allComponent from '@react-site-editor/ui';
interface DynamicComponentProps {
    componentName: string;
}

const DynamicComponent: React.FunctionComponent<DynamicComponentProps> = (props) => {
    const Component = (allComponent as Record<string, any>)[props.componentName];

    return (
        <div>
            <Component />
        </div>
    );
};

export default DynamicComponent;
