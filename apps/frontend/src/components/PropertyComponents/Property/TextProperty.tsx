import { useState, useEffect } from 'react';
import type { PropertyProps } from '@/types';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

const TextProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const [value, setValue] = useState<string>(props.value as string);

    const handleInputChange = (event: React.ChangeEvent) => {
        const newValue = (event.target as HTMLInputElement).value;

        setValue(newValue);

        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    useEffect(() => {
        setValue(props.value as string);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <input
                className={styleClasses.input}
                type="text"
                value={value}
                onChange={handleInputChange}
            />
        </PropertyWrapper>
    );
};

const styleClasses = {
    input: 'w-full h-10 text-sm p-1 focus:outline focus:outline-blue-500'
};

export default TextProperty;
