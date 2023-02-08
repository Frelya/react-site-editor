import React from 'react';
import type { Component } from '@react-site-editor/types';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
}

const defaultButtonProps: ButtonProps = {
    text: 'Button',
    onClick: () => console.log('Button clicked')
};

const Button: React.FC<ButtonProps> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('text/plain', 'Button');
    };
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={props?.onClick}
            onDragStart={handleDragStart}>
            {props?.text}
        </button>
    );
};

const ButtonComponent: Component = {
    caller: Button,
    defaultProps: defaultButtonProps
};

export default ButtonComponent;
