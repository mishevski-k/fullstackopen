import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, handleUpdate }) => {

    if(blogs.length === 0){
        return (
            <div>No Blogs found</div>
        );
    }

    return(
        <div className='blog-items'>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />
            )}
        </div>
    );
};

export default Blogs;