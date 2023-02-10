import { useState } from 'react';
import EditorStyle from './EditorPage.module.css';
import { components } from '@react-site-editor/ui';
import SideBar from '@components/SideBar/SideBar';
import SideBarHeader from '@components/SideBarHeader/SideBarHeader';
import ComponentWrapper from '@components/ComponentWrapper/ComponentWrapper';
import PreviewIframe from '@components/Preview/PreviewIframe/PreviewIframe';
import Draggable from '@components/Decorators/Draggable';

const EditorPage: React.FunctionComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        null
    );

    return (
        <div className={EditorStyle.container}>
            <SideBar scale="1">
                <SideBarHeader></SideBarHeader>
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
                                    <ComponentWrapper>
                                        <Draggable type="component">
                                            {component.caller(
                                                component.defaultProps
                                            )}
                                        </Draggable>
                                    </ComponentWrapper>
                                </li>
                            );
                        }
                    )}
                </ul>
            </SideBar>
            <div className={EditorStyle.preview}>
                <PreviewIframe />
            </div>
            <SideBar scale="2">
                <SideBarHeader>
                    <h2>{selectedComponent}</h2>
                </SideBarHeader>
                {selectedComponent
                    ? Object.keys(components[selectedComponent]?.defaultProps)
                    : ''}
            </SideBar>
        </div>
    );
}

export default EditorPage;
