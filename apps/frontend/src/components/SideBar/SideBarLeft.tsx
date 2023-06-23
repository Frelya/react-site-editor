import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTree } from '@store/previewTree/previewTreeSlice';
import { components } from '@react-site-editor/ui';
import { PreviewScreen, Tabs } from '@/types';
import { useMitt } from '@components/Decorators/MittProvider';
import Icon from '@components/Decorators/Icon';
import EditorButton from '@components/Common/EditorButton';
import SideBarSection from '@components/SideBar/SideBarSection';
import BaseSideBar, { SideBarScales } from '@components/SideBar/BaseSideBar';
import ComponentsList from '@components/ComponentsList/ComponentsList';
import ReOrderer from '../ReOrderer/ReOrderer';

const SideBarLeft: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const emitter = useMitt();

    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.COMPONENT);

    const handleRefreshClick = () => {
        dispatch(resetTree());
        emitter.emit('previewRefresh');
    };

    const ScreenChangeIcon = () => {
        const [screen, setScreen] = useState<PreviewScreen>(PreviewScreen.DESKTOP);

        const toggleScreen = () => {
            const newScreen =
                screen === PreviewScreen.DESKTOP ? PreviewScreen.MOBILE : PreviewScreen.DESKTOP;
            emitter.emit('previewScreenChange', newScreen);
            setScreen(newScreen);
        };

        return screen === PreviewScreen.DESKTOP ? (
            <Icon name={'mobile-screen'} onClick={toggleScreen} />
        ) : (
            <Icon name={'desktop-screen'} onClick={toggleScreen} />
        );
    };

    //TODO Add transition here
    // https://react.dev/reference/react/useTransition
    const ActiveTabs = ({ state }: { state: Tabs }) => {
        if (state == Tabs.COMPONENT) {
            return <ComponentsList elements={components} />;
        } else if (state == Tabs.REORDER) {
            return <ReOrderer />;
        }
        return <p>Something went wrong</p>;
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
                        <ScreenChangeIcon />
                        <Icon
                            name={'refresh-arrows'}
                            description={'Discard All'}
                            onClick={handleRefreshClick}
                        />
                    </div>
                </SideBarSection>
                <SideBarSection position={'top'}>
                    <div className={styleClasses.section}>
                        <div
                            onClick={() => setActiveTab(Tabs.COMPONENT)}
                            className={`flex-1 h-full flex cursor-pointer justify-center items-center border-0 border-blue-500 ${
                                activeTab == Tabs.COMPONENT ? 'border-b-4' : ''
                            }`}>
                            <Icon name="plus" className="pointer-events-none" />
                        </div>
                        <div
                            onClick={() => setActiveTab(Tabs.REORDER)}
                            className={`flex-1 h-full flex cursor-pointer justify-center items-center border-0 border-blue-500 ${
                                activeTab == Tabs.REORDER ? 'border-b-4' : ''
                            }`}>
                            <Icon name="stack" className="pointer-events-none" />
                        </div>
                    </div>
                </SideBarSection>
                <ActiveTabs state={activeTab} />
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
    footerButton: 'w-full h-full gap-2 py-2 px-4 flex justify-center items-center',
    section: 'w-full h-full flex justify-between items-center'
};

export default SideBarLeft;
