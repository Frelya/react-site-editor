interface IconProps {
    path: string;
    description: string;
    width?: string;
    height?: string;
    color?: string;
    onClick?: () => void;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div
            className={`${props.width} ${props.height} text-${props.color} cursor-pointer`}
            onClick={handleClick}
            title={props.description}>
            <img src={props.path} alt="Icon" />
        </div>
    );
};

export default Icon;
