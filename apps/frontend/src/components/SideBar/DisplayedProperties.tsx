import { useDispatch } from 'react-redux';
import { kebabToSnake } from '@react-site-editor/functions';
import type { ComponentProp } from '@react-site-editor/types';
import { updateActiveComponentSpecs } from '@store/activeComponent/activeComponentSlice';
import { updateComponent } from '@store/previewTree/previewTreeSlice';
import { UpdateElementData, ActiveComponent } from '@/types';
import { PROPERTY_COMPONENTS_MAP } from '@components/PropertyComponents';

interface DisplayedPropertiesProps {
    activeComponent: ActiveComponent;
}

const DisplayedProperties: React.FunctionComponent<DisplayedPropertiesProps> = ({
    activeComponent
}) => {
    const dispatch = useDispatch();

    const isComponentProp = (propName: string, prop: unknown): prop is ComponentProp<unknown> => {
        return (
            !['maxChildren', 'iconName'].includes(propName) &&
            Object.prototype.hasOwnProperty.call(prop, 'value')
        );
    };

    const handleChangeProperty = ({ id, value: newValue, propName }: UpdateElementData) => {
        dispatch(updateComponent({ id, propName, value: newValue }));
        dispatch(
            updateActiveComponentSpecs({
                ...activeComponent.specs,
                [propName]: {
                    ...activeComponent.specs[propName],
                    value: newValue
                }
            })
        );
    };

    return (
        <>
            {activeComponent.specs
                ? Object.entries(activeComponent.specs).map(([propName, prop]) => {
                      if (
                          isComponentProp(propName, prop) &&
                          PROPERTY_COMPONENTS_MAP[kebabToSnake(prop.control.type).toUpperCase()]
                      ) {
                          const Displayed =
                              PROPERTY_COMPONENTS_MAP[
                                  kebabToSnake(prop.control.type).toUpperCase()
                              ];

                          return (
                              <Displayed
                                  key={propName}
                                  name={propName}
                                  value={prop.value}
                                  spec={prop.control}
                                  onChange={(newValue: UpdateElementData['value']) =>
                                      handleChangeProperty({
                                          id: activeComponent.index,
                                          value: newValue,
                                          propName: propName
                                      })
                                  }
                              />
                          );
                      }

                      return '';
                  })
                : ''}
        </>
    );
};

export default DisplayedProperties;
