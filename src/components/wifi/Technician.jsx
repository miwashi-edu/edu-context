import { useContext } from 'react';
import { WifiPasswordContext } from './WifiPasswordContext';

export default function Technician() {
    const { wifiPassword, setWifiPassword } = useContext(WifiPasswordContext);

    const generateRandomPassword = (length = 12) => {
        const charset =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (val) => charset[val % charset.length]).join('');
    };

    return (
        <div>
            <p>Technician sets password to: {wifiPassword}</p>
            <button onClick={() => setWifiPassword(generateRandomPassword())}>
                Change Password
            </button>
        </div>
    );
}
