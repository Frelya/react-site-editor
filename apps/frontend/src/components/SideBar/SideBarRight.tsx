import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kebabToSnake, pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentProp } from '@react-site-editor/types';
import { selectActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import PROPERTY_COMPONENTS_MAP from '@/components/PropertyComponents/components-map';
import BaseSideBar, { SideBarScales } from '@components/SideBar/BaseSideBar';
import SideBarHeader from '@components/SideBar/SideBarHeader';
import Icon from '@components/Decorators/Icon';
import { updateComponent } from '@/store/previewTree/previewTreeSlice';

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

    const handleChangeProperty = (id: number, newVal: string, propName: string) => {
        // emitter.emit('componentPropertyChanged', { id: 's', propName, value: newVal });
        dispatch(updateComponent({ id, propName, value: newVal }));
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
                                  onChange={(newVal: string) =>
                                      handleChangeProperty(activeComponent.index, newVal, propName)
                                  }
                              />

                              /*
                               TODO: Add onChange handler,
                                which will update component props in store (activeComponent and previewElement)
                                See Issue #71
                               */
                          );
                      }

                      return '';
                  })
                : ''
        );
    }, [activeComponent]);

    return (
        <BaseSideBar visible={props.visible} scale={SideBarScales.NORMAL}>
            <SideBarHeader>
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
            </SideBarHeader>

            <p className={styleClasses.componentPropsTitle}>Properties</p>

            {displayedComponent}
        </BaseSideBar>
    );
};

const styleClasses = {
    componentName: 'text-xl break-words w-9/12 max-w-[75%] min-h-fit max-h-full',
    componentPropsTitle: 'w-11/12 mx-auto my-4 px-2'
};

export default SideBarRight;
