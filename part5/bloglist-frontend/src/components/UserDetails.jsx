import React from 'react';

const UserDetails = ({user}) => {
    return(
        <div><p>{user.name} logged in</p></div>
    );
};

export default UserDetails;