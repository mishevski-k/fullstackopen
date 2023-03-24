import React from 'react';

const UserDetails = ({user, handleLogout}) => {
    return(
        <div>{user.name} logged in<button onClick={handleLogout}>logout</button></div>
    );
};

export default UserDetails;