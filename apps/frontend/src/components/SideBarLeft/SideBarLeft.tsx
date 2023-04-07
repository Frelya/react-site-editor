import { Link } from 'react-router-dom';
import { components } from '@react-site-editor/ui';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import SideBar, { SideBarScale } from '@components/SideBar/SideBar';
import ComponentsList from '@components/ComponentsList/ComponentsList';
import Icon from '@components/Decorators/Icon';
import SideBarLeftStyle from './SideBarLeft.module.css';

interface SideBarLeftProps {
    visible: boolean;
    scale: SideBarScale;
    onClose?: () => void;
}

const SideBarLeft: React.FunctionComponent<SideBarLeftProps> = () => {
    return (
        <SideBar visible scale={SideBarScale.NARROW}>
            <SideBarHeader>
                <Link to={'../'}>
                    <Icon
                        name={'chevron-left'}
                        className={'w-8 h-8'}
                        description={'Leave Editor'}
                    />
                </Link>
            </SideBarHeader>
            <p className={SideBarLeftStyle.componentsListTitle}>All components</p>
            <ComponentsList elements={components} />
        </SideBar>
    );
};

export default SideBarLeft;
