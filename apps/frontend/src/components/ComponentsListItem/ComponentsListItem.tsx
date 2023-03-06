import ComponentsListItemStyle from './ComponentsListItem.module.css';

interface ComponentsListItemProps {
    text: string;
    // TODO: image/icon ?
}

const ComponentsListItem: React.FunctionComponent<ComponentsListItemProps> = (props) => {
    return <div className={ComponentsListItemStyle.container}>{props.text}</div>;
};

export default ComponentsListItem;
