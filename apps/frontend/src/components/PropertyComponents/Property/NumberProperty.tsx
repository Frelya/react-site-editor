import { useState, useEffect } from 'react';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

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
            props.onChange(newValue);
        }
    };

    useEffect(() => {
        setValue(Number(props.value));
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <div className={styleClasses.inputDiv}>
                <span className={styleClasses.span}>min: {props.min}</span>
                <input
                    className={styleClasses.input}
                    type="number"
                    min={props.min || 0}
                    max={props.max || 100}
                    value={value}
                    onChange={handleInputChange}
                />
                <span className={styleClasses.span}>max: {props.max}</span>
            </div>
        </PropertyWrapper>
    );
};

const styleClasses = {
    inputDiv: 'w-full h-10 flex justify-between',
    input:
        'relative w-1/3 h-full text-lg p-2 ' +
        'focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent ' +
        'hover:ring-1 hover:ring-blue-300 ' +
        'number-spin:full-right',
    span: 'flex-1 h-full text-lg flex items-center justify-center'
};

export default NumberProperty;
