import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMitt } from '@/plugins/mitt/react-mitt';
import { updateActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import type { MittContextType } from '@/plugins/mitt/react-mitt';
import type { PreviewElementData } from '@libs/types/tree.type';
import SideBarRight from '@components/SideBar/SideBarRight';
import SideBarLeft from '@components/SideBar/SideBarLeft';
import PreviewIframe from '@components/Preview/PreviewIframe';

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
        <div className={styleClasses.container}>
            <SideBarLeft />
            <PreviewIframe />
            <SideBarRight
                visible={sidebarRightIsVisible}
                onClose={() => setSidebarRightIsVisible(false)}
            />
        </div>
    );
};

const styleClasses = {
    container: 'flex w-screen h-screen overflow-hidden'
};

export default EditorPage;
