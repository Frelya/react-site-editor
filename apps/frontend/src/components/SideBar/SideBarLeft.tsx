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
import ReOrganizer from '@components/ReOrganizer/ReOrganizer';

const SideBarLeft: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const emitter = useMitt();

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

    const TabChooser = ({
        onClick,
        children
    }: {
        onClick: () => void;
        children: React.ReactNode;
    }) => {
        return (
            <div onClick={onClick} className={styleClasses.tabChooser}>
                {children}
            </div>
        );
    };

    const ActiveTab = () => {
        const [activeTab, setActiveTab] = useState<Tabs>(Tabs.COMPONENTS);
        const [indicatorMarginLeft, setIndicatorMarginLeft] = useState<number>(0);

        const TabsViewsMap = {
            [Tabs.COMPONENTS]: <ComponentsList elements={components} />,
            [Tabs.REORGANIZE]: <ReOrganizer />
        };

        const tabIndicatorLength = Math.floor(100 / Object.keys(TabsViewsMap).length);

        const chooseTab = (index: number, tab: Tabs) => {
            setIndicatorMarginLeft(tabIndicatorLength * index);
            setActiveTab(tab);
        };

        return (
            <>
                <SideBarSection position={'top'}>
                    <div className={styleClasses.tabChoices}>
                        <div
                            className={styleClasses.tabChooserBack}
                            style={{
                                width: `${tabIndicatorLength}%`,
                                marginLeft: `${indicatorMarginLeft}%`
                            }}
                        />
                        <TabChooser onClick={() => chooseTab(0, Tabs.COMPONENTS)}>
                            <Icon name={'cubes'} className={'pointer-events-none text-gray-600'} />
                        </TabChooser>
                        <TabChooser onClick={() => chooseTab(1, Tabs.REORGANIZE)}>
                            <Icon name={'stack'} className={'pointer-events-none'} />
                        </TabChooser>
                    </div>
                </SideBarSection>
                {TabsViewsMap[activeTab] || <p>Something went wrong</p>}
            </>
        );
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
                <ActiveTab />
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
    tabChoices: 'relative w-full h-full flex justify-between items-center',
    tabChooserBack:
        'absolute bottom-0 h-full border-b-4 z-[-1] border-slate-400 bg-slate-400 bg-opacity-20 transition-all duration-100 ease-in-out',
    tabChooser:
        'flex-1 h-full flex cursor-pointer justify-center items-center border-0 border-blue-500'
};

export default SideBarLeft;
