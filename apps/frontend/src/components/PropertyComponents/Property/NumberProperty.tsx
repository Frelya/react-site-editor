import { useState, useEffect } from 'react';
import type { NumberControl } from '@react-site-editor/types';
import type { PropertyProps } from '@/types';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

const NumberProperty: React.FunctionComponent<PropertyProps<number, NumberControl>> = (props) => {
    const [value, setValue] = useState<number>(props.value);

    const handleInputChange = (event: React.ChangeEvent) => {
        const newValue = Number((event.target as HTMLInputElement).value);

        if (props.spec.min && newValue < props.spec.min) {
            setValue(props.spec.min);
            return;
        }

        if (props.spec.max && newValue > props.spec.max) {
            setValue(props.spec.max);
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
                <span className={styleClasses.span}>min: {props.spec.min}</span>
                <input
                    className={styleClasses.input}
                    type="number"
                    min={props.spec.min || 0}
                    max={props.spec.max || 100}
                    value={value}
                    onChange={handleInputChange}
                />
                <span className={styleClasses.span}>max: {props.spec.max}</span>
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
