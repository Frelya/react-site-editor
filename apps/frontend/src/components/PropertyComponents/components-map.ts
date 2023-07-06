import {
    ColorProperty,
    GridTemplateProperty,
    NumberProperty,
    RangeProperty,
    TextProperty
} from './Property';

const PROPERTY_COMPONENTS_MAP: Record<string, React.FunctionComponent<any>> = {
    COLOR: ColorProperty,
    GRID_TEMPLATE: GridTemplateProperty,
    NUMBER: NumberProperty,
    RANGE: RangeProperty,
    TEXT: TextProperty
};

export default PROPERTY_COMPONENTS_MAP;
