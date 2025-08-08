import React, { useContext } from 'react';
import { MyContext } from '../../context';

const AnyComponent = () => {
    const { value, setValue } = useContext(MyContext);

    const toggleValue = () => {
        setValue(value === 'On' ? 'Off' : 'On');
    };

    return (
        <div>
            <p>{value}</p>
            <button onClick={toggleValue}>Toggle Value</button>
        </div>
    );
};

export default AnyComponent;
