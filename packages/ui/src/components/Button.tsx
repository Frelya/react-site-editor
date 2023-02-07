import React from 'react';

interface Props {
    text: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

const Button: React.FC<Props> = ({ text, onClick, style }) => {
    return (
        <button style={style} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
