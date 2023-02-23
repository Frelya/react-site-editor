import TextPropertyStyle from './TextProperty.module.css';

interface TextPropertyProps {
    name: string;
    defaultValue?: string;
    onChange: (e: React.ChangeEvent, p: string) => void;
}

const TextProperty: React.FunctionComponent<TextPropertyProps> = (props) => {
    const handleInput = (event: React.ChangeEvent) => {
        props.onChange(event, props.name);
    };

    return (
        <div className={TextPropertyStyle.container}>
            <label className={TextPropertyStyle.label}>
                {[props.name[0].toUpperCase(), props.name.slice(1)].join('')}
            </label>
            <input
                className={TextPropertyStyle.input}
                type="text"
                defaultValue={props.defaultValue}
                onChange={handleInput}
            />
        </div>
    );
};

export default TextProperty;
