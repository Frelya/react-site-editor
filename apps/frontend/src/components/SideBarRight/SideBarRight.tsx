import { useEffect, useState } from 'react';
import type { ComponentProp, ComponentInfos } from '@react-site-editor/types';
import SideBarRightStyle from './SideBarRight.module.css';
import SideBar, { SideBarScale } from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import TextProperty from '@components/PropertiesComponents/TextProperty/TextProperty';
import SizeProperty from '@components/PropertiesComponents/SizeProperty/SizeProperty';
import Icon from '@components/Decorators/Icon';

interface SideBarRightProps {
    visible: boolean;
    scale: SideBarScale;
    component: ComponentInfos;
    onClose: () => void;
}

const SideBarRight: React.FunctionComponent<SideBarRightProps> = (props) => {
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
            props.component
                ? Object.entries(props.component.defaultProps).map(([propName, prop]) => {
                      if (propName !== 'maxChildren' && isComponentProp(prop)) {
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
    }, [props.component]);

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
                <p className={SideBarRightStyle.componentName}>{props.component.name}</p>
            </SideBarHeader>

            <p className={SideBarRightStyle.componentPropsTitle}>Properties</p>

            {displayedComponent}
        </SideBar>
    );
};

export default SideBarRight;
