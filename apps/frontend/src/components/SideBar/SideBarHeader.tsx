const SideBarHeader: React.FunctionComponent<React.PropsWithChildren> = (props) => {
    return <div className={styleClasses.container}>{props.children}</div>;
};

const styleClasses = {
    container: 'flex justify-evenly items-center w-full h-16 border-b-2'
};

export default SideBarHeader;
