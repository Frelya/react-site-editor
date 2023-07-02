interface SideBarBodyProps {
    children: React.ReactNode | React.ReactNode[];
}

const SideBarBody: React.FunctionComponent<SideBarBodyProps> = ({ children }) => {
    return <div className={styleClasses.container}>{children}</div>;
};

const styleClasses = {
    container: 'w-full h-full flex flex-col justify-start'
};

export default SideBarBody;
