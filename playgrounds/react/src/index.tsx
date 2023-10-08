import React from "react";
import ReactDOM from "react-dom/client";

// import Button from '@ds.e/react';
import { Color } from '@ds.e/react';
// import '@ds.e/scss/lib/Button.css';
import '@ds.e/scss/lib/Utilities.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Color hexCode='#000' />
        {/* <Button label="React Playground"/> */}
    </React.StrictMode>,
)