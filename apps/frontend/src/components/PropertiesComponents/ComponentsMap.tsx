import GridTemplateProperty from '@components/PropertiesComponents/GridTemplateProperty/GridTemplateProperty';
import NumberProperty from './NumberProperty/NumberProperty';
import SizeProperty from './SizeProperty/SizeProperty';
import TextProperty from './TextProperty/TextProperty';

const PROPERTY_COMPONENTS_MAP: Record<string, React.FunctionComponent<any>> = {
    GRID_TEMPLATE: GridTemplateProperty,
    NUMBER: NumberProperty,
    SIZE: SizeProperty,
    TEXT: TextProperty
};

export default PROPERTY_COMPONENTS_MAP;
