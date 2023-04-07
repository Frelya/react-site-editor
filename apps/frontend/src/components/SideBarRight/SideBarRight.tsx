import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { ComponentProp } from '@react-site-editor/types';
import { selectActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import SideBar, { SideBarScale } from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import TextProperty from '@components/PropertiesComponents/TextProperty/TextProperty';
import SizeProperty from '@components/PropertiesComponents/SizeProperty/SizeProperty';
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

    const PROPERTY_COMPONENTS_MAP: Record<string, React.FunctionComponent<any>> = {
        TEXT: TextProperty,
        SIZE: SizeProperty
    };

    function isComponentProp(prop: object): prop is ComponentProp {
        return !notRenderedPropertyTypes.includes(typeof prop);
    }

    useEffect(() => {
        setDisplayedComponent(
            activeComponent.defaultProps
                ? Object.entries(activeComponent.defaultProps).map(([propName, prop]) => {
                      if (
                          !['maxChildren', 'iconName'].includes(propName) &&
                          isComponentProp(prop)
                      ) {
                          const Displayed = PROPERTY_COMPONENTS_MAP[prop.type.toUpperCase()];

                          return (
                              <Displayed
                                  key={propName}
                                  name={propName}
                                  defaultValue={prop.value}
                                  onChange={() => console.log('changed')}
                              />
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
                    <p className={SideBarRightStyle.componentName}>{activeComponent.name}</p>
                )}
            </SideBarHeader>

            <p className={SideBarRightStyle.componentPropsTitle}>Properties</p>

            {displayedComponent}
        </SideBar>
    );
};

export default SideBarRight;
