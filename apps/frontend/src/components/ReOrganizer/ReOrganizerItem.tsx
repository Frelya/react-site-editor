import { pascalToSpaced } from '@react-site-editor/functions';
import Icon from '@components/Decorators/Icon';

interface ReOrganizerItemProps {
    name: string;
}

const ReOrganizerItem: React.FunctionComponent<ReOrganizerItemProps> = (props) => {
    return (
        <div className={styleClasses.container}>
            <div className={styleClasses.icon}>
                <Icon name={'grip-vertical'} className={'text-slate-400'} />
            </div>
            <div className={styleClasses.name}>{pascalToSpaced(props.name)}</div>
        </div>
    );
};

const styleClasses = {
    container: 'w-11/12 h-12 mx-auto my-2 p-2 border border-gray-400 flex gap-4 rounded-md',
    icon: 'reorganize flex justify-center items-center cursor-pointer w-8 h-8 bg-grey rounded-sm',
    name: 'flex-1 h-full flex justify-start items-center'
};

export default ReOrganizerItem;
