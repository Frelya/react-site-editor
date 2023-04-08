import { useState, useEffect } from 'react';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapper from '@components/PropertiesComponents/PropertyWrapper/PropertyWrapper';
import NumberPropertyStyle from './NumberProperty.module.css';

const NumberProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const [value, setValue] = useState<number>(Number(props.value));

    const handleInputChange = (event: React.ChangeEvent) => {
        const newValue = Number((event.target as HTMLInputElement).value);

        if (props.min && newValue < props.min) {
            setValue(props.min);
            return;
        }

        if (props.max && newValue > props.max) {
            setValue(props.max);
            return;
        }

        setValue(newValue);

        if (props.onChange) {
            props.onChange(event, newValue);
        }
    };

    useEffect(() => {
        setValue(Number(props.value));
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <div className={NumberPropertyStyle.inputDiv}>
                <span className={NumberPropertyStyle.span}>min: {props.min}</span>
                <input
                    className={NumberPropertyStyle.input}
                    type="number"
                    min={props.min || 0}
                    max={props.max || 100}
                    value={value}
                    onChange={handleInputChange}
                />
                <span className={NumberPropertyStyle.span}>max: {props.max}</span>
            </div>
        </PropertyWrapper>
    );
};

export default NumberProperty;
