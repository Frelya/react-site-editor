import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditorStyle from './EditorPage.module.css';
import { components } from '@react-site-editor/ui';
import SideBar from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import SideBarRight from '@components/SideBarRight/SideBarRight';
import ComponentWrapper from '@components/ComponentWrapper/ComponentWrapper';
import PreviewIframe from '@components/Preview/PreviewIframe/PreviewIframe';
import Draggable from '@components/Decorators/Draggable';
import Icon from '@components/Decorators/Icon';
import chevronLeft from '@assets/icons/chevron-left.svg';

const EditorPage: React.FunctionComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        null
    );

    return (
        <div className={EditorStyle.container}>
            <SideBar visible scale="2">
                <SideBarHeader>
                    <Link to={'../'}>
                        <Icon
                            width={'w-8'}
                            height={'h-8'}
                            path={chevronLeft}
                            description={'Leave Editor'}
                        />
                    </Link>
                </SideBarHeader>
                <p className={EditorStyle.componentsListTitle}>
                    All components
                </p>
                <ul className={EditorStyle.componentsList}>
                    {Object.entries(components).map(
                        ([componentName, component]) => {
                            return (
                                <li
                                    className={EditorStyle.componentsListItem}
                                    key={componentName}
                                    onClick={() =>
                                        setSelectedComponent(componentName)
                                    }>
                                    <Draggable type="component">
                                        <ComponentWrapper>
                                            {component.caller(
                                                component.defaultProps
                                            )}
                                        </ComponentWrapper>
                                    </Draggable>
                                </li>
                            );
                        }
                    )}
                </ul>
            </SideBar>
            <PreviewIframe />
            <SideBarRight
                visible={selectedComponent !== null}
                scale="1"
                component={selectedComponent}
                onClose={() => setSelectedComponent(null)}
            />
        </div>
    );
};

export default EditorPage;
