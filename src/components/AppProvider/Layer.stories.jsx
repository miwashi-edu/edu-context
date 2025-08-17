import Layer from './Layer';

export default {
    title: 'Components/Layer',
    component: Layer,
};

export const Configuration = {
    args: {
        concern: 'Configuration',
        children: 'Loads app-wide config (environment, endpoints, feature sources) before anything else.',
    },
};

export const Auth = {
    args: {
        concern: 'Auth',
        children: 'Manages identity, tokens, and session restoration.',
    },
};

export const Api = {
    args: {
        concern: 'API',
        children: 'Sets up the API client and handles server communication.',
    },
};
