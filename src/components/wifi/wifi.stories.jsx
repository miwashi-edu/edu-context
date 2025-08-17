import React from 'react';
import WifiPasswordProvider from './WifiPasswordProvider';
import Guest from './Guest';
import Technician from './Technician';

// A real component to use as `component`
function Demo() {
    return (
        <WifiPasswordProvider>
            <Guest room='101'/>
            <Guest room='102' />
            <Guest room='103' />
            <Technician />
        </WifiPasswordProvider>
    );
}

export default {
    title: 'Components/Wifi',
    component: Demo,
};

export const Default = {

};
