import { useState } from 'react';
import { PreviewScreen, IconName } from '@/types';
import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';

const ScreenChanger: React.FunctionComponent = () => {
    const emitter = useMitt();
    const [screen, setScreen] = useState<PreviewScreen>(PreviewScreen.DESKTOP);

    const iconNames: Record<PreviewScreen, IconName> = {
        [PreviewScreen.DESKTOP]: 'desktop-screen',
        [PreviewScreen.MOBILE]: 'mobile-screen'
    };

    const toggleScreen = () => {
        const newScreen =
            screen === PreviewScreen.DESKTOP ? PreviewScreen.MOBILE : PreviewScreen.DESKTOP;
        emitter.emit('previewScreenChange', newScreen);
        setScreen(newScreen);
    };

    return <Icon name={iconNames[screen]} onClick={toggleScreen} />;
};

export default ScreenChanger;
