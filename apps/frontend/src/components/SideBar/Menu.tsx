import { useMitt, useUser } from '@/hooks';
import { Icon } from '@components/Decorators';
import { EditorButton } from '@components/Common';
import BaseSideBar, { SideBarScales } from './BaseSideBar';
import SideBarSection from './SideBarSection';
import SideBarBody from './SideBarBody';

interface MenuProps {
    visible: boolean;
}

const Menu: React.FunctionComponent<MenuProps> = (props) => {
    const emitter = useMitt();

    const { data: user, isLoading: userIsLoading, error: userError } = useUser();

    const closeMenu = () => {
        emitter.emit('menuToggled');
    };

    return (
        <BaseSideBar visible={props.visible} side={'left'} scale={SideBarScales.NARROW}>
            <div className={styleClasses.container}>
                <SideBarSection position={'top'}>
                    <div className={styleClasses.header}>
                        <Icon name={'user'} className={'w-6 h-6 text-functional-grey'} />
                        <Icon name={'cross-mark'} className={'w-8 h-8'} onClick={closeMenu} />
                    </div>
                </SideBarSection>
                <SideBarBody>
                    user:&nbsp;
                    {userIsLoading && 'loading...'}
                    {userError && JSON.stringify(userError)}
                    {user && JSON.stringify(user)}
                </SideBarBody>
                <SideBarSection position={'bottom'}>
                    <EditorButton>Delete</EditorButton>
                </SideBarSection>
            </div>
        </BaseSideBar>
    );
};

const styleClasses = {
    container: 'absolute z-10 w-full h-full flex flex-col justify-between',
    header: 'w-11/12 h-full flex justify-between items-center'
};

export default Menu;
