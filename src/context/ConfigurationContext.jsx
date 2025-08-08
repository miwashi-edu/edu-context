import { createContext } from 'react';

const defaultConfig = {
    backendUrl: 'http://localhost:3000',
    apiVersion: 'v1'
};

const ConfigurationContext = createContext(defaultConfig);

export { defaultConfig };
export default ConfigurationContext;
