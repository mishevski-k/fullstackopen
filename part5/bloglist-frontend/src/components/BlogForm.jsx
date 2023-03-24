import React from 'react';

const BlogForm = ({handleSubmit, title, setTitle, author, setAuthor, url, setUrl}) => {
    return(
        <div>
            <h1>Create new</h1>
            <form onSubmit={handleSubmit}>
                <div>title: <input value={title} placeholder='title . . .' onChange={({target}) => setTitle(target.value)}></input></div>
                <div>author: <input value={author} placeholder='author . . .' onChange={({target}) => setAuthor(target.value)}></input></div>
                <div>url: <input value={url} placeholder='url . . .' onChange={({target}) => setUrl(target.value)}></input></div>
                <button type='sbumit'>create</button>
            </form>
        </div>

    );
};

export default BlogForm;