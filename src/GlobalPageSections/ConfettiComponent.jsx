// ConfettiComponent.js
import React from 'react';
import { useWindowSize } from 'react-use'; // Correct import with curly braces
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
    const { width, height } = useWindowSize(); // Hook to get window dimensions
    return (
        <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            gravity={0.05}
        />
    );
};

export default ConfettiComponent;
