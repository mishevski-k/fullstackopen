import React from 'react';

const LoginFrom = ({username, setUsername, password, setPassword, handleSubmit}) => {
    return(
        <form id="user-form" onSubmit={handleSubmit}>
            <div>
                username
                <input type='text' id="user-username" value={username} onChange={({target}) => setUsername(target.value)} ></input>
            </div>
            <div>
                password
                <input type='password' id='user-password' value={password} onChange={({target}) => setPassword(target.value)}></input>
            </div>
            <button id="user-login" type='submit'>login</button>
        </form>
    );
};

export default LoginFrom;