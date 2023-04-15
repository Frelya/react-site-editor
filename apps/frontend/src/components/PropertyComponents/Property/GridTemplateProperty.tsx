import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { findCombinations, arrayToGridFlowTemplate } from '@react-site-editor/functions';
import { selectActiveComponent } from '@/store/activeComponent/activeComponentSlice';
import type { PropertyProps } from '@libs/types/property.type';
import PropertyWrapper from '@components/PropertyComponents/PropertyWrapper';

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
            <ul className={styleClasses.layoutsList}>
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
                            className={`${styleClasses.layoutsListItem} ${
                                isCurrent ? styleClasses.layoutsListItemCurrent : ''
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
        setTemplate(Number(props.value));
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
        'w-full aspect-square p-2 flex justify-center items-center text-center bg- border-2 border-gray-300 rounded-md cursor-pointer ' +
        'hover:border-blue-300',
    layoutsListItemCurrent: 'border-blue-300'
};

export default GridTemplateProperty;
