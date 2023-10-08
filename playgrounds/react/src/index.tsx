import React from "react";
import ReactDOM from "react-dom/client";

import { Color, Margin, Text, Button } from '@ds.e/react';

import '@ds.e/scss/lib/Button.css';
import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/Margin.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <div>
            <Color hexCode='#000' width="lg" height="lg"/>
            <Margin top bottom space='md'>
                <Text size='xs'>This is some text.</Text>
            </Margin>
            <Button label="React Playground"/>
        </div>
    </React.StrictMode>,
)