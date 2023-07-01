import { useDispatch, useSelector } from 'react-redux';
import { kebabToSnake, pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentProp } from '@react-site-editor/types';
import {
    selectActiveComponent,
    updateActiveComponentSpecs
} from '@store/activeComponent/activeComponentSlice';
import { updateComponent } from '@store/previewTree/previewTreeSlice';
import type { UpdateElementData } from '@/types';
import { Icon } from '@components/Decorators';
import { EditorButton } from '@components/Common';
import { PROPERTY_COMPONENTS_MAP } from '@components/PropertyComponents';
import BaseSideBar, { SideBarScales } from './BaseSideBar';
import SideBarSection from './SideBarSection';

interface SideBarRightProps {
    visible: boolean;
    onClose: () => void;
}

const SideBarRight: React.FunctionComponent<SideBarRightProps> = (props) => {
    const activeComponent = useSelector(selectActiveComponent);

    const isComponentProp = (propName: string, prop: unknown): prop is ComponentProp<unknown> => {
        return (
            !['maxChildren', 'iconName'].includes(propName) &&
            Object.prototype.hasOwnProperty.call(prop, 'value')
        );
    };

    const dispatch = useDispatch();

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

    const resetToDefault = () => {
        /*
        Something like this:
        
        if (activeComponent.props) {
            Object.entries(activeComponent.props).forEach(([propName, prop]) => {
                if (prop.value !== prop.defaultValue) {
                    handleChangeProperty(activeComponent.index, prop.defaultValue, propName);
                }
            });
        }
         */
    };

    const DisplayedProperties: React.FunctionComponent = () => {
        return (
            <>
                {props.visible && activeComponent.specs
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

    return (
        <BaseSideBar visible={props.visible} scale={SideBarScales.NORMAL}>
            <SideBarSection position={'top'}>
                <Icon
                    name={'cross-mark'}
                    className={'w-6 h-6 cursor-pointer'}
                    description={'Close'}
                    descriptionPlace={'left'}
                    onClick={props.onClose}
                />

                {activeComponent && (
                    <p className={styleClasses.componentName}>
                        {activeComponent.name
                            ? pascalToSpaced(activeComponent.name)
                            : 'No component selected'}
                    </p>
                )}
            </SideBarSection>

            <div className={styleClasses.main}>
                <p className={styleClasses.componentPropsTitle}>Properties</p>

                <DisplayedProperties />
            </div>

            <SideBarSection position={'bottom'}>
                <div className={styleClasses.footer}>
                    <span></span>
                    <EditorButton onClick={resetToDefault}>
                        <div className={styleClasses.footerButton}>
                            <Icon name={'refresh-arrows'} className={'w-6 h-6'} />
                            Reset to default
                        </div>
                    </EditorButton>
                    <Icon
                        name={'information-circle'}
                        description={'About'}
                        className={'text-gray-500'}
                    />
                </div>
            </SideBarSection>
        </BaseSideBar>
    );
};

const styleClasses = {
    main: 'w-11/12 h-full flex flex-col justify-start items-center',
    componentName: 'text-xl break-words w-9/12 max-w-[75%] min-h-fit max-h-full',
    componentPropsTitle: 'w-11/12 mx-auto my-4 px-2',
    footer: 'w-11/12 h-full flex justify-between items-center',
    footerButton: 'w-full h-full gap-2 py-2 px-4 flex justify-center items-center'
};

export default SideBarRight;
