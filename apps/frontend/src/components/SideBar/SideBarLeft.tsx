import { Link } from 'react-router-dom';
import { components } from '@react-site-editor/ui';
import SideBarHeader from '@components/SideBar/SideBarHeader';
import BaseSideBar, { SideBarScales } from '@components/SideBar/BaseSideBar';
import ComponentsList from '@components/ComponentsList/ComponentsList';
import Icon from '@components/Decorators/Icon';

const SideBarLeft: React.FunctionComponent = () => {
    return (
        <BaseSideBar visible scale={SideBarScales.NARROW}>
            <SideBarHeader>
                <Link to={'../'}>
                    <Icon
                        name={'chevron-left'}
                        className={'w-8 h-8'}
                        description={'Leave Editor'}
                    />
                </Link>
            </SideBarHeader>
            <p className={styleClasses.componentsListTitle}>All components</p>
            <ComponentsList elements={components} />
        </BaseSideBar>
    );
};

const styleClasses = {
    componentsListTitle: 'w-11/12 mx-auto my-4 px-2'
};

export default SideBarLeft;
