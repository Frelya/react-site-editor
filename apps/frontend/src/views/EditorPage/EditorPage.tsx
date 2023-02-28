import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditorStyle from './EditorPage.module.css';
import { components } from '@react-site-editor/ui';
import SideBar from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import SideBarRight from '@components/SideBarRight/SideBarRight';
import PreviewIframe from '@components/Preview/PreviewIframe/PreviewIframe';
import ComponentsList from '@components/ComponentsList/ComponentsList';
import Icon from '@components/Decorators/Icon';

const EditorPage: React.FunctionComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('');
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState<boolean>(false);

    return (
        <div className={EditorStyle.container}>
            <SideBar visible scale="2">
                <SideBarHeader>
                    <Link to={'../'}>
                        <Icon
                            name={'chevron-left'}
                            className={'w-8 h-8'}
                            description={'Leave Editor'}
                        />
                    </Link>
                </SideBarHeader>
                <p className={EditorStyle.componentsListTitle}>All components</p>
                <ComponentsList
                    elements={components}
                    onClick={(name) => {
                        setSelectedComponent(name);
                        setSidebarRightIsVisible(true);
                    }}
                />
            </SideBar>
            <PreviewIframe />
            <SideBarRight
                visible={sidebarRightIsVisible}
                scale="1"
                component={selectedComponent}
                onClose={() => setSidebarRightIsVisible(false)}
            />
        </div>
    );
};

export default EditorPage;
