interface SideBarSectionProps {
    position: 'top' | 'bottom';
    children: React.ReactNode | React.ReactNode[];
}

const SideBarSection: React.FunctionComponent<SideBarSectionProps> = (props) => {
    const borderClass = props.position === 'top' ? 'border-b-4' : 'border-t-4';

    return <div className={`${styleClasses.container} ${borderClass}`}>{props.children}</div>;
};

const styleClasses = {
    container: 'flex justify-evenly items-center w-full h-20'
};

export default SideBarSection;
