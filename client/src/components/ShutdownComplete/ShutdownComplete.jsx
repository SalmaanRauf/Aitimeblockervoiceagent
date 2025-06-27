
import React from 'react';
import Button from 'react-bootstrap/Button';

const ShutdownComplete = () => {
    const handleClick = () => {
        alert('Shutdown Complete!');
    };

    return (
        <Button variant="danger" onClick={handleClick}>
            Shutdown Complete
        </Button>
    );
};

export default ShutdownComplete;
