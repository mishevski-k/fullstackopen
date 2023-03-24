import React from 'react';
import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import authService from './services/auth';
import LoginFrom from './components/LoginForm';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');

        if(user){
            setUser(JSON.parse(user));
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await authService.login({username, password});

            window.sessionStorage.setItem('B_TOKEN', user.token);
            window.sessionStorage.setItem('user', JSON.stringify({username: user.username, name: user.name}));

            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log('Error', exception);
        }   
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem('B_TOKEN');
        window.sessionStorage.removeItem('user');
        setUser(null);
    };

    const addBlog = async (event) => {
        event.preventDefault();
        const blog = {
            title: title,
            author: author,
            url: url
        };

        const savedBlog = await blogService.create(blog);
        setBlogs(blogs.concat(savedBlog));
        setAuthor('');
        setTitle('');
        setUrl('');
    };

    return (
        <div>
            <h2>blogs</h2>
            {!user && LoginFrom({username, setUsername, password, setPassword, handleSubmit: handleLogin})}
            {user && <div>
                <UserDetails user={user} handleLogout={handleLogout}/>
                <BlogForm handleSubmit={addBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
                <Blogs blogs={blogs} />
            </div>}

        </div>
    );
};

export default App;