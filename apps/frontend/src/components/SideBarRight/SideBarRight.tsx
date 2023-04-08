import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { kebabToSnake, pascalToSpaced } from '@react-site-editor/functions';
import type { ComponentProp } from '@react-site-editor/types';
import { selectActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import PROPERTY_COMPONENTS_MAP from '@/components/PropertiesComponents/ComponentsMap';
import SideBar, { SideBarScale } from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import Icon from '@components/Decorators/Icon';
import SideBarRightStyle from './SideBarRight.module.css';

interface SideBarRightProps {
    visible: boolean;
    scale: SideBarScale;
    onClose: () => void;
}

const SideBarRight: React.FunctionComponent<SideBarRightProps> = (props) => {
    const activeComponent = useSelector(selectActiveComponent);
    const [displayedComponent, setDisplayedComponent] = useState<
        React.ReactNode | React.ReactNode[] | null
    >(null);

    const notRenderedPropertyTypes: string[] = ['function'];

    function isComponentProp(prop: object): prop is ComponentProp {
        return !notRenderedPropertyTypes.includes(typeof prop);
    }

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
                                  onChange={() => console.log('changed')}
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
        <SideBar visible={props.visible} scale={props.scale}>
            <SideBarHeader>
                <Icon
                    name={'cross-mark'}
                    className={'w-6 h-6 cursor-pointer'}
                    description={'Close'}
                    descriptionPlace={'left'}
                    onClick={props.onClose}
                />

                {activeComponent && (
                    <p className={SideBarRightStyle.componentName}>
                        {activeComponent.name
                            ? pascalToSpaced(activeComponent.name)
                            : 'No component selected'}
                    </p>
                )}
            </SideBarHeader>

            <p className={SideBarRightStyle.componentPropsTitle}>Properties</p>

            {displayedComponent}
        </SideBar>
    );
};

export default SideBarRight;
