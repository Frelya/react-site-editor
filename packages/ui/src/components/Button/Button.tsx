import type { Component, ComponentProp } from '@react-site-editor/types';
import ButtonStyle from './Button.module.css';

interface ButtonProps {
    text?: ComponentProp;
    fontSize?: ComponentProp;
    onClick?: () => void;
}

const defaultButtonProps: ButtonProps = {
    text: { type: 'text', value: 'Button' },
    fontSize: { type: 'size', value: '2' },
    onClick: () => console.log('Button clicked')
};

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('text/plain', 'Button');
    };
    return (
        <button
            className={`${ButtonStyle.baseButton} ${
                ButtonStyle[`font-${props.fontSize?.value}`]
            }`}
            onClick={props?.onClick}
            onDragStart={handleDragStart}>
            {props.text?.value}
        </button>
    );
};

const ButtonComponent: Component<any> = {
    caller: Button,
    defaultProps: defaultButtonProps
};

export default ButtonComponent;
