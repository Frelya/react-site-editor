interface TabChooserProps {
    onClick: () => void;
    children: React.ReactNode;
}

const TabChooser: React.FunctionComponent<TabChooserProps> = ({ onClick, children }) => {
    return (
        <div onClick={onClick} className={styleClasses.container}>
            {children}
        </div>
    );
};

const styleClasses = {
    container:
        'flex-1 h-full flex cursor-pointer justify-center items-center border-0 border-blue-500'
};

export default TabChooser;
