import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MittContextType, useMitt } from '@/plugins/mitt/react-mitt';
import type { PreviewElement } from '@libs/types/tree.type';
import { components } from '@react-site-editor/ui';
import type { ComponentInfos } from '@react-site-editor/types';
import SideBar, { SideBarScale } from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import SideBarRight from '@components/SideBarRight/SideBarRight';
import PreviewIframe from '@components/Preview/PreviewIframe/PreviewIframe';
import ComponentsList from '@components/ComponentsList/ComponentsList';
import Icon from '@components/Decorators/Icon';
import EditorStyle from './EditorPage.module.css';

const EditorPage: React.FunctionComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState<ComponentInfos>({
        name: '',
        defaultProps: {}
    });
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState<boolean>(false);
    const emitter = useMitt();

    // We need to remove the previous listeners on page reload
    emitter.off('componentSelected');

    // Then set a new one
    emitter.on('componentSelected', (component) => {
        setSidebarRightIsVisible(true);
        setSelectedComponent({
            name: (component as PreviewElement).id,
            defaultProps: (component as PreviewElement).props
        } as ComponentInfos);
    });

    // Expose the emitter to the parent window, so we can use it in the PreviewIframe
    window.getEmitter = (): MittContextType => emitter;

    return (
        <div className={EditorStyle.container}>
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
                <p className={EditorStyle.componentsListTitle}>All components</p>
                <ComponentsList elements={components} />
            </SideBar>
            <PreviewIframe />
            <SideBarRight
                visible={sidebarRightIsVisible}
                scale={SideBarScale.NORMAL}
                component={selectedComponent}
                onClose={() => setSidebarRightIsVisible(false)}
            />
        </div>
    );
};

export default EditorPage;
