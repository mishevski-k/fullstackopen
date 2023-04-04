import {useState} from 'react';

const Blog = ({blog, handleUpdate, handleDelete, user}) => {
    const [visibility, setVisibility] = useState(false);
    const [likes, setLikes] = useState(Number(blog.likes));

    const showDetails = {display: visibility ? 'block': 'none'};

    const toggleDetails = () => {
        setVisibility(!visibility);
    }

    const likeBlog = async () => {
        handleUpdate({title: blog.title, author: blog.author, url: blog.url, likes: likes + 1, user: blog.user.id, id: blog.id});
        setLikes(likes + 1);
    }

    return(
        <div className='blog-item'>
            <div className='blog-item-header'>
                {blog.title} {blog.author} <button className='blog-button' onClick={toggleDetails}>{visibility ? 'hide' : 'show'}</button>
            </div>
            <div className='blog-item-body' style={showDetails}>
                <p>{blog.url}</p>
                <p className='blog-likes'>likes {likes} <button className='blog-button like-blog' onClick={likeBlog}>like</button></p>
                <p>{blog.user.name}</p>
                {user.id == blog.user.id &&
                    <button className='blog-delete-button' onClick={() => handleDelete(blog)}>delete</button>
                }
            </div>
        </div>  
    );

};

export default Blog;