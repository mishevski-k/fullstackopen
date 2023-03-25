import React from 'react';

const Notification = ({message}) => {

    if(!(message.type) && !(message.text)){
        return null;
    }

    return (
        <div className={`message-${message.type} notification`}>
            <p>{message.text}</p>
        </div>
    );
};

export default Notification;