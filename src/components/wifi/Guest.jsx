import { useContext } from 'react';
import { WifiPasswordContext } from './WifiPasswordContext';

const Guest = ({room}) => {
    const { wifiPassword } = useContext(WifiPasswordContext);
    return <p>Guest in room {room} uses: {wifiPassword}</p>;
}

export default Guest
