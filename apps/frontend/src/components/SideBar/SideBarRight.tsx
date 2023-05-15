import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kebabToSnake, pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentProp } from '@react-site-editor/types';
import {
    selectActiveComponent,
    updateActiveComponentProps
} from '@store/activeComponent/activeComponentSlice';
import { updateComponent } from '@store/previewTree/previewTreeSlice';
import PROPERTY_COMPONENTS_MAP from '@components/PropertyComponents/components-map';
import Icon from '@components/Decorators/Icon';
import BaseSideBar, { SideBarScales } from '@components/SideBar/BaseSideBar';
import SideBarSection from '@components/SideBar/SideBarSection';
import EditorButton from '@components/Common/EditorButton';

interface SideBarRightProps {
    visible: boolean;
    onClose: () => void;
}

const SideBarRight: React.FunctionComponent<SideBarRightProps> = (props) => {
    const activeComponent = useSelector(selectActiveComponent);
    const [displayedComponent, setDisplayedComponent] = useState<
        React.ReactNode | React.ReactNode[] | null
    >(null);

    const notRenderedPropertyTypes: string[] = ['function'];

    const isComponentProp = (prop: object): prop is ComponentProp => {
        return !notRenderedPropertyTypes.includes(typeof prop);
    };

    const dispatch = useDispatch();

    const handleChangeProperty = (id: number, newValue: string, propName: string) => {
        dispatch(updateComponent({ id, propName, value: newValue }));
        dispatch(
            updateActiveComponentProps({
                ...activeComponent.props,
                [propName]: {
                    ...activeComponent.props[propName],
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

    useEffect(() => {
        setDisplayedComponent(
            activeComponent.props
                ? Object.entries(activeComponent.props).map(([propName, prop]) => {
                      if (
                          !['maxChildren', 'iconName'].includes(propName) &&
                          isComponentProp(prop)
                      ) {
                          const Displayed =
                              PROPERTY_COMPONENTS_MAP[kebabToSnake(prop.type).toUpperCase()];

                          return (
                              <Displayed
                                  key={propName}
                                  name={propName}
                                  value={prop.value}
                                  min={prop.min}
                                  max={prop.max}
                                  onChange={(newValue: string) =>
                                      handleChangeProperty(
                                          activeComponent.index,
                                          newValue,
                                          propName
                                      )
                                  }
                              />
                          );
                      }

                      return '';
                  })
                : ''
        );
    }, [activeComponent]);

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

                {displayedComponent}
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
