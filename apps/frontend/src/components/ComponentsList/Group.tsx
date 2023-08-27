import { useState } from 'react';
import type { ComponentInfos } from '@react-site-editor/types';
import { Icon } from '@components/Decorators';
import GroupItem from './GroupItem';

interface GroupProps {
    label: string;
    group: ComponentInfos[];
}

const Group: React.FunctionComponent<GroupProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <li className={styleClasses.container}>
            <div className={styleClasses.label} onClick={toggleVisibility}>
                <Icon
                    name={'chevron-left'}
                    className={`pointer-events-none ${styleClasses.icon} ${
                        isVisible ? styleClasses.iconDown : styleClasses.iconRight
                    }`}
                />
                <h3>
                    {props.label} ({props.group.length})
                </h3>
            </div>
            <ul
                className={`${styleClasses.itemsList} ${
                    isVisible ? styleClasses.itemsListVisible : styleClasses.itemsListInvisible
                }`}>
                {props.group.map((element) => {
                    return (
                        <li className={styleClasses.item} key={element.name}>
                            <GroupItem element={element} />
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

const styleClasses = {
    container: 'cursor-pointer w-full h-fit',
    label: 'relative text-center w-11/12 font-bold border-2 border-gray-300 p-2.5 mx-auto shadow-md',
    icon: 'w-6 h-6 absolute left-2 transition-all duration-300',
    iconDown: '-rotate-90',
    iconRight: '-rotate-180',
    itemsList:
        'w-11/12 mx-auto h-fit py-5 items-start justify-start gap-2 list-none transition-all duration-1000',
    itemsListVisible: 'flex flex-wrap',
    itemsListInvisible: 'hidden',
    item: 'cursor-pointer grow max-w-[25%] h-full !aspect-square'
};

export default Group;
