import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pascalToSpaced } from '@react-site-editor/functions';
import {
    updateActiveComponent,
    selectActiveComponent
} from '@store/activeComponent/activeComponentSlice';
import { useMitt } from '@/hooks';
import { Icon } from '@components/Decorators';
import { EditorButton } from '@components/Common';
import BaseSideBar, { SideBarScales } from './BaseSideBar';
import SideBarSection from './SideBarSection';
import SideBarBody from './SideBarBody';
import DisplayedProperties from './DisplayedProperties';

const SideBarRight: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const emitter = useMitt();
    const activeComponent = useSelector(selectActiveComponent);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const hideSidebarRight = () => {
        setIsVisible(false);
    };

    const resetToDefault = () => {
        /*
        Something like this:
        
        if (activeComponent.props) {
            Object.entries(activeComponent.props).forEach(([propName, prop]) => {
                if (prop.value !== prop.defaultValue) {
                    handleChangeProperty(activeComponent.index, prop.defaultValue, propName);
                }
            });
        }
         */
    };

    useEffect(() => {
        if (Object.keys(activeComponent).length === 0) {
            hideSidebarRight();
        }
    }, [activeComponent]);

    emitter.on('componentSelected', (element) => {
        dispatch(updateActiveComponent(element));
        setIsVisible(true);
    });

    emitter.on('previewRefresh', () => {
        hideSidebarRight();
    });

    return (
        <BaseSideBar visible={isVisible} side={'right'} scale={SideBarScales.NORMAL}>
            <SideBarSection position={'top'}>
                <Icon
                    name={'cross-mark'}
                    className={'w-6 h-6 cursor-pointer'}
                    description={'Close'}
                    descriptionPlace={'left'}
                    onClick={hideSidebarRight}
                />

                {activeComponent && (
                    <p className={styleClasses.componentName}>
                        {activeComponent.name
                            ? pascalToSpaced(activeComponent.name)
                            : 'No component selected'}
                    </p>
                )}
            </SideBarSection>

            <SideBarBody>
                <p className={styleClasses.componentPropsTitle}>Properties</p>

                {isVisible && <DisplayedProperties activeComponent={activeComponent} />}
            </SideBarBody>

            <SideBarSection position={'bottom'}>
                <div className={styleClasses.footer}>
                    <span></span>
                    <EditorButton onClick={resetToDefault}>
                        <div className={styleClasses.footerButton}>
                            <Icon name={'refresh-arrows'} className={'w-6 h-6'} />
                            Reset to default
                        </div>
                    </EditorButton>
                    <Icon
                        name={'information-circle'}
                        description={'About'}
                        className={'text-gray-500'}
                    />
                </div>
            </SideBarSection>
        </BaseSideBar>
    );
};

const styleClasses = {
    componentName: 'text-xl break-words w-9/12 max-w-[75%] min-h-fit max-h-full',
    componentPropsTitle: 'w-11/12 mx-auto my-4 px-2',
    footer: 'w-11/12 h-full flex justify-between items-center',
    footerButton: 'w-full h-full gap-2 flex justify-center items-center'
};

export default SideBarRight;
