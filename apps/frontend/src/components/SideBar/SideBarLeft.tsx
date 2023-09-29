import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTree } from '@store/previewTree/previewTreeSlice';
import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';
import { EditorButton } from '@components/Common';
import BaseSideBar, { SideBarScales } from './BaseSideBar';
import SideBarSection from './SideBarSection';
import SideBarBody from './SideBarBody';
import ActiveTab from './ActiveTab';
import ScreenChanger from './ScreenChanger';

interface SideBarLeftProps {
    visible: boolean;
}

const SideBarLeft: React.FunctionComponent<SideBarLeftProps> = (props) => {
    const dispatch = useDispatch();
    const emitter = useMitt();

    const openMenu = () => {
        emitter.emit('menuToggled');
    };

    const handleRefreshClick = () => {
        dispatch(resetTree());
        emitter.emit('previewRefresh');
    };

    return (
        <BaseSideBar visible={props.visible} side={'left'} scale={SideBarScales.NARROW}>
            <div className={styleClasses.container}>
                <SideBarSection position={'top'}>
                    <div className={styleClasses.header}>
                        <Link to={'../'}>
                            <Icon
                                name={'chevron-left'}
                                className={'w-8 h-8'}
                                description={'Leave Editor'}
                            />
                        </Link>
                        <ScreenChanger />
                        <Icon name={'bars'} onClick={openMenu} />
                    </div>
                </SideBarSection>
                <SideBarBody>
                    <ActiveTab />
                </SideBarBody>
                <SideBarSection position={'bottom'}>
                    <div className={styleClasses.footer}>
                        <Icon
                            name={'information-circle'}
                            description={'About'}
                            className={'text-gray-500'}
                        />
                        <EditorButton>
                            <Link to={'./preview'}>
                                <div className={styleClasses.footerButton}>
                                    <Icon name={'save'} className={'w-6 h-6'} />
                                    Save
                                </div>
                            </Link>
                        </EditorButton>
                        <Icon
                            name={'refresh-arrows'}
                            description={'Discard All'}
                            onClick={handleRefreshClick}
                        />
                    </div>
                </SideBarSection>
            </div>
        </BaseSideBar>
    );
};

const styleClasses = {
    container: 'w-full h-full flex flex-col justify-between',
    header: 'w-11/12 h-full flex justify-between items-center',
    footer: 'w-11/12 h-full flex justify-between items-center',
    footerButton: 'w-full h-full gap-2 flex justify-center items-center'
};

export default SideBarLeft;
