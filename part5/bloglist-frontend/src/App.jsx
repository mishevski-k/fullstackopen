import React from 'react';
import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import authService from './services/auth';
import LoginFrom from './components/LoginForm';
import UserDetails from './components/UserDetails';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await authService.login({username, password});
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log('Error', exception);
        }   
    };

    return (
        <div>
            <h2>blogs</h2>
            {!user && LoginFrom({username, setUsername, password, setPassword, handleSubmit: handleLogin})}
            {user && <div>
                <UserDetails user={user} />
                <Blogs blogs={blogs} />
            </div>}

        </div>
    );
};

export default App;