import React from "react";
import Select from "./Select";

import { fireEvent, render } from '@testing-library/react';

const options = [{
    label: 'Strict Black',
    value: 'strict-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}];

test('renders all options', () => {
    const { getAllByRole, getByTestId } = render(<Select options={options}/>);

    fireEvent.click(getByTestId('dse-select-button'));

    expect(getAllByRole('menuitemradio')).toHaveLength(options.length);
});