import ComponentWrapperStyle from './ComponentWrapper.module.css';

interface ComponentWrapperProps {
    // any prop
    children?: React.ReactNode | React.ReactNode[]
}

const ComponentWrapper: React.FunctionComponent<ComponentWrapperProps> = (props) => {
    return (
        <div className={ComponentWrapperStyle.container}>
            {props.children}
        </div>
    )
};

export default ComponentWrapper;
