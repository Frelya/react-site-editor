import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    findCombinations,
    arrayToGridFlowTemplate,
    gridFlowTemplateToArray
} from '@react-site-editor/functions';
import { selectActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import type { PropertyProps } from '@/types';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

const GridTemplateProperty: React.FunctionComponent<PropertyProps> = (props) => {
    const activeComponent = useSelector(selectActiveComponent);
    const flowCount =
        (activeComponent.props.columnCount?.value as number) ||
        (activeComponent.props.rowCount?.value as number) ||
        2;

    const currentLayout = gridFlowTemplateToArray(props.value as string);
    const [fractions, setFractions] = useState<number>(flowCount);

    const layouts = findCombinations(flowCount, fractions);

    if (currentLayout.length > 0 && !layouts.includes(currentLayout)) {
        layouts.unshift(currentLayout);
    }

    const handleFractionsChange = (event: React.ChangeEvent) => {
        setFractions(Number((event.target as HTMLInputElement).value));
    };

    const LayoutsList: React.FunctionComponent = () => {
        return (
            <ul className={styleClasses.layoutsList}>
                {layouts.map((layout, index) => {
                    const listItemTemplate = arrayToGridFlowTemplate(layout);
                    const isCurrent = listItemTemplate === props.value;

                    const handleLayoutClick = (event: React.MouseEvent) => {
                        event.preventDefault();

                        if (props.onChange) {
                            // The corresponding value is sent to the parent component
                            props.onChange(listItemTemplate);
                        }
                    };

                    return (
                        <li
                            className={`${styleClasses.layoutsListItem} ${
                                isCurrent
                                    ? styleClasses.layoutsListItemCurrent
                                    : styleClasses.layoutsListItemNotCurrent
                            }`}
                            key={index}
                            onClick={handleLayoutClick}>
                            {layout.join(' - ')}
                        </li>
                    );
                })}
                {layouts.length === 0 && (
                    <li className={styleClasses.layoutsListItem}>No layouts found</li>
                )}
            </ul>
        );
    };

    useEffect(() => {
        setFractions(flowCount);
    }, [props]);

    return (
        <PropertyWrapper name={props.name}>
            <div className={styleClasses.fractionsDiv}>
                <label className={styleClasses.fractionsLabel}>Fractions:</label>
                <input
                    className={styleClasses.fractionsInput}
                    type="number"
                    min={flowCount}
                    max={12} // Max for Tailwind CSS (12 columns)
                    value={fractions}
                    onChange={handleFractionsChange}
                />
            </div>
            <LayoutsList />
        </PropertyWrapper>
    );
};

const styleClasses = {
    fractionsDiv: 'w-full h-10 mb-4 flex justify-evenly',
    fractionsLabel: 'w-fit h-full text-lg flex items-center justify-center',
    fractionsInput:
        'relative w-1/2 h-full text-lg p-2 ' +
        'focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent ' +
        'hover:ring-1 hover:ring-blue-300 ' +
        'number-spin:full-right',
    layoutsList:
        'w-full h-fit max-h-60 py-2 pr-2 grid grid-cols-3 gap-1 list-none border-y-2 overflow-y-scroll overflow-x-hidden',
    layoutsListItem:
        'w-full aspect-square p-2 flex justify-center items-center text-center bg- border-2 rounded-md cursor-pointer ' +
        'hover:border-blue-300',
    layoutsListItemCurrent: 'border-blue-400',
    layoutsListItemNotCurrent: 'border-gray-300'
};

export default GridTemplateProperty;
