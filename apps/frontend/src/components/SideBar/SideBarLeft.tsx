import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTree } from '@store/previewTree/previewTreeSlice';
import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';
import { EditorButton } from '@components/Common';
import BaseSideBar, { SideBarScales } from './BaseSideBar';
import SideBarSection from './SideBarSection';
import SideBarBody from './SideBarBody';
import ScreenChanger from './ScreenChanger';
import ActiveTab from './ActiveTab';

const SideBarLeft: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const emitter = useMitt();

    const handleRefreshClick = () => {
        dispatch(resetTree());
        emitter.emit('previewRefresh');
    };

    return (
        <BaseSideBar visible scale={SideBarScales.NARROW}>
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
                        <Icon
                            name={'refresh-arrows'}
                            description={'Discard All'}
                            onClick={handleRefreshClick}
                        />
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
                        <span></span>
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
    footerButton: 'w-full h-full gap-2 py-2 px-4 flex justify-center items-center'
};

export default SideBarLeft;
