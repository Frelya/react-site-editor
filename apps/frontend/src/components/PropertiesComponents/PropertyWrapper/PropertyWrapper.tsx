import { pascalToSpaced } from '@react-site-editor/functions';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapperStyle from './PropertyWrapper.module.css';

interface PropertyWrapperProps {
    name: PropertyProps['name'];
    children: React.ReactNode;
}

const PropertyWrapper: React.FunctionComponent<PropertyWrapperProps> = (props) => {
    return (
        <div className={PropertyWrapperStyle.container}>
            <label className={PropertyWrapperStyle.label}>
                {pascalToSpaced([props.name[0].toUpperCase(), props.name.slice(1)].join(''))}
            </label>
            {props.children}
        </div>
    );
};

export default PropertyWrapper;
