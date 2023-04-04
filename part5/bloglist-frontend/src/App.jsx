import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import authService from './services/auth';
import LoginFrom from './components/LoginForm';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './assets/css/main.css';
import Toggle from './components/Toggle';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [message, setMessage] = useState({type: null, text: null});
    const BlogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((first, second) => second.likes > first.likes ? 1 : (first.likes > second.likes) ? -1 : 0) )
        );
    }, []);

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');

        if(user){
            setUser(JSON.parse(user));
        }
    }, []);

    const removeNotification = () => {
        setInterval(() => {
            setMessage({type: null, text: null});
        }, 3000);
    };

    const setError = (message) => {
        setMessage({type: 'error', text: message});
        removeNotification();
    };

    const setInfo = (message) => {
        setMessage({type: 'info', text: message});
        removeNotification();
    };

    const setSuccess = (message) => {
        setMessage({type: 'success', text: message});
        removeNotification();
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if(!(username) || username === ''){
            return setError('Username is required');
        }

        if(!(password) || password === ''){
            return setError('Password is required');        
        }

        try {
            const user = await authService.login({username, password});

            console.log(user);
            window.sessionStorage.setItem('B_TOKEN', user.token);
            window.sessionStorage.setItem('user', JSON.stringify({username: user.username, name: user.name}));

            setUser(user);
            setUsername('');
            setPassword('');

            setInfo(`Welcome back ${user.name}`);

        }catch(excepetion){
            setError('Username or password dont match');
        }
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem('B_TOKEN');
        window.sessionStorage.removeItem('user');
        setUser(null);

        setInfo('Logged out');
    };

    const addBlog = async (blogObject) => {
        try{
            const savedBlog = await blogService.create(blogObject);
            setBlogs(blogs.concat(savedBlog));
            setSuccess(`a new Blog '${savedBlog.title}' by ${savedBlog.author} added`);
            BlogFormRef.current.toggleVisibility();
            return savedBlog;
        }catch(error){
            setError(error.response.data.error);
        }
    };

    const updateBlog = async (blogObject) => {
        try {
            const updatedBlog = await blogService.update(blogObject);
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    const deleteBlog = async (blogObject) => {
        if(window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)){
            try {
                await blogService.deleteBlog(blogObject.id);
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id));
            } catch(error){
                setError(error.response.data.error);
            }
        }

    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} />
            {!user && LoginFrom({username, setUsername, password, setPassword, handleSubmit: handleLogin})}
            {user && <div>
                <UserDetails user={user} handleLogout={handleLogout}/>
                <Toggle default={false} showLabel='new blog' hideLabel='cancel' ref={BlogFormRef}>
                    <BlogForm createBlog={addBlog}/>
                </Toggle>
                <Blogs blogs={blogs} handleUpdate={updateBlog} handleDelete={deleteBlog} user={user} />
            </div>}

        </div>
    );
};

export default App;