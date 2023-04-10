import GridTemplateProperty from './Property/GridTemplateProperty';
import NumberProperty from './Property/NumberProperty';
import SizeProperty from './Property/SizeProperty';
import TextProperty from './Property/TextProperty';

const PROPERTY_COMPONENTS_MAP: Record<string, React.FunctionComponent<any>> = {
    GRID_TEMPLATE: GridTemplateProperty,
    NUMBER: NumberProperty,
    SIZE: SizeProperty,
    TEXT: TextProperty
};

export default PROPERTY_COMPONENTS_MAP;
