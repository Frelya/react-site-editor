interface EditorButtonProps extends React.PropsWithChildren {
    textColor?: string;
    backgroundColor?: string;
    orientation?: 'horizontal' | 'vertical';
    onClick?: () => void;
}

const EditorButton: React.FunctionComponent<EditorButtonProps> = (props) => {
    const customStyle = {
        color: props.textColor || 'white',
        backgroundColor: props.backgroundColor
    };

    const handleButtonClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div className={styleClasses.button} style={customStyle} onClick={handleButtonClick}>
            {props.children}
        </div>
    );
};

const styleClasses = {
    button: 'py-2 px-4 flex items-center justify-evenly bg-blue-500 font-bold rounded cursor-pointer hover:bg-blue-600'
};

export default EditorButton;
