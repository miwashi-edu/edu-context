import { useEffect, useState } from "react";
import StyleProvider from "./StylesProvider";
import ConfigurationContext, { defaultConfig } from "./ConfigurationContext";
import SettingsContext, { defaultSettings } from "./SettingsContext";
import FeaturesContext, { defaultFeatures } from "./FeaturesContext";
import { fetchAndSet } from "./fetchAndSet";
import ApiProvider from "./ApiContext.jsx";

export const AppProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [settings, setSettings] = useState(defaultSettings);
    const [features, setFeatures] = useState(defaultFeatures);

    useEffect(() => {
        fetchAndSet(setConfig, setSettings, setFeatures);
    }, []);

    return (
        <ConfigurationContext.Provider value={config}>
            <ApiProvider>
                <SettingsContext.Provider value={settings}>
                    <FeaturesContext.Provider value={features}>
                        <StyleProvider>{children}</StyleProvider>
                    </FeaturesContext.Provider>
                </SettingsContext.Provider>
            </ApiProvider>
        </ConfigurationContext.Provider>
    );
};
