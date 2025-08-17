import { useState } from 'react';
import { WifiPasswordContext } from './WifiPasswordContext';

const WifiPasswordProvider = ({ children }) => {
    const [wifiPassword, setWifiPassword] = useState('secret');
    return (
        <WifiPasswordContext.Provider value={{ wifiPassword, setWifiPassword }}>
            {children}
        </WifiPasswordContext.Provider>
    );
};
export default WifiPasswordProvider;
