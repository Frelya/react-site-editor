import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { findCombinations, arrayToGridFlowTemplate } from '@react-site-editor/functions';
import { selectActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapper from '@components/PropertiesComponents/PropertyWrapper/PropertyWrapper';
import GridTemplatePropertyStyle from './GridTemplateProperty.module.css';

const GridTemplateProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const activeComponent = useSelector(selectActiveComponent);
    const flowCount =
        (activeComponent.props.columnCount?.value as number) ||
        (activeComponent.props.rowCount?.value as number) ||
        2;

    const [template, setTemplate] = useState(props.value);
    const [fractions, setFractions] = useState<number>(flowCount);

    const layouts = findCombinations(flowCount, fractions);

    const handleFractionsChange = (event: React.ChangeEvent) => {
        setFractions(Number((event.target as HTMLInputElement).value));
    };

    const LayoutsList: React.FunctionComponent = () => {
        return (
            <ul className={GridTemplatePropertyStyle.layoutsList}>
                {layouts.map((layout, index) => {
                    const listItemTemplate = arrayToGridFlowTemplate(layout);

                    const [isCurrent, setIsCurrent] = useState(false);

                    const handleLayoutClick = (event: React.MouseEvent) => {
                        event.preventDefault();
                        setTemplate(listItemTemplate);
                        setIsCurrent(template === listItemTemplate);

                        if (props.onChange) {
                            props.onChange(event, listItemTemplate);
                        }
                    };

                    return (
                        <li
                            className={`${GridTemplatePropertyStyle.layoutsListItem} ${
                                isCurrent ? GridTemplatePropertyStyle.layoutsListItemCurrent : ''
                            }`}
                            key={index}
                            onClick={handleLayoutClick}>
                            {layout.join(' - ')}
                        </li>
                    );
                })}
                {layouts.length === 0 && (
                    <li className={GridTemplatePropertyStyle.layoutsListItem}>No layouts found</li>
                )}
            </ul>
        );
    };

    useEffect(() => {
        setTemplate(Number(props.value));
        setFractions(flowCount);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <div className={GridTemplatePropertyStyle.inputDiv}>
                <div className={GridTemplatePropertyStyle.fractionsDiv}>
                    <label className={GridTemplatePropertyStyle.fractionsLabel}>Fractions:</label>
                    <input
                        className={GridTemplatePropertyStyle.fractionsInput}
                        type="number"
                        min={flowCount}
                        max={12} // Max for Tailwind CSS (12 columns)
                        value={fractions}
                        onChange={handleFractionsChange}
                    />
                </div>
                <LayoutsList />
            </div>
        </PropertyWrapper>
    );
};

export default GridTemplateProperty;
