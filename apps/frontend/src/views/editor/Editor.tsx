import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateActiveComponent} from '@store/activeComponent/activeComponentSlice';
import {useMitt} from '@components/Decorators/MittProvider';
import SideBarRight from '@components/SideBar/SideBarRight';
import SideBarLeft from '@components/SideBar/SideBarLeft';
import Preview from '@components/Preview/Preview';

const Editor: React.FunctionComponent = () => {
    const [sidebarRightIsVisible, setSidebarRightIsVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    const emitter = useMitt();

    const hideSidebarRight = () => {
        setSidebarRightIsVisible(false);
    };

    useEffect(() => {
        const unloadCallback = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', unloadCallback);
        return () => window.removeEventListener('beforeunload', unloadCallback);
    }, []);

    // We need to remove the previous listeners on page reload
    emitter.off('componentSelected');
    emitter.off('previewRefresh');

    // Then set a new one
    emitter.on('componentSelected', (element) => {
        dispatch(updateActiveComponent(element));
        setSidebarRightIsVisible(true);
    });

    emitter.on('previewRefresh', () => {
        hideSidebarRight();
    });

    return (
        <div className={styleClasses.container}>
            <SideBarLeft/>
            <Preview/>
            <SideBarRight visible={sidebarRightIsVisible} onClose={hideSidebarRight}/>
        </div>
    );
};

const styleClasses = {
    container: 'flex w-screen h-screen overflow-hidden'
};

export default Editor;
