import type {
    PredefinedComponent,
    PredefinedComponentProps,
    ComponentProp
} from '@react-site-editor/types';
import Button2Style from './Button2.module.css';

interface Button2Props {
    text?: ComponentProp;
    fontSize?: ComponentProp;
    onClick?: () => void;
}

const Button2: React.FunctionComponent<Button2Props> = (props) => {
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('text/plain', 'Button2');
    };
    return (
        <button
            className={`${Button2Style.baseButton} ${
                Button2Style[`font-${props.fontSize?.value}`]
            }`}
            onClick={props?.onClick}
            onDragStart={handleDragStart}>
            {props.text?.value}
        </button>
    );
};

const defaultButton2Props: PredefinedComponentProps & Button2Props = {
    text: { type: 'text', value: 'Button 2' },
    fontSize: { type: 'size', value: '3' },
    onClick: () => console.log('Button 2 clicked')
};

const Button2Component: PredefinedComponent = {
    caller: Button2,
    defaultProps: defaultButton2Props
};

export default Button2Component;
