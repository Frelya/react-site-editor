import { useState, useEffect } from 'react';
import { components } from '@react-site-editor/ui';
import { Tabs } from '@/types';
import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';
import { ReOrganizer } from '@components/ReOrganizer';
import { ComponentsList } from '@components/ComponentsList';
import SideBarSection from './SideBarSection';
import TabChooser from './TabChooser';
import SearchBar from './SearchBar';
import SideBarTabTitle from './SideBarTabTitle';

const ActiveTab: React.FunctionComponent = () => {
    const emitter = useMitt();

    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.COMPONENTS);
    const [activeTabComponent, setActiveTabComponent] = useState<React.ReactNode>(null);
    const [indicatorMarginLeft, setIndicatorMarginLeft] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const TabsComponentsMap = {
        [Tabs.COMPONENTS]: {
            label: 'Components',
            component: ComponentsList,
            props: {
                elements: components,
                searchQuery: searchQuery
            }
        },
        [Tabs.REORGANIZE]: {
            label: 'Layers',
            component: ReOrganizer,
            props: {
                searchQuery: searchQuery
            }
        }
    };

    const tabIndicatorLength = Math.floor(100 / Object.keys(TabsComponentsMap).length);

    useEffect(() => {
        const { component: TabComponent, props } = TabsComponentsMap[activeTab];
        // TODO: Fix this type error
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setActiveTabComponent(<TabComponent {...props} />);
    }, [activeTab, searchQuery]);

    const chooseTab = (index: number, tab: Tabs) => {
        emitter.emit('itemInterfaceClicked', null);
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
            <SearchBar
                placeholder={`Search  ${TabsComponentsMap[activeTab].label.toLowerCase()}`}
                query={searchQuery}
                setQuery={setSearchQuery}
            />
            <SideBarTabTitle
                title={
                    searchQuery.length > 0
                        ? `Search results for "${searchQuery}"`
                        : TabsComponentsMap[activeTab].label
                }
            />
            {activeTabComponent || <p>Something went wrong</p>}
        </>
    );
};

const styleClasses = {
    tabChoices: 'relative w-full h-full flex justify-between items-center',
    tabChooserBack:
        'absolute bottom-0 h-full border-b-4 z-[-1] border-slate-400 bg-slate-400 bg-opacity-20 transition-all duration-100 ease-in-out'
};

export default ActiveTab;
