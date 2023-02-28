import type {
    PredefinedComponent,
    PredefinedComponentProps,
    ComponentProp,
    ComponentChildren
} from '@react-site-editor/types';
import ButtonStyle from './Button.module.css';

interface ButtonProps {
    text?: ComponentProp;
    fontSize?: ComponentProp;
    onClick?: () => void;
    children?: ComponentChildren;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('text/plain', 'Button');
    };
    return (
        <button
            className={`${ButtonStyle.baseButton} ${ButtonStyle[`font-${props.fontSize?.value}`]}`}
            onClick={props?.onClick}
            onDragStart={handleDragStart}>
            {props.text?.value}
            {props.children}
        </button>
    );
};

const defaultButtonProps: PredefinedComponentProps & ButtonProps = {
    text: { type: 'text', value: 'Button' },
    fontSize: { type: 'size', value: '2' },
    onClick: () => console.log('Button clicked'),
    maxChildren: 2
};

const ButtonComponent: PredefinedComponent = {
    caller: Button,
    defaultProps: defaultButtonProps
};

export default ButtonComponent;
