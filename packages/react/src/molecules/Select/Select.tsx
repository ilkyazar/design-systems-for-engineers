import React, { KeyboardEventHandler, createRef, useEffect, useRef, useState } from "react";
import Text from "../../atoms/Text";

export const KEY_CODES = {
    ENTER: 'Enter',
    SPACE: ' ',
    DOWN_ARROW: 'ArrowDown',
    ESC: 'Escape',
    UP_ARROW: 'ArrowUp'
}

interface SelectOption {
    label: string,
    value: string
}

interface RenderOptionProps {
    isSelected: boolean,
    option: SelectOption,
    getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void,
    options?: SelectOption[],
    label?: string,
    renderOption?: (props: RenderOptionProps) => React.ReactNode
 }

const Select: React.FC<SelectProps> = ({ options = [], label='Please select an option', onOptionSelected: handler, renderOption }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const labelRef = useRef<HTMLButtonElement>(null);
    const [overlayTop, setOverlayTop] = useState<number>(0);

    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null);

    const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([]);

    const onOptionSelected = (option: SelectOption, optionIndex: number) => {        
        if (handler) {
            handler(option, optionIndex);
        }

        setSelectedIndex(optionIndex);
        setIsOpen(false);
    }

    const onLabelClick = () => {
        setIsOpen(!isOpen);
    }

    // Set dropdown options offset.
    useEffect(() => {
        setOverlayTop((
            labelRef.current?.offsetHeight || 0
        ) + 10)
    }, [labelRef.current?.offsetHeight])

    let selectedOption = null;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }

    const highlightItem = (optionIndex: number | null) => {
        setHighlightedIndex(optionIndex);

        // This does not work here.
        // Because just opened the dropdown. So it is re-rendering.
        // While it is re-rendering, trying to focus.
        // But the option is not available yet.
        // So, moved into the useEffect below. 

        /*
        if (optionIndex !== null) {
            const ref = optionRefs[optionIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
        */
    }

    const onButtonKeyDown: KeyboardEventHandler = (event) => {
        event.preventDefault();

        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.key)) {
            setIsOpen(true)

            // Set focus on the list item.
            highlightItem(0);
        }
    }

    useEffect(() => {
        // For each option, create a ref.
        setOptionRefs(options.map(_ => createRef<HTMLLIElement>()));
    }, [options.length]);

    // console.log(optionRefs);

    // Listen to when the dropdown is opened and trigger the highlights
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRefs[highlightedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen])

    return <div className="dse-select">
        <button onKeyDown={onButtonKeyDown}
            aria-controls="dse-select-list" aria-haspopup={true} aria-expanded={isOpen ? true : undefined}
            ref={labelRef} className="dse-select__label" onClick={() => onLabelClick()}>
            <Text>{selectedOption === null ? label : selectedOption.label}</Text>
            <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`} 
                width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>

        {isOpen ? (
            <ul id="dse-select-list" role="menu" 
            style={{ top: overlayTop }} className="dse-select__overlay">
            {options.map((option, optionIndex) => {
                const isSelected = selectedIndex === optionIndex;
                const isHighlighted = highlightedIndex === optionIndex;

                const ref = optionRefs[optionIndex];

                const renderOptionProps = {
                    option,
                    isSelected,
                    getOptionRecommendedProps: (overrideProps = {}) => {return {
                        className: `dse-select__option
                            ${isSelected ? 'dse-select__option--selected' : ''}
                            ${isHighlighted ? 'dse-select__option--highlighted' : ''}`,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ref,
                        tabIndex: isHighlighted ? -1 : 0, // Give tabIndex so it is highlightable.
                        onMouseEnter: () => highlightItem(optionIndex),
                        onMouseLeave: () => highlightItem(null),
                        ...overrideProps
                    }}
                };

                if (renderOption) {
                    return renderOption(renderOptionProps);
                }

                return <li {...renderOptionProps.getOptionRecommendedProps()}>
                                <Text>
                                    {option.label}
                                </Text>

                                {isSelected ? <svg width="1rem" height="1rem" fill="none" stroke="currentColor" stroke-width="1.5" 
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                </svg> : null}
                        </li>
            })}
        </ul>
        ) : null}
        
    </div>;
}

export default Select;