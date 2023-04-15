export enum SideBarScales {
    NORMAL = '1',
    NARROW = '2'
}

interface SideBarProps {
    visible: boolean;
    scale: SideBarScales;
    children?: React.ReactNode | React.ReactNode[];
}

const BaseSideBar: React.FunctionComponent<SideBarProps> = (props) => {
    return (
        <div
            className={`${styleClasses.container} ${styleClasses[`scale${props.scale}`]} ${
                props.visible ? styleClasses.visible : styleClasses.invisible
            }`}>
            {props.children}
        </div>
    );
};

const styleClasses = {
    container:
        'flex flex-col h-screen transition-all duration-200 bg-[#f0f0f0] shadow-[0_5px_10px_black]',
    scale1: 'w-1/5 min-w-[20%] max-w-[20%]',
    scale2: 'w-1/4 min-w-[25%] max-w-[25%]',
    invisible: 'translate-x-full ml-[-20%]',
    visible: 'translate-x-0'
};

export default BaseSideBar;
