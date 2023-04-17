import { useState, useEffect } from 'react';
import type { PropertyProps } from '@/types';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

const ColorProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const [color, setColor] = useState<string>(props.value as string);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const validHexPattern = /^#([0-9a-f]{3}){1,2}$/i;
        const newValue = event.target.value;

        setColor(newValue);

        if (!validHexPattern.test(newValue)) {
            return;
        }

        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    useEffect(() => {
        setColor(props.value as string);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <div className={styleClasses.inputDiv}>
                <input
                    className={styleClasses.inputPick}
                    type="color"
                    value={color}
                    onChange={handleInputChange}
                />
                <div className={styleClasses.hexDiv}>
                    <label>Hex: </label>
                    <input
                        className={styleClasses.inputHex}
                        type="text"
                        value={color}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </PropertyWrapper>
    );
};

const styleClasses = {
    inputDiv: 'flex items-center justify-between w-full p-1',
    hexDiv: 'flex items-center justify-center gap-4 w-2/3',
    inputPick: 'h-10 aspect-square cursor-pointer',
    inputHex: 'w-1/2 h-10 p-1 text-center focus:outline focus:outline-blue-500'
};

export default ColorProperty;
