import { createContext } from 'react';

const defaultSettings = {
    language: 'en',
    notificationsEnabled: true,
    theme: 'light' // ← theme lives here
};

const SettingsContext = createContext(defaultSettings);

export { defaultSettings };
export default SettingsContext;
