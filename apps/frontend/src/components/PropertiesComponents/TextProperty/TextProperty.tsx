import { useState, useEffect } from 'react';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapper from '@components/PropertiesComponents/PropertyWrapper/PropertyWrapper';
import TextPropertyStyle from './TextProperty.module.css';

const TextProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const [value, setValue] = useState<string>(props.value as string);

    const handleInputChange = (event: React.ChangeEvent) => {
        const newValue = (event.target as HTMLInputElement).value;

        setValue(newValue);

        if (props.onChange) {
            props.onChange(event, newValue);
        }
    };

    useEffect(() => {
        setValue(props.value as string);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <input
                className={TextPropertyStyle.input}
                type="text"
                value={value}
                onChange={handleInputChange}
            />
        </PropertyWrapper>
    );
};

export default TextProperty;
