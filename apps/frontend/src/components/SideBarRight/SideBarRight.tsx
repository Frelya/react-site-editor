import { components } from '@react-site-editor/ui';
import type { ComponentProp } from '@react-site-editor/types';
import type { SideBarScale } from '@libs/types/global.type';
import SideBarRightStyle from './SideBarRight.module.css';
import SideBar from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import TextProperty from '@components/PropertiesComponents/TextProperty/TextProperty';
import SizeProperty from '@components/PropertiesComponents/SizeProperty/SizeProperty';
import Icon from '@components/Decorators/Icon';

interface SideBarRightProps {
    visible: boolean;
    scale: SideBarScale;
    component: string;
    onClose: () => void;
}

const notRenderedPropertyTypes: string[] = ['function'];

const PROPERTY_COMPONENTS_MAP: Record<string, React.FunctionComponent<any>> = {
    TEXT: TextProperty,
    SIZE: SizeProperty
};

function isComponentProp(prop: object): prop is ComponentProp {
    return !notRenderedPropertyTypes.includes(typeof prop);
}

const SideBarRight: React.FunctionComponent<SideBarRightProps> = (props) => {
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
                <p className={SideBarRightStyle.componentName}>{props.component}</p>
            </SideBarHeader>

            <p className={SideBarRightStyle.componentPropsTitle}>Properties</p>

            {props.component
                ? Object.entries(components[props.component]?.defaultProps).map(
                      ([propName, prop]) => {
                          if (isComponentProp(prop)) {
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
                      }
                  )
                : ''}
        </SideBar>
    );
};

export default SideBarRight;
