export const fetchAndSet = async (setConfig, setSettings, setFeatures) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const configData = {
            backendUrl: 'https://api.example.com',
            apiVersion: 'v1'
        };

        const settingsData = {
            language: 'en',
            notificationsEnabled: true
        };

        const featuresData = {
            newDashboard: true,
            betaSignup: false
        };

        setConfig(configData);
        setSettings(settingsData);
        setFeatures(featuresData);

        console.info('fetchAndSet loaded config/settings/features');
    } catch (err) {
        console.error('fetchAndSet failed:', err);
    }
};
