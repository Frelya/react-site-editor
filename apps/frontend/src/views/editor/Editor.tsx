import { useState } from 'react';
import { useMitt } from '@/hooks';
import { Menu, SideBarLeft, SideBarRight } from '@components/SideBar';
import { Preview } from '@components/Preview';

const Editor: React.FunctionComponent = () => {
    const emitter = useMitt();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    emitter.on('menuToggled', () => {
        setIsMenuVisible(!isMenuVisible);
    });

    return (
        <div className={styleClasses.container}>
            <Menu visible={isMenuVisible} />
            <SideBarLeft visible={!isMenuVisible} />
            <Preview />
            <SideBarRight />
        </div>
    );
};

const styleClasses = {
    container: 'relative flex w-screen h-screen overflow-hidden'
};

export default Editor;
