import React from "react";
import ReactDOM from "react-dom/client";

import { Color, Margin, Text, Button, Select } from '@ds.e/react';

import '@ds.e/scss/lib/Button.css';
import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/Margin.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const options = [{
    label: 'Strict Black',
    value: 'strict-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]

root.render(
    <React.StrictMode>
        <div>
            <Color hexCode='#000' width="lg" height="lg"/>
            <Margin top bottom space='md'>
                <Text size='xs'>This is some text.</Text>
            </Margin>
            <Button label="React Playground"/>
            <Margin top bottom space='lg'>
                <Select options={options}/>
            </Margin>
        </div>
    </React.StrictMode>,
)