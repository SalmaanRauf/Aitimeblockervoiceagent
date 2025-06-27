
import React from 'react';

const CaptureColumn = ({ tasks }) => {
    return (
        <div>
            <h2>Capture Column</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CaptureColumn;
