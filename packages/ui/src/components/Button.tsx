import React from 'react';
import type { Component } from '@react-site-editor/types';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const defaultButtonProps: ButtonProps = {
    text: 'Button',
    onClick: () => console.log('Button clicked'),
    style: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px'
    }
};

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            draggable
            style={props?.style}
            onClick={props?.onClick}>
            {props?.text}
        </button>
    );
};

const ButtonComponent: Component = {
    caller: Button,
    defaultProps: defaultButtonProps
};

export default ButtonComponent;
