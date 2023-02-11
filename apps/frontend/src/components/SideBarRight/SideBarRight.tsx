import SideBarRightStyle from './SideBarRight.module.css';
import { components } from '@react-site-editor/ui';
import SideBar from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import TextProperty from '@components/PropertiesComponents/TextProperty/TextProperty';
import SizeProperty from '@components/PropertiesComponents/SizeProperty/SizeProperty';
import Icon from '@components/Decorators/Icon';
import xMark from '@assets/icons/xmark.svg';

type SideBarScale = '1' | '2';

interface SideBarRightProps {
    visible: boolean;
    scale: SideBarScale;
    component: string;
    onClose: () => void;
}

const notRenderedProperties: string[] = ['function'];

const PROPERTIES_MAP: Record<string, React.FunctionComponent<any>> = {
    TEXT: TextProperty,
    SIZE: SizeProperty
};

const SideBarRight: React.FunctionComponent<SideBarRightProps> = (props) => {
    return (
        <SideBar visible={props.visible} scale={props.scale}>
            <SideBarHeader>
                <Icon
                    onClick={props.onClose}
                    width={'w-6'}
                    height={'h-6'}
                    color={'green'}
                    path={xMark}
                    description={'Close'}
                />
                <p className={SideBarRightStyle.componentName}>
                    {props.component}
                </p>
            </SideBarHeader>
            <p className={SideBarRightStyle.componentPropsTitle}>Properties</p>
            {props.component
                ? Object.entries(components[props.component]?.defaultProps).map(
                      ([propName, prop]) => {
                          if (notRenderedProperties.includes(typeof prop)) {
                              return '';
                          }
                          const Displayed =
                              PROPERTIES_MAP[prop.type.toUpperCase()];
                          return (
                              <Displayed
                                  key={propName}
                                  name={propName}
                                  defaultValue={prop.value}
                                  onChange={() => console.log('changed')}
                              />
                          );
                      }
                  )
                : ''}
        </SideBar>
    );
};

export default SideBarRight;
