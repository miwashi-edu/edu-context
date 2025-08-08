// src/App.jsx
import React from "react";
import { AppProvider } from "./context/AppProvider";


const App = () => {
    return (
        <AppProvider>
            <h1>Hello</h1>
        </AppProvider>
    );
};

export default App;
