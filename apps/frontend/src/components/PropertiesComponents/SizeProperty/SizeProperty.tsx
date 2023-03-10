import { useState, useEffect } from 'react';
import SizePropertyStyle from './SizeProperty.module.css';

interface SizePropertyProps {
    name: string;
    defaultValue: string | number;
    onChange: (e: React.ChangeEvent, p: string) => void;
}

const SizeProperty: React.FunctionComponent<SizePropertyProps> = (props) => {
    const [size, setSize] = useState<string>(`${props.defaultValue}`);

    const handleInputChange = (event: React.ChangeEvent) => {
        setSize((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        setSize(`${props.defaultValue}`);
    }, [props]);

    return (
        <div className={SizePropertyStyle.container}>
            <label className={SizePropertyStyle.label}>
                {[props.name[0].toUpperCase(), props.name.slice(1)].join('')}
            </label>
            <div className={SizePropertyStyle.inputDiv}>
                <input
                    className={SizePropertyStyle.input}
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={size}
                    onChange={handleInputChange}
                />
                <p className={SizePropertyStyle.sizeValue}>{size}</p>
            </div>
        </div>
    );
};

export default SizeProperty;
