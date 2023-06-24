interface SideBarTabTitleProps {
    title: string;
}

const SideBarTabTitle: React.FunctionComponent<SideBarTabTitleProps> = (props) => {
    return <div className={styleClasses.container}>{props.title}</div>;
};

const styleClasses = {
    container: 'w-11/12 mx-auto my-4 px-2'
};

export default SideBarTabTitle;
