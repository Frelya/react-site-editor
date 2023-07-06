import { SideBarLeft, SideBarRight } from '@components/SideBar';
import { Preview } from '@components/Preview';

const Editor: React.FunctionComponent = () => {
    return (
        <div className={styleClasses.container}>
            <SideBarLeft />
            <Preview />
            <SideBarRight />
        </div>
    );
};

const styleClasses = {
    container: 'flex w-screen h-screen overflow-hidden'
};

export default Editor;
