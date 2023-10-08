import React, { useState } from "react";

interface SelectOption {
    label: string,
    value: string
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void,
    options?: SelectOption[],
    label?: string
}

const Select: React.FC<SelectProps> = ({ options = [], label='Please select an option', onOptionSelected: handler }) => {
    
    const onOptionSelected = (option: SelectOption, optionIndex: number) => {
        setIsOpen(!isOpen);
        
        if (handler) {
            handler(option, optionIndex);
        }
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onLabelClick = () => {
        setIsOpen(!isOpen);
    }

    return <div className="dse-select">
        <button className="dse-select__label" onClick={() => onLabelClick()}>
            <span>{label}</span>
            <svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

        </button>

        {isOpen ? (
            <ul className="dse-select__overlay">
            {options.map((option, optionIndex) => {
                return <li key={option.value} onClick={() => onOptionSelected(option, optionIndex)}>{option.label}</li>
            })}
        </ul>
        ) : null}
        
    </div>;
}

export default Select;