import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { pascalToSpaced } from '@react-site-editor/functions';
import { useMitt } from '@/hooks';
import { resetActiveComponent } from '@store/activeComponent/activeComponentSlice';
import { Icon } from '@components/Decorators';

interface ReOrganizerItemProps {
    index: number;
    name: string;
}

const ReOrganizerItem: React.FunctionComponent<ReOrganizerItemProps> = (props) => {
    const dispatch = useDispatch();
    const emitter = useMitt();
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const handleClick = () => {
        dispatch(resetActiveComponent());
        emitter.emit('itemInterfaceClicked', props.index);
        setIsSelected(!isSelected);
    };

    emitter.on('itemInterfaceClicked', (index) => {
        setIsSelected(index === props.index ? !isSelected : false);
    });

    return (
        <div
            className={`${styleClasses.container} ${
                isSelected ? styleClasses.containerSelected : ''
            }`}
            onClick={handleClick}>
            <div className={styleClasses.icon}>
                <Icon name={'grip-vertical'} className={'text-slate-400 pointer-events-none'} />
            </div>
            <div className={styleClasses.name}>{pascalToSpaced(props.name)}</div>
        </div>
    );
};

const styleClasses = {
    container:
        'w-11/12 h-12 mx-auto my-2 p-2 border border-gray-400 flex justify-start items-center gap-4 rounded-md cursor-pointer',
    containerSelected: 'outline outline-2 outline-slate-500',
    icon: 'reorganize w-fit h-fit bg-grey rounded-sm cursor-grab',
    name: 'w-fit h-full flex justify-start items-center'
};

export default ReOrganizerItem;
