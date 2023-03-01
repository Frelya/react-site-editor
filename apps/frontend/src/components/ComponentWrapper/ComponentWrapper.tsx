import ComponentWrapperStyle from './ComponentWrapper.module.css';

interface ComponentWrapperProps {
    // TODO: Adapt to display component name only
    children?: React.ReactNode | React.ReactNode[];
}

const ComponentWrapper: React.FunctionComponent<ComponentWrapperProps> = (props) => {
    return <div className={ComponentWrapperStyle.container}>{props.children}</div>;
};

export default ComponentWrapper;
