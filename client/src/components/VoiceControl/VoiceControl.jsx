import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const VoiceControl = ({ onResult }) => {
    const [isListening, setIsListening] = useState(false);
    const [socket, setSocket] = useState(null);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001');
        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (socket) {
            socket.send(transcript);
        }
        onResult(transcript);
    };

    const handleClick = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    return (
        <Button onClick={handleClick}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
        </Button>
    );
};

export default VoiceControl;