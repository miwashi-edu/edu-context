import { createContext } from 'react';

const defaultFeatures = {
    newDashboard: false,
    betaSignup: false
};

const FeaturesContext = createContext(defaultFeatures);

export { defaultFeatures };
export default FeaturesContext;
