import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTree } from '@/store/previewTree/previewTreeSlice';
import { components } from '@react-site-editor/ui';
import { PreviewScreen } from '@/types';
import SideBarHeader from '@components/SideBar/SideBarHeader';
import BaseSideBar, { SideBarScales } from '@components/SideBar/BaseSideBar';
import ComponentsList from '@components/ComponentsList/ComponentsList';
import { useMitt } from '@components/Decorators/MittProvider';
import Icon from '@components/Decorators/Icon';

const SideBarLeft: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const emitter = useMitt();

    const handleRefreshClick = () => {
        dispatch(resetTree());
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

    return (
        <BaseSideBar visible scale={SideBarScales.NARROW}>
            <SideBarHeader>
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
            </SideBarHeader>
            <ComponentsList elements={components} />
        </BaseSideBar>
    );
};

const styleClasses = {
    header: 'w-11/12 h-full flex justify-between items-center'
};

export default SideBarLeft;
