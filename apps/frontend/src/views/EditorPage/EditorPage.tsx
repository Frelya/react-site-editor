import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMitt } from '@/plugins/mitt/react-mitt';
import { updateActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import type { MittContextType } from '@/plugins/mitt/react-mitt';
import type { PreviewElementData } from '@libs/types/tree.type';
import { SideBarScale } from '@components/SideBar/SideBar';
import SideBarRight from '@components/SideBarRight/SideBarRight';
import PreviewIframe from '@components/Preview/PreviewIframe/PreviewIframe';
import EditorStyle from './EditorPage.module.css';
import SideBarLeft from '@components/SideBarLeft/SideBarLeft';

const EditorPage: React.FunctionComponent = () => {
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    const emitter = useMitt('main');

    // We need to remove the previous listeners on page reload
    emitter.off('componentSelected');

    // Then set a new one
    emitter.on('componentSelected', (element) => {
        const { id, props } = element as PreviewElementData;
        dispatch(
            updateActiveComponent({
                name: id,
                props: props
            })
        );
        setSidebarRightIsVisible(true);
    });

    // Expose the emitter to the parent window, so we can use it in the PreviewIframe
    window.getEmitter = (): MittContextType => emitter;

    return (
        <div className={EditorStyle.container}>
            <SideBarLeft visible={true} scale={SideBarScale.NARROW} />
            <PreviewIframe />
            <SideBarRight
                visible={sidebarRightIsVisible}
                scale={SideBarScale.NORMAL}
                onClose={() => setSidebarRightIsVisible(false)}
            />
        </div>
    );
};

export default EditorPage;
