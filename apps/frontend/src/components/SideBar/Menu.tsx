import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';
import BaseSideBar, { SideBarScales } from './BaseSideBar';
import SideBarSection from './SideBarSection';
import SideBarBody from './SideBarBody';

interface MenuProps {
    visible: boolean;
}

const Menu: React.FunctionComponent<MenuProps> = (props) => {
    const emitter = useMitt();

    const closeMenu = () => {
        emitter.emit('menuToggled');
    };

    return (
        <BaseSideBar visible={props.visible} side={'left'} scale={SideBarScales.NARROW}>
            <div className={styleClasses.container}>
                <SideBarSection position={'top'}>
                    <div className={styleClasses.header}>
                        <Icon
                            name={'cross-mark'}
                            className={'w-8 h-8 cursor-pointer'}
                            descriptionPlace={'left'}
                            onClick={closeMenu}
                        />
                        <Icon
                            name={'cross-mark'}
                            className={'w-8 h-8 cursor-pointer'}
                            descriptionPlace={'left'}
                            onClick={closeMenu}
                        />
                    </div>
                </SideBarSection>
                <SideBarBody>
                </SideBarBody>
                <SideBarSection position={'bottom'}>
                </SideBarSection>
            </div>
        </BaseSideBar>
    );
};

const styleClasses = {
    container: 'absolute z-10 w-full h-full',
    header: 'w-11/12 h-full flex justify-between items-center',
};

export default Menu;
