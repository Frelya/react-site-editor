import { useState, useEffect } from 'react';
import type { RangeControl } from '@react-site-editor/types';
import type { PropertyProps } from '@/types';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

const RangeProperty: React.FunctionComponent<PropertyProps<number, RangeControl>> = (props) => {
    const [size, setSize] = useState<number>(props.value);

    const handleInputChange = (event: React.ChangeEvent) => {
        const newValue = Number((event.target as HTMLInputElement).value);

        setSize(newValue);

        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    useEffect(() => {
        setSize(props.value as number);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <div className={styleClasses.inputDiv}>
                <input
                    className={styleClasses.input}
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={size}
                    onChange={handleInputChange}
                />
                <p className={styleClasses.sizeValue}>{size}</p>
            </div>
        </PropertyWrapper>
    );
};

const styleClasses = {
    inputDiv: 'flex justify-evenly w-full p-1',
    input: 'w-10/12',
    sizeValue: 'flex-1 text-center'
};

export default RangeProperty;
