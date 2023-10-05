import React from "react";
import ReactDOM from "react-dom/client";

import Button from '@ds.e/react'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Button label="React Playground"/>
    </React.StrictMode>,
)