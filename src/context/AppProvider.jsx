// ./src/context/AppProvider.jsx
import { useEffect, useState } from "react";
import StylesProvider from "./StylesProvider";
import ConfigurationContext, { defaultConfig } from "./ConfigurationContext";
import SettingsContext, { defaultSettings } from "./SettingsContext";
import FeaturesContext, { defaultFeatures } from "./FeaturesContext";
import { fetchAndSet } from "./fetchAndSet";
import { AuthProvider } from "./AuthContext";
import { ApiProvider } from "./ApiContext";

export const AppProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [settings, setSettings] = useState(defaultSettings);
    const [features, setFeatures] = useState(defaultFeatures);

    useEffect(() => { fetchAndSet(setConfig, setSettings, setFeatures); }, []);

    return (
        <ConfigurationContext.Provider value={config}>
            <AuthProvider>
                <ApiProvider>
                    <SettingsContext.Provider value={settings}>
                        <FeaturesContext.Provider value={features}>
                            <StylesProvider>{children}</StylesProvider>
                        </FeaturesContext.Provider>
                    </SettingsContext.Provider>
                </ApiProvider>
            </AuthProvider>
        </ConfigurationContext.Provider>
    );
};
