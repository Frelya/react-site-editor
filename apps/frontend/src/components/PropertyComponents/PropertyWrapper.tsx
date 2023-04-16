import { pascalToSpaced, capitalize } from '@react-site-editor/functions';
import type { PropertyProps } from '@/types';

interface PropertyWrapperProps {
    name: PropertyProps['name'];
    children: React.ReactNode;
}

const PropertyWrapper: React.FunctionComponent<PropertyWrapperProps> = (props) => {
    return (
        <div className={styleClasses.container}>
            <label className={styleClasses.label}>{pascalToSpaced(capitalize(props.name))}</label>
            {props.children}
        </div>
    );
};

const styleClasses = {
    container: 'flex flex-col w-11/12 h-fit mx-auto mb-6 pl-2 pb-1 border-l-4 border-gray-300',
    label: 'text-sm my-1'
};

export default PropertyWrapper;
