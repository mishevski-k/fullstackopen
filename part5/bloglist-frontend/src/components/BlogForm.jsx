import {react, useState} from 'react';

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = async (event) => {
        event.preventDefault();

        const savedBlog = createBlog({
            title: title,
            author: author,
            url: url,
        });

        if(savedBlog){
            setTitle('');
            setAuthor('');
            setUrl('');
        }

    }

    return(
        <div>
            <h1>Create new</h1>
            <form onSubmit={addBlog}>
                <div>title: <input id="blog-title" value={title} placeholder='title . . .' onChange={({target}) => setTitle(target.value)}></input></div>
                <div>author: <input id="blog-author" value={author} placeholder='author . . .' onChange={({target}) => setAuthor(target.value)}></input></div>
                <div>url: <input id="blog-url" value={url} placeholder='url . . .' onChange={({target}) => setUrl(target.value)}></input></div>
                <button type='sbumit'>create</button>
            </form>
        </div>

    );
};

export default BlogForm;