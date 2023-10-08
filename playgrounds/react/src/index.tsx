import React from "react";
import ReactDOM from "react-dom/client";

// import Button from '@ds.e/react';
import Color from '@ds.e/react';

// import '@ds.e/scss/lib/Button.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Color hexCode='#000' width="1rem" height="1rem"/>
        {/* <Button label="React Playground"/> */}
    </React.StrictMode>,
)