import Icon from '../Decorators/Icon';

interface ReOrdererItemProps {
    name: string;
}
const ReOrdererItem: React.FunctionComponent<ReOrdererItemProps> = (props) => {
    return (
        <div className={styleClasses.container}>
            <div className="flex gap-2">
                <Icon name="draggable" className="draggable" />
                <Icon name="option" />
            </div>
            {props.name}
        </div>
    );
};

const styleClasses = {
    container: 'px-5 py-2 border-y border-functional-grey flex gap-4'
};

export default ReOrdererItem;
