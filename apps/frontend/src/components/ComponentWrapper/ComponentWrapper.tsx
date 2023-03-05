import ComponentWrapperStyle from './ComponentWrapper.module.css';

interface ComponentWrapperProps {
    text: string;
    // TODO: image/icon ?
}

const ComponentWrapper: React.FunctionComponent<ComponentWrapperProps> = (props) => {
    return <div className={ComponentWrapperStyle.container}>{props.text}</div>;
};

export default ComponentWrapper;
