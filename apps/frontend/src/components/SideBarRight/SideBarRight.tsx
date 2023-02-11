import SideBarRightStyle from './SideBarRight.module.css';
import { components } from '@react-site-editor/ui';
import SideBar from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import Icon from '@components/Decorators/Icon';
import xMark from '@assets/icons/xmark.svg';

type SideBarScale = '1' | '2';

interface SideBarRightProps {
    visible: boolean;
    scale: SideBarScale;
    component: any;
    onClose: () => void;
}

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
                ? Object.keys(components[props.component]?.defaultProps)
                : ''}
        </SideBar>
    );
};

export default SideBarRight;
