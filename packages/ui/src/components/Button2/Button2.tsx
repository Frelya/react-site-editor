import type {
    ComponentChildren,
    ComponentProp,
    PredefinedComponentProps
} from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import ButtonStyle from './Button2.module.css';

interface Button2Props {
    text?: ComponentProp;
    fontSize?: ComponentProp;
    onClick?: () => void;
    children?: ComponentChildren;
}

const Button2: React.FunctionComponent<Button2Props> = (props) => {
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

export const defaultProps: PredefinedComponentProps<Button2Props> = {
    text: { type: PropsEnum.TEXT, value: 'Button 2' },
    fontSize: { type: PropsEnum.SIZE, value: '2' },
    onClick: () => console.log('Button clicked'),
    maxChildren: 2
};

export default Button2;
