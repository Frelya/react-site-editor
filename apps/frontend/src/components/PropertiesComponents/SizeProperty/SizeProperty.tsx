import { useState, useEffect } from 'react';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapper from '@components/PropertiesComponents/PropertyWrapper/PropertyWrapper';
import SizePropertyStyle from './SizeProperty.module.css';

const SizeProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const [size, setSize] = useState<number>(props.value as number);

    const handleInputChange = (event: React.ChangeEvent) => {
        const newValue = Number((event.target as HTMLInputElement).value);

        setSize(newValue);

        if (props.onChange) {
            props.onChange(event, newValue);
        }
    };

    useEffect(() => {
        setSize(props.value as number);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
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
        </PropertyWrapper>
    );
};

export default SizeProperty;
