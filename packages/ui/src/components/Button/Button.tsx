import type { Component } from '@react-site-editor/types';
import ButtonStyle from './Button.module.css';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
}

const defaultButtonProps: ButtonProps = {
    text: 'Button',
    onClick: () => console.log('Button clicked')
};

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('text/plain', 'Button');
    };
    return (
        <button
            className={ButtonStyle.baseButton}
            onClick={props?.onClick}
            onDragStart={handleDragStart}>
            {props?.text}
        </button>
    );
};

const ButtonComponent: Component<any> = {
    caller: Button,
    defaultProps: defaultButtonProps
};

export default ButtonComponent;
