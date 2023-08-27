export enum SideBarScales {
    NORMAL = '1',
    NARROW = '2'
}

interface SideBarProps {
    visible: boolean;
    side: 'left' | 'right';
    scale: SideBarScales;
    children?: React.ReactNode | React.ReactNode[];
}

const BaseSideBar: React.FunctionComponent<SideBarProps> = (props) => {
    return (
        <div
            className={`${styleClasses.container} ${styleClasses[`scale${props.scale}`]} ${
                props.visible 
                    ? styleClasses.visible 
                    : styleClasses.invisible + ' ' + (
                        props.side === 'left'
                            ? styleClasses.invisibleSlideLeft 
                            : styleClasses.invisibleSlideRight 
                    )
            }`}
        >
            {props.children}
        </div>
    );
};

const styleClasses = {
    container:
        'flex flex-col h-screen transition-all duration-200 bg-[#f0f0f0] shadow-[0_5px_10px_black]',
    scale1: 'w-1/5 min-w-[20%] max-w-[20%]',
    scale2: 'w-1/4 min-w-[25%] max-w-[25%]',
    invisible: 'hidden',
    invisibleSlideLeft: '-translate-x-full',
    invisibleSlideRight: 'translate-x-full',
    visible: 'block translate-x-0',
};

export default BaseSideBar;
